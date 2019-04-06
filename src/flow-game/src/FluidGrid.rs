

pub struct FluidGrid {

    pub width : u32,
    pub height : u32,
    dt : f64,

    dye : Vec<f64>,
    pub density : Vec<f64>,

    x_vel : Vec<f64>,
    y_vel : Vec<f64>,

    x_vel_0 : Vec<f64>,
    y_vel_0 : Vec<f64>

}


pub fn empty_grid(grid_width: u32, grid_height: u32) -> FluidGrid{
    let grid_size = (grid_width*grid_height) as usize;
    FluidGrid{width: grid_width,
              height: grid_height,
              dt: 0.1,
              dye: vec![0.0;grid_size],
              density: vec![0.0;grid_size],

              x_vel: vec![0.0;grid_size],
              y_vel: vec![0.0;grid_size],

              x_vel_0: vec![0.0;grid_size],
              y_vel_0: vec![0.0;grid_size]}
}

pub fn get_updated(grid: &FluidGrid) -> &FluidGrid{
    grid
}
