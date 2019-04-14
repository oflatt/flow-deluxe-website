import { GameState } from "flow-game";
import {set_canvas} from "./rust-canvas";

const game_state = GameState.initial_game_state();
var canvas = null;

const render_starter = (time_stamp) =>{
  main_loop(game_state);
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
  last_mouse_y : null
}


function mouseDown(e){
  var loc = windowToCanvas(canvas, e.clientX, e.clientY);
  event_state.mouse_pressedp = true;
  event_state.last_mouse_x = loc.x;
  event_state.last_mouse_y = loc.y;
}

function mouseUp(e){
  event_state.mouse_pressedp = false;
}


const main_loop = () => {
  if(canvas == null){
    canvas = document.getElementById("gamecanvas");
    if (canvas == null){
      requestAnimationFrame(function(time_stamp){
        main_loop();
      });
      return;
    }else{
      canvas.onmousedown = mouseDown;
      canvas.onmouseup = mouseUp;
    }
  }
  
  const ctx = canvas.getContext('2d');


  // process events
  
  game_state.handle_events(event_state.mouse_pressedp, event_state.last_mouse_x, event_state.last_mouse_y);
  
  game_state.game_loop(ctx, canvas.width, canvas.height);
  
  requestAnimationFrame(function(time_stamp){
    main_loop();
  });
};




requestAnimationFrame(render_starter);


