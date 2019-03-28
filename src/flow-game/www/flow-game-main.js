import * as wasm from "flow-game";
import {set_canvas} from "./rust-canvas";




const renderLoop = () => {
  var canvas = document.getElementById("gamecanvas");
  if(canvas == null){
    requestAnimationFrame(renderLoop);
    return;
  }
  set_canvas(canvas);
  
  wasm.greet();
  requestAnimationFrame(renderLoop);
};

requestAnimationFrame(renderLoop);


