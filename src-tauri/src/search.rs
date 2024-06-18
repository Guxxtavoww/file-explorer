use crate::filesystem::volume::DirectoryChild;
use crate::StateSafe;
use fuzzy_matcher::skim::SkimMatcherV2;
use fuzzy_matcher::FuzzyMatcher;
use std::path::Path;
use std::time::Instant;
use tauri::State;

const MINIMUM_SCORE: i16 = 20;

/// Checks if the filename passes the extension filter, also checks if extension filter is provided.
fn passed_extension(filename: &str, extension: &str) -> bool {
    extension.is_empty() || filename.ends_with(extension)
}

/// Gives a filename a fuzzy matcher score.
/// Returns 1000 if there is an exact match for prioritizing.
fn score_filename(matcher: &SkimMatcherV2, filename: &str, query: &str) -> i16 {
    if filename == query {
        1000
    } else {
        matcher.fuzzy_match(filename, query).unwrap_or(0) as i16
    }
}

/// Checks if a file should be included based on the given criteria.
fn check_file(
    matcher: &SkimMatcherV2,
    accept_files: bool,
    filename: &str,
    file_path: &str,
    extension: &str,
    query: &str,
    results: &mut Vec<DirectoryChild>,
    fuzzy_scores: &mut Vec<i16>,
) {
    if accept_files && passed_extension(filename, extension) {
        let filename_path = Path::new(filename);
        let cleaned_filename = filename_path
            .file_stem()
            .and_then(|stem| stem.to_str())
            .unwrap_or("");

        let score = score_filename(matcher, cleaned_filename, query);
        if score >= MINIMUM_SCORE {
            results.push(DirectoryChild::File(
                filename.to_string(),
                file_path.to_string(),
            ));
            fuzzy_scores.push(score);
        }
    }
}

/// Reads the cache and performs a fuzzy search for a directory.
/// Takes into account the provided filters.
/// Returns the results ONLY when the entire volume is searched.
#[tauri::command]
pub async fn search_directory(
    state_mux: State<'_, StateSafe>,
    query: String,
    search_directory: String,
    mount_pnt: String,
    extension: String,
    accept_files: bool,
    accept_directories: bool,
) -> Result<Vec<DirectoryChild>, ()> {
    let start_time = Instant::now();

    let mut results = Vec::new();
    let mut fuzzy_scores = Vec::new();
    let matcher = SkimMatcherV2::default().smart_case();

    let state = state_mux.lock().unwrap();
    let query = query.to_lowercase();

    if let Some(system_cache) = state.system_cache.get(&mount_pnt) {
        for (filename, paths) in system_cache {
            for path in paths {
                let file_type = &path.file_type;
                let file_path = &path.file_path;

                if !file_path.starts_with(&search_directory) {
                    continue;
                }

                if file_type == "file" {
                    check_file(
                        &matcher,
                        accept_files,
                        filename,
                        file_path,
                        &extension,
                        &query,
                        &mut results,
                        &mut fuzzy_scores,
                    );
                } else if accept_directories {
                    let score = score_filename(&matcher, filename, &query);
                    if score >= MINIMUM_SCORE {
                        results.push(DirectoryChild::Directory(
                            filename.to_string(),
                            file_path.to_string(),
                        ));
                        fuzzy_scores.push(score);
                    }
                }
            }
        }
    }

    println!("Elapsed time: {:?}", Instant::now() - start_time);

    // Sort by best match first.
    let mut indexed_scores: Vec<(usize, i16)> = fuzzy_scores.iter().copied().enumerate().collect();
    indexed_scores.sort_by(|a, b| b.1.cmp(&a.1));

    Ok(indexed_scores
        .into_iter()
        .map(|(index, _)| results[index].clone())
        .collect())
}
