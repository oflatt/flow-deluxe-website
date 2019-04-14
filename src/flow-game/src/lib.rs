use std::cmp;

extern crate image;
use image::{ImageBuffer, Pixel, Rgba};


mod utils;
mod fluid_grid;

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


// not used- instead using ctx.put_image_data
//#[wasm_bindgen(module = "/www/rust-canvas.js")]
//extern "C" {
//    fn canvas_fill(x:f64,y:f64,w:f64,h:f64, fillString:String);
//    fn canvas_ellipse(x:f64,y:f64,w:f64,h:f64);
//}

#[wasm_bindgen]
pub struct GameState {
    screen : ImageBuffer<Rgba<u8>, Vec<u8>>,
    grid : fluid_grid::FluidGrid
}


// libhoare disabled- would check that the density vector is of the correct dimensions
// #[invariant="density_vector.len() == vector_width*vector_height"]
fn draw_grid(screen: &mut ImageBuffer<Rgba<u8>, Vec<u8>>, density_vector: &Vec<f64>, vector_width: u32, vector_height: u32){
    // scale by the max possible integer that you can fit vertically
    let scale = screen.height() / vector_height;
    let x_offset_right;
    let x_offset_left;
    
    //log!("{}", &vector_width.to_string());

    // TODO: make it scale better when the width is less than the width needed for the grid
    let start_x_index;
    let end_x_index;
   /* if vector_width*scale > screen.width() {
        // pick start and end indexes so that it only draws on screen
        x_offset_left = (vector_width*scale - screen.width())/2;
        x_offset_right = 0;
        
        start_x_index = x_offset_left/scale;
        end_x_index = (screen.width()+x_offset_left-scale)/scale;
    }*/
    x_offset_right = (screen.width() - vector_width*scale)/2;
    x_offset_left = 0;
        
    start_x_index = 0;
    end_x_index = vector_width;
    
    

    for density_y in 0..vector_height{
        for density_x in start_x_index..end_x_index{
            for pixel_y in 0..scale{
                for pixel_x in 0..scale{
                    screen.put_pixel(density_x*scale+x_offset_right-x_offset_left+pixel_x,
                                     density_y*scale+pixel_y,
                                     Rgba::from_channels(10,
                                                         cmp::min((density_vector[(density_x+density_y*vector_width) as usize]*255.0) as u8, 255),
                                                         0,
                                                         255));
                }
            }
        }
    }
}


fn screen_to_grid_coordinates(game_state: &GameState, mouse_x: f64, mouse_y: f64) -> (f64, f64){
    let screen = &game_state.screen;
    let vector_width = game_state.grid.width;
    let vector_height = game_state.grid.height;

    let scale = screen.height() / vector_height;
    let x_offset_right;
    let x_offset_left;
    x_offset_right = (screen.width() - vector_width*scale)/2;
    x_offset_left = 0;

    let mut grid_mouse_x = (mouse_x-(x_offset_right+x_offset_left) as f64)/(scale as f64);
    let mut grid_mouse_y = mouse_y/(scale as f64);
    if grid_mouse_x > vector_width as f64{
        grid_mouse_x = (vector_width as f64)-0.001;
    }
    if grid_mouse_y > vector_height as f64{
        grid_mouse_y = (vector_height as f64)-0.001;
    }
    if grid_mouse_x < 0.0{
        grid_mouse_x = 0.0;
    }
    if grid_mouse_y < 0.0{
        grid_mouse_y = 0.0;
    }
    
    // inverse of the draw_grid function for drawing the grid to the screen
    return (grid_mouse_x,
            grid_mouse_y);
}

#[wasm_bindgen]
impl GameState {
    pub fn initial_game_state() -> GameState{
        utils::set_panic_hook();
        GameState{screen: ImageBuffer::new(10, 10),
                  grid: fluid_grid::empty_grid(40, 40)}
    }
    
    pub fn game_loop(&mut self,
                     ctx: &CanvasRenderingContext2d,
                     width: u32,
                     height: u32,) -> Result<(), JsValue>{

        // resize the screen if needed
        if self.screen.width() != width || self.screen.height() != height {
            self.screen = ImageBuffer::new(width, height);
        }

        fluid_grid::get_updated(&mut self.grid);


        draw_grid(&mut self.screen, &self.grid.density, self.grid.width, self.grid.height);
                

        let screen = ImageData::new_with_u8_clamped_array_and_sh(Clamped(&mut self.screen), width, height)?;

        
        ctx.put_image_data(&screen, 0.0, 0.0)
    }

    pub fn handle_events(&mut self, mouse_pressedp: bool, mouse_x:f64, mouse_y:f64){
        if mouse_pressedp{
            let (grid_mouse_x, grid_mouse_y) = screen_to_grid_coordinates(&*self, mouse_x, mouse_y);
            log!("mouse click mouse_x: {},mouse_y: {}", grid_mouse_x, grid_mouse_y);
            fluid_grid::mouse_move(&mut self.grid, grid_mouse_x, grid_mouse_y, grid_mouse_x, grid_mouse_y);
        }
    }
}

