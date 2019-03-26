(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/flow_game.js":
/*!***************************!*\
  !*** ../pkg/flow_game.js ***!
  \***************************/
/*! exports provided: __wbg_alert_743c32ec4bd090a3, greet, __wbindgen_object_drop_ref */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_alert_743c32ec4bd090a3\", function() { return __wbg_alert_743c32ec4bd090a3; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"greet\", function() { return greet; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony import */ var _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flow_game_bg */ \"../pkg/flow_game_bg.wasm\");\n\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nfunction __wbg_alert_743c32ec4bd090a3(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n    alert(varg0);\n}\n/**\n* @returns {void}\n*/\nfunction greet() {\n    return _flow_game_bg__WEBPACK_IMPORTED_MODULE_0__[\"greet\"]();\n}\n\nconst heap = new Array(32);\n\nheap.fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction __wbindgen_object_drop_ref(i) { dropObject(i); }\n\n\n\n//# sourceURL=webpack:///../pkg/flow_game.js?");

/***/ }),

/***/ "../pkg/flow_game_bg.wasm":
/*!********************************!*\
  !*** ../pkg/flow_game_bg.wasm ***!
  \********************************/
/*! exports provided: memory, greet */
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var flow_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flow-game */ \"../pkg/flow_game.js\");\n\n\nflow_game__WEBPACK_IMPORTED_MODULE_0__[\"greet\"]();\n\n\n//# sourceURL=webpack:///./flow-game-main.js?");

/***/ })

}]);