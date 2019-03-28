

window.wasm_canvas = null;

export function canvas_fill(){
  var ctx = window.wasm_canvas.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 150, 75);
}

export function set_canvas(c){
  window.wasm_canvas = c;
}
