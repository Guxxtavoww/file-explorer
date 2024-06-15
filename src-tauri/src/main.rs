// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod utils;
mod features;

use tauri::Menu;
use utils::theme::{ change_theme, read_theme };
use utils::splashscreen::close_splashscreen;

fn main() {
  let menu = Menu::new();

  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![close_splashscreen, change_theme, read_theme])
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
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
