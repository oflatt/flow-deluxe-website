

window.wasm_canvas = null;

let key_code_dict = {37:"LEFT", 38:"UP", 39:"RIGHT", 40:"DOWN"}

window.keys_pressed = {};

export function key_down(event){
  window.keys_pressed[String.fromCharCode(event.keyCode)] = true;
}

export function key_up(event){
  window.keys_pressed[String.fromCharCode(event.keyCode)] = false;
}

export function is_key_pressed(keyString) {
  keyString = keyString.toUpperCase();
  if(window.keys_pressed[keyString]) {
    return true;
  } else{
    return false;
  }
}

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
  ctx.fill();
}

export function set_canvas(c){
  window.wasm_canvas = c;
}
