// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod utils;
mod filesystem;
mod search;
mod errors;

use tauri::Menu;
use std::sync::{ Arc, Mutex };
use std::collections::HashMap;
use serde::{ Deserialize, Serialize };

use search::search_directory;
use filesystem::volume::get_volumes;
use utils::splashscreen::close_splashscreen;
use utils::theme::{ change_theme, read_theme };
use filesystem::explorer::{ open_file, open_directory, create_file, create_directory, rename_file, delete_file, delete_folder };

#[derive(Serialize, Deserialize)]
pub struct CachedPath {
    #[serde(rename = "p")]
    file_path: String,
    #[serde(rename = "t")]
    file_type: String,
}

pub type VolumeCache = HashMap<String, Vec<CachedPath>>;

#[derive(Default)]
pub struct AppState {
    system_cache: HashMap<String, VolumeCache>,
}

pub type StateSafe = Arc<Mutex<AppState>>;

#[tokio::main]
async fn main() {
  let menu = Menu::new();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        close_splashscreen, 
        change_theme, 
        read_theme, 
        open_file, 
        open_directory, 
        create_file, 
        create_directory, 
        rename_file, 
        delete_file, 
        search_directory, 
        get_volumes,
        delete_folder,
      ])
    .menu(menu)
    .on_menu_event(|event| {
      match event.menu_item_id() {
        "quit" => {
          std::process::exit(0);
        }
        "close" => {
          event.window().close().unwrap();
        }
        _ => {}
      }
    })
    .manage(Arc::new(Mutex::new(AppState::default())))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
