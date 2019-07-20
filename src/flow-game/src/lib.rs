use std::cmp;

extern crate image;
use image::{ImageBuffer, Pixel, Rgba};

extern crate slotmap;
use slotmap::{SlotMap, new_key_type};

mod utils;

//use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;

// for drawing to canvas
use wasm_bindgen::Clamped;
use web_sys::{CanvasRenderingContext2d, ImageData};

cfg_if::cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

// for logging
extern crate web_sys;

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ( $( $t:tt )* ) => {
        web_sys::console::log_1(&format!( $( $t )* ).into());
    }
}




#[wasm_bindgen]
extern {
    fn alert(s: &str);
}



#[wasm_bindgen(module = "/www/rust-canvas.js")]
extern "C" {
    fn canvas_ellipse(x: f64, y: f64, w: f64, h: f64);
    fn is_key_pressed(s: &str) -> bool;
    fn canvas_fill(x:f64,y:f64,w:f64,h:f64, fillString:String);
}

new_key_type! {
    struct EntityKey;
}

#[derive(Copy, Clone)]
struct Player {
    controller: u32,
}

#[derive(Copy, Clone)]
struct Position {
    xpos: f64,
    ypos: f64,
    radius: f64,
}

#[wasm_bindgen]
pub struct GameState {
    screen : ImageBuffer<Rgba<u8>, Vec<u8>>,
    players : SlotMap<EntityKey, Option<Player>>,
    orbs : SlotMap<EntityKey, Option<i32>>,
    positions : SlotMap<EntityKey, Option<Position>>,
}

fn add_player(game_state: &mut GameState, player: Player, position: Position) -> EntityKey {
    game_state.players.insert(Some(player));
    game_state.orbs.insert(None);
    game_state.positions.insert(Some(position))
}

fn draw_positions(game_state: &GameState) {
    for (key, position) in game_state.positions.iter() {
        match position {
            Some(pos) => canvas_ellipse(pos.xpos, pos.ypos, pos.radius * 2.0, pos.radius * 2.0),
            None => (),
        }
    }
}

#[wasm_bindgen]
impl GameState {
    pub fn initial_game_state() -> GameState{
        utils::set_panic_hook();
        
        let mut game_state = GameState{screen: ImageBuffer::new(10, 10),
                                       players: SlotMap::with_key(),
                                       orbs: SlotMap::with_key(),
                                       positions: SlotMap::with_key(),};
        let p1 = add_player(&mut game_state, Player{controller: 1},
                            Position{xpos: 0.25, ypos: 0.5, radius: 0.05});
        let p2 = add_player(&mut game_state, Player{controller: 2},
                            Position{xpos: 0.75, ypos: 0.5, radius: 0.05});
        
        game_state
    }

    // time is in seconds
    pub fn game_loop(&mut self,
                     ctx: &CanvasRenderingContext2d,
                     pixel_width: u32,
                     pixel_height: u32,
                     mouse_pressedp: bool, mouse_x:f64,
                     mouse_y:f64, last_time: f64,
                     current_time:f64){

        let screen_width: f64 = (pixel_width as f64) / (pixel_height as f64);
        
        // log!("dt: {}", current_time-last_time);

        canvas_fill(0.0, 0.0, screen_width, 1.0, "rgb(255,255,255)".to_string());
        draw_positions(&self);

        // handle events
        if is_key_pressed("w"){
            canvas_ellipse(0.5, 0.5, 0.5, 0.5);
        }
    }

}

