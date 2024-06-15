use std::{fs::{File, OpenOptions}, io::{Read, Write}};

const FILE_PATH: &str = "theme.txt";

#[tauri::command]
pub fn change_theme(theme: &str) {
    if theme != "light" && theme != "dark" {
        panic!("Error: Theme must be either 'light' or 'dark'");
    }

    let mut file = OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)  // Creates the file if it does not exist
        .open(FILE_PATH)
        .expect("Error opening the file");

    file.write_all(theme.as_bytes()).expect("Error writing to the file");
}

#[tauri::command]
pub fn read_theme() -> String {
    let mut file = File::open(FILE_PATH).unwrap();

    let mut file_content = String::new();
    file.read_to_string(&mut file_content).expect("Error reading the file");

    file_content
}