(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/flow_game.js":
/*!***************************!*\
  !*** ../pkg/flow_game.js ***!
  \***************************/
/*! exports provided: __wbg_canvasfill_67f5411822b01f89, greet, __wbindgen_object_drop_ref */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_canvasfill_67f5411822b01f89\", function() { return __wbg_canvasfill_67f5411822b01f89; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"greet\", function() { return greet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony import */ var _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flow_game_bg */ \"../pkg/flow_game_bg.wasm\");\n/* harmony import */ var _snippets_flow_game_4429ad76a024424f_www_rust_canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snippets/flow-game-4429ad76a024424f/www/rust-canvas.js */ \"../pkg/snippets/flow-game-4429ad76a024424f/www/rust-canvas.js\");\n\n\n\nfunction __wbg_canvasfill_67f5411822b01f89() {\n    Object(_snippets_flow_game_4429ad76a024424f_www_rust_canvas_js__WEBPACK_IMPORTED_MODULE_1__[\"canvas_fill\"])();\n}\n/**\n* @returns {void}\n*/\nfunction greet() {\n    return _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"greet\"]();\n}\n\nconst heap = new Array(32);\n\nheap.fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction __wbindgen_object_drop_ref(i) { dropObject(i); }\n\n\n\n//# sourceURL=webpack:///../pkg/flow_game.js?");

/***/ }),

/***/ "../pkg/flow_game_bg.wasm":
/*!********************************!*\
  !*** ../pkg/flow_game_bg.wasm ***!
  \********************************/
/*! exports provided: memory, greet */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./flow_game */ \"../pkg/flow_game.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/flow_game_bg.wasm?");

/***/ }),

/***/ "../pkg/snippets/flow-game-4429ad76a024424f/www/rust-canvas.js":
/*!*********************************************************************!*\
  !*** ../pkg/snippets/flow-game-4429ad76a024424f/www/rust-canvas.js ***!
  \*********************************************************************/
/*! exports provided: canvas_fill, set_canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas_fill\", function() { return canvas_fill; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set_canvas\", function() { return set_canvas; });\n\n\nwindow.wasm_canvas = null;\n\nfunction canvas_fill(){\n  var ctx = window.wasm_canvas.getContext(\"2d\");\n  ctx.fillStyle = \"#FF0000\";\n  ctx.fillRect(0, 0, 150, 75);\n}\n\nfunction set_canvas(c){\n  window.wasm_canvas = c;\n}\n\n\n//# sourceURL=webpack:///../pkg/snippets/flow-game-4429ad76a024424f/www/rust-canvas.js?");

/***/ }),

/***/ "./flow-game-main.js":
/*!***************************!*\
  !*** ./flow-game-main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var flow_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flow-game */ \"../pkg/flow_game.js\");\n/* harmony import */ var _rust_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rust-canvas */ \"./rust-canvas.js\");\n\n\n\n\n\n\nconst renderLoop = () => {\n  var canvas = document.getElementById(\"gamecanvas\");\n  if(canvas == null){\n    requestAnimationFrame(renderLoop);\n    return;\n  }\n  Object(_rust_canvas__WEBPACK_IMPORTED_MODULE_1__[\"set_canvas\"])(canvas);\n  \n  flow_game__WEBPACK_IMPORTED_MODULE_0__[\"greet\"]();\n  requestAnimationFrame(renderLoop);\n};\n\nrequestAnimationFrame(renderLoop);\n\n\n\n\n//# sourceURL=webpack:///./flow-game-main.js?");

/***/ }),

/***/ "./rust-canvas.js":
/*!************************!*\
  !*** ./rust-canvas.js ***!
  \************************/
/*! exports provided: canvas_fill, set_canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas_fill\", function() { return canvas_fill; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set_canvas\", function() { return set_canvas; });\n\n\nwindow.wasm_canvas = null;\n\nfunction canvas_fill(){\n  var ctx = window.wasm_canvas.getContext(\"2d\");\n  ctx.fillStyle = \"#FF0000\";\n  ctx.fillRect(0, 0, 150, 75);\n}\n\nfunction set_canvas(c){\n  window.wasm_canvas = c;\n}\n\n\n//# sourceURL=webpack:///./rust-canvas.js?");

/***/ })

}]);