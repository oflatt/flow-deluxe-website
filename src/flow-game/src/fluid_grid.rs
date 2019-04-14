

// define a macro for indexing 2d array stored in a single dimensional array
macro_rules! ix {
    ($x:expr, $y:expr, $N:expr) => {($x)+($y)*($N)};
}

pub struct FluidGrid {

    pub width : u32,
    pub height : u32,
    dt : f64,

    density_0 : Vec<f64>,
    pub density : Vec<f64>,

    x_vel : Vec<f64>,
    y_vel : Vec<f64>,

    x_vel_0 : Vec<f64>,
    y_vel_0 : Vec<f64>

}


pub fn mouse_move(grid: &mut FluidGrid,old_mouse_x: f64, old_mouse_y: f64,
                  mouse_x:f64, mouse_y:f64){
    add_density(&mut grid.density, mouse_x as usize, mouse_y as usize, 0.02);
}

fn add_density(density: &mut Vec<f64>, x: usize, y:usize, dt: f64){
    let N:usize = vec_2d_size(&*density);
    density[ix!(x, y, N)] = dt*25.0;
}


pub fn empty_grid(grid_width: u32, grid_height: u32) -> FluidGrid{
    let grid_size = (grid_width*grid_height) as usize;

    let mut density_test = vec![0.0;grid_size];
    add_density(&mut density_test, 10, 10, 0.5);
    
    FluidGrid{width: grid_width,
              height: grid_height,
              dt: 0.1,
              
              density: density_test,
              density_0: vec![0.0;grid_size],

              x_vel: vec![0.0;grid_size],
              y_vel: vec![0.0;grid_size],

              x_vel_0: vec![0.0;grid_size],
              y_vel_0: vec![0.0;grid_size]}
}

pub fn get_updated(grid: &mut FluidGrid){
    density_step(&mut grid.density, &mut grid.density_0, &grid.x_vel, &grid.y_vel,
                 0.1, 0.0002)
}

fn density_step(density: &mut Vec<f64>, density_prev: &mut Vec<f64>,
                x_vel: &Vec<f64>, y_vel: &Vec<f64>, diff: f64, dt: f64){
    // diffuse into density_prev
    diffuse(0, density_prev, density, diff, dt);
    // advect into density
    advect(0, density, density_prev, x_vel, y_vel, dt);
}

pub fn vec_2d_size(vec: & Vec<f64>) -> usize{
    (vec.len() as f64).sqrt() as usize
}


fn diffuse(b_val: u32, vec: &mut Vec<f64>, vec_0: &Vec<f64>, diff: f64, dt: f64){
    let num_iterations = 20;
    let N = vec_2d_size(&*vec);
    let a:f64 = dt*diff*((N*N) as f64);

    for i in 0..num_iterations{
        for x in 1..N-1{
            for y in 1..N-1{
                vec[ix!(x, y, N)] = (vec_0[ix!(x, y, N)] +
                                  a*(vec[ix!(x-1,y, N)]+
                                     vec[ix!(x+1,y, N)]+
                                     vec[ix!(x,y-1, N)]+
                                     vec[ix!(x,y+1, N)]))/(1.0+4.0*a);
            }
        }
        set_bnd(b_val, vec);
    }
}


fn advect(b_val: u32, vec: &mut Vec<f64>, vec_0: &mut Vec<f64>, vel_x: &Vec<f64>,
          vel_y: &Vec<f64>, dt: f64){
    let (mut i0, mut j0, mut i1, mut j1, mut x, mut y, mut s0, mut t0, mut s1, mut t1):(usize, usize,
                                                                                        usize, usize,
                                                                                        f64, f64,
                                                                                        f64, f64,
                                                                                        f64, f64);
    let N = vec_2d_size(&*vec);
    let N_right = (N as f64) + 0.5;
    let dt0 = dt*(N as f64);

    for i in 1..N-1{
        for j in 1..N-1{
            x = (i as f64) - dt0*vel_x[ix!(i, j, N)];
            y = (j as f64) - dt0*vel_y[ix!(i, j, N)];
            if x < 0.5{
                x = 0.5;
            }
            if x > N_right{
                x = N_right;
            }
            i0 = x as usize;
            i1 = i0+1;

            if y < 0.5{
                y = 0.5;
            }
            if y > N_right{
                y = N_right;
            }
            j0 = y as usize;
            j1 = j0+1;
            
            s1 = x-(i0 as f64);
            s0 = 1.0-s1;
            t1 = y-(j0 as f64);
            t0 = 1.0-t1;
            
            vec[ix!(i, j, N)] =
                s0*(t0*vec_0[ix!(i0, j0, N)] +
                    t1*vec_0[ix!(i0, j1, N)]) +
                s1*(t0*vec_0[ix!(i1, j0, N)] +
                    t1*vec_0[ix!(i1, j1, N)])
        }
    }
    set_bnd(b_val, vec);
    
}


// incomplete
fn set_bnd(b_val: u32, vec: &mut Vec<f64>)
{
    let N:usize = vec_2d_size(&*vec);
    

    if b_val == 1{
        for i in 1..N-1{
            vec[ix!(0, i, N)] = -vec[ix!(1, i, N)];
            vec[ix!(N-2, i, N)] = -vec[ix!(N-3, i, N)];
            vec[ix!(i, 0, N)] = vec[ix!(i, 1, N)];
            vec[ix!(i, N-2, N)] = vec[ix!(i, N-3, N)];
        }
    }else if b_val == 2{
        for i in 1..N-1{
            vec[ix!(0, i, N)] = vec[ix!(1, i, N)];
            vec[ix!(N-2, i, N)] = vec[ix!(N-3, i, N)];
            vec[ix!(i, 0, N)] = -vec[ix!(i, 1, N)];
            vec[ix!(i, N-2, N)] = -vec[ix!(i, N-3, N)];
        }
    } else{
        for i in 1..N-1{
            vec[ix!(0, i, N)] = vec[ix!(1, i, N)];
            vec[ix!(N-2, i, N)] = vec[ix!(N-3, i, N)];
            vec[ix!(i, 0, N)] = vec[ix!(i, 1, N)];
            vec[ix!(i, N-2, N)] = vec[ix!(i, N-3, N)];
        }
    }
    
    vec[ix!(0 ,0 ,N)] = 0.5*(vec[ix!(1,0, N)]+vec[ix!(0 ,1, N)]);
    vec[ix!(0 ,N-1, N)] = 0.5*(vec[ix!(1,N-1, N)]+vec[ix!(0 ,N-2, N)]);
    vec[ix!(N-1,0 , N)] = 0.5*(vec[ix!(N-2,0 , N)]+vec[ix!(N-1,1, N)]);
    vec[ix!(N-1,N-1, N)] = 0.5*(vec[ix!(N-2,N-1, N)]+vec[ix!(N-1,N-2, N)]);
    
    
}
