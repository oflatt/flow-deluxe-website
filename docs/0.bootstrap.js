(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/flow_game.js":
/*!***************************!*\
  !*** ../pkg/flow_game.js ***!
  \***************************/
/*! exports provided: __widl_f_put_image_data_CanvasRenderingContext2D, __widl_f_new_with_u8_clamped_array_and_sh_ImageData, __wbindgen_rethrow, __wbindgen_throw, GameState, __wbindgen_object_drop_ref */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_put_image_data_CanvasRenderingContext2D\", function() { return __widl_f_put_image_data_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_new_with_u8_clamped_array_and_sh_ImageData\", function() { return __widl_f_new_with_u8_clamped_array_and_sh_ImageData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_rethrow\", function() { return __wbindgen_rethrow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GameState\", function() { return GameState; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony import */ var _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flow_game_bg */ \"../pkg/flow_game_bg.wasm\");\n\n\nconst heap = new Array(32);\n\nheap.fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nlet stack_pointer = 32;\n\nfunction addBorrowedObject(obj) {\n    if (stack_pointer == 1) throw new Error('out of js stack');\n    heap[--stack_pointer] = obj;\n    return stack_pointer;\n}\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory = new Uint32Array(_flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory;\n}\n\nlet heap_next = heap.length;\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nfunction handleError(exnptr, e) {\n    const view = getUint32Memory();\n    view[exnptr / 4] = 1;\n    view[exnptr / 4 + 1] = addHeapObject(e);\n}\n\nfunction __widl_f_put_image_data_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, exnptr) {\n    try {\n        getObject(arg0).putImageData(getObject(arg1), arg2, arg3);\n    } catch (e) {\n        handleError(exnptr, e);\n    }\n}\n\nlet cachegetUint8ClampedMemory = null;\nfunction getUint8ClampedMemory() {\n    if (cachegetUint8ClampedMemory === null || cachegetUint8ClampedMemory.buffer !== _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8ClampedMemory = new Uint8ClampedArray(_flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8ClampedMemory;\n}\n\nfunction getClampedArrayU8FromWasm(ptr, len) {\n    return getUint8ClampedMemory().subarray(ptr / 1, ptr / 1 + len);\n}\n\nfunction __widl_f_new_with_u8_clamped_array_and_sh_ImageData(arg0, arg1, arg2, arg3, exnptr) {\n    let varg0 = getClampedArrayU8FromWasm(arg0, arg1);\n    try {\n        return addHeapObject(new ImageData(varg0, arg2, arg3));\n    } catch (e) {\n        handleError(exnptr, e);\n    }\n}\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nfunction __wbindgen_rethrow(idx) { throw takeObject(idx); }\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\nfunction freeGameState(ptr) {\n\n    _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_gamestate_free\"](ptr);\n}\n/**\n*/\nclass GameState {\n\n    static __wrap(ptr) {\n        const obj = Object.create(GameState.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeGameState(ptr);\n    }\n\n    /**\n    * @returns {GameState}\n    */\n    static initial_game_state() {\n        return GameState.__wrap(_flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"gamestate_initial_game_state\"]());\n    }\n    /**\n    * @param {any} ctx\n    * @param {number} width\n    * @param {number} height\n    * @returns {void}\n    */\n    game_loop(ctx, width, height) {\n        try {\n            return _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"gamestate_game_loop\"](this.ptr, addBorrowedObject(ctx), width, height);\n\n        } finally {\n            heap[stack_pointer++] = undefined;\n\n        }\n\n    }\n}\n\nfunction __wbindgen_object_drop_ref(i) { dropObject(i); }\n\n\n\n//# sourceURL=webpack:///../pkg/flow_game.js?");

/***/ }),

/***/ "../pkg/flow_game_bg.wasm":
/*!********************************!*\
  !*** ../pkg/flow_game_bg.wasm ***!
  \********************************/
/*! exports provided: memory, __wbg_gamestate_free, gamestate_initial_game_state, gamestate_game_loop */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./flow_game */ \"../pkg/flow_game.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/flow_game_bg.wasm?");

/***/ }),

/***/ "./flow-game-main.js":
/*!***************************!*\
  !*** ./flow-game-main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var flow_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flow-game */ \"../pkg/flow_game.js\");\n/* harmony import */ var _rust_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rust-canvas */ \"./rust-canvas.js\");\n\n\n\nconst game_state = flow_game__WEBPACK_IMPORTED_MODULE_0__[\"GameState\"].initial_game_state();\n\n\nconst render_starter = (time_stamp) =>{\n  main_loop(game_state);\n}\n\n\n\n\nconst main_loop = () => {\n  const canvas = document.getElementById(\"gamecanvas\");\n  if(canvas == null){\n    requestAnimationFrame(function(time_stamp){\n      main_loop();\n    });\n    return;\n  }\n  const ctx = canvas.getContext('2d');\n  \n  game_state.game_loop(ctx, canvas.width, canvas.height);\n  \n  requestAnimationFrame(function(time_stamp){\n    main_loop();\n  });\n};\n\n\n\n\nrequestAnimationFrame(render_starter);\n\n\n\n\n//# sourceURL=webpack:///./flow-game-main.js?");

/***/ }),

/***/ "./rust-canvas.js":
/*!************************!*\
  !*** ./rust-canvas.js ***!
  \************************/
/*! exports provided: canvas_fill, canvas_ellipse, set_canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas_fill\", function() { return canvas_fill; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"canvas_ellipse\", function() { return canvas_ellipse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"set_canvas\", function() { return set_canvas; });\n\n\nwindow.wasm_canvas = null;\n\nfunction canvas_fill(x, y, w, h, fillString){\n  var ctx = window.wasm_canvas.getContext(\"2d\");\n  \n  ctx.fillStyle = fillString;\n  ctx.fillRect(x*window.wasm_canvas.height, y*window.wasm_canvas.height,\n               w*window.wasm_canvas.height, h*window.wasm_canvas.height);\n}\n\nfunction canvas_ellipse(x, y, w, h){\n  var ctx = window.wasm_canvas.getContext(\"2d\");\n  ctx.fillStyle = \"#FF0000\";\n  ctx.beginPath();\n  ctx.ellipse(x*window.wasm_canvas.height, y*window.wasm_canvas.height,\n              w*window.wasm_canvas.height, h*window.wasm_canvas.height,\n              0, 0, 2 * Math.PI);\n  ctx.stroke();\n  ctx.fillRect(x*window.wasm_canvas.height, y*window.wasm_canvas.height,\n               w*window.wasm_canvas.height, h*window.wasm_canvas.height);\n}\n\nfunction set_canvas(c){\n  window.wasm_canvas = c;\n}\n\n\n//# sourceURL=webpack:///./rust-canvas.js?");

/***/ })

}]);