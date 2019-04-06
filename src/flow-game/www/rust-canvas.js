

window.wasm_canvas = null;

export function canvas_fill(x, y, w, h, fillString){
  var ctx = window.wasm_canvas.getContext("2d");
  
  ctx.fillStyle = fillString;
  ctx.fillRect(x*window.wasm_canvas.height, y*window.wasm_canvas.height,
               w*window.wasm_canvas.height, h*window.wasm_canvas.height);
}

export function canvas_ellipse(x, y, w, h){
  var ctx = window.wasm_canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.beginPath();
  ctx.ellipse(x*window.wasm_canvas.height, y*window.wasm_canvas.height,
              w*window.wasm_canvas.height, h*window.wasm_canvas.height,
              0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fillRect(x*window.wasm_canvas.height, y*window.wasm_canvas.height,
               w*window.wasm_canvas.height, h*window.wasm_canvas.height);
}

export function set_canvas(c){
  window.wasm_canvas = c;
}
