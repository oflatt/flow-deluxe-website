import { GameState } from "flow-game";
import {set_canvas} from "./rust-canvas";

const game_state = GameState.initial_game_state();


const render_starter = (time_stamp) =>{
  main_loop(game_state);
}




const main_loop = () => {
  const canvas = document.getElementById("gamecanvas");
  if(canvas == null){
    requestAnimationFrame(function(time_stamp){
      main_loop();
    });
    return;
  }
  const ctx = canvas.getContext('2d');
  
  game_state.game_loop(ctx, canvas.width, canvas.height);
  
  requestAnimationFrame(function(time_stamp){
    main_loop();
  });
};




requestAnimationFrame(render_starter);


