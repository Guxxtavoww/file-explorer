// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod random_string;

use random_string::random_string;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![random_string])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
