import { GameState } from "flow-game";
import {set_canvas} from "./rust-canvas";

const game_state = GameState.initial_game_state();
var canvas = null;

const render_starter = (time_stamp) =>{
  main_loop(time_stamp);
}

function windowToCanvas(canvas, x, y) {
   var bbox = canvas.getBoundingClientRect();

   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
}


var event_state = {
  mouse_pressedp : true,
  last_mouse_x : null,
  last_mouse_y : null,
  current_mouse_x : null,
  current_mouse_y : null,
  last_time : null
}


function mouseDown(e){
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  event_state.mouse_pressedp = true;
  event_state.last_mouse_x = loc.x;
  event_state.last_mouse_y = loc.y;
  event_state.current_mouse_x = event_state.last_mouse_x;
  event_state.current_mouse_y = event_state.last_mouse_y;
}

function mouseUp(e){
  event_state.mouse_pressedp = false;
}

function mouseMove(e){
  event_state.last_mouse_x = event_state.current_mouse_x;
  event_state.last_mouse_y = event_state.current_mouse_y;
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  event_state.current_mouse_x = loc.x;
  event_state.current_mouse_y = loc.y;
}


// current time is in milliseconds
const main_loop = (current_time) => {
  if(canvas == null){
    canvas = document.getElementById("gamecanvas");
    if (canvas == null){
      requestAnimationFrame(function(time_stamp){
        main_loop(time_stamp);
      });
      return;
    }else{
      canvas.onmousedown = mouseDown;
      canvas.onmouseup = mouseUp;
      canvas.onmousemove = mouseMove;
      event_state.last_time = current_time;
    }
  }
  
  const ctx = canvas.getContext('2d');


  
  
  game_state.game_loop(ctx, canvas.width, canvas.height, event_state.mouse_pressedp, event_state.last_mouse_x, event_state.last_mouse_y, event_state.last_time/1000.0, current_time/1000.0);

  // set last time at the end
  event_state.last_time = current_time;
  
  requestAnimationFrame(function(time_stamp){
    main_loop(time_stamp);
  });
};




requestAnimationFrame(render_starter);


