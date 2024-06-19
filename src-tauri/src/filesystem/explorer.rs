use std::fs;
use std::fs::read_dir;
use std::ops::Deref;
use std::path::Path;
use notify::event::CreateKind;
use tauri::State;
use crate::errors::Error;
use crate::filesystem::cache::FsEventHandler;
use crate::filesystem::fs_utils::get_mount_point;
use crate::filesystem::volume::DirectoryChild;
use crate::StateSafe;

/// Opens a file at the given path. Returns a string if there was an error.
#[tauri::command]
pub async fn open_file(path: String) -> Result<(), Error> {
    let output_res = open::commands(path)[0].output();
    let output = output_res.map_err(|err| Error::Custom(format!("Failed to get open command output: {}", err)))?;

    if output.status.success() {
        Ok(())
    } else {
        let err_msg = String::from_utf8(output.stderr).unwrap_or_else(|_| String::from("Failed to open file and deserialize stderr."));

        Err(Error::Custom(err_msg))
    }
}

/// Searches and returns the files in a given directory. This is not recursive.
#[tauri::command]
pub async fn open_directory(path: String) -> Result<Vec<DirectoryChild>, ()> {
    let directory = read_dir(path).map_err(|_| ())?;
    
    Ok(directory
        .filter_map(|entry| entry.ok())
        .map(|entry| {
            let file_name = entry.file_name().to_string_lossy().to_string();
            let entry_path = entry.path().to_string_lossy().to_string();
            if entry.file_type().unwrap().is_file() {
                DirectoryChild::File(file_name, entry_path)
            } else {
                DirectoryChild::Directory(file_name, entry_path)
            }
        })
        .collect())
}

async fn handle_fs_event(state_mux: State<'_, StateSafe>, path: String, kind: CreateKind) -> Result<(), Error> {
    let mount_point_str = get_mount_point(path.clone()).unwrap_or_default();
    let fs_event_manager = FsEventHandler::new(state_mux.deref().clone(), mount_point_str.into());

    fs_event_manager.handle_create(kind, Path::new(&path));
    Ok(())
}

#[tauri::command]
pub async fn create_file(state_mux: State<'_, StateSafe>, path: String) -> Result<(), Error> {
    handle_fs_event(state_mux.clone(), path.clone(), CreateKind::File).await?;

    fs::File::create(path).map_err(|err| Error::Custom(err.to_string()))?;

    Ok(())
}

#[tauri::command]
pub async fn create_directory(state_mux: State<'_, StateSafe>, path: String) -> Result<(), Error> {
    handle_fs_event(state_mux.clone(), path.clone(), CreateKind::Folder).await?;
    fs::create_dir(path).map_err(|err| Error::Custom(err.to_string()))?;
    Ok(())
}

#[tauri::command]
pub async fn rename_file(state_mux: State<'_, StateSafe>, old_path: String, new_path: String) -> Result<(), Error> {
    let mount_point_str = get_mount_point(old_path.clone()).unwrap_or_default();
    let mut fs_event_manager = FsEventHandler::new(state_mux.deref().clone(), mount_point_str.into());
    fs_event_manager.handle_rename_from(Path::new(&old_path));
    fs_event_manager.handle_rename_to(Path::new(&new_path));

    fs::rename(old_path, new_path).map_err(|err| Error::Custom(err.to_string()))?;
    Ok(())
}

#[tauri::command]
pub async fn delete_file(state_mux: State<'_, StateSafe>, path: String) -> Result<(), Error> {
    let mount_point_str = get_mount_point(path.clone()).unwrap_or_default();
    let fs_event_manager = FsEventHandler::new(state_mux.deref().clone(), mount_point_str.into());
    fs_event_manager.handle_delete(Path::new(&path));

    fs::remove_file(path).map_err(|err| Error::Custom(err.to_string()))?;

    Ok(())
}

#[tauri::command]
pub fn delete_folder(state_mux: State<'_, StateSafe>, path: String) -> Result<(), Error> {
    let mount_point_str = get_mount_point(path.clone()).unwrap_or_default();
    let fs_event_manager = FsEventHandler::new(state_mux.deref().clone(), mount_point_str.into());
    fs_event_manager.handle_delete(Path::new(&path));

    fs::remove_dir_all(path).map_err(|err| Error::Custom(err.to_string()))?;

    Ok(())
}
