"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/space-separated-tokens";
exports.ids = ["vendor-chunks/space-separated-tokens"];
exports.modules = {

/***/ "(ssr)/./node_modules/space-separated-tokens/index.js":
/*!******************************************************!*\
  !*** ./node_modules/space-separated-tokens/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nexports.parse = parse;\nexports.stringify = stringify;\nvar empty = \"\";\nvar space = \" \";\nvar whiteSpace = /[ \\t\\n\\r\\f]+/g;\nfunction parse(value) {\n    var input = String(value || empty).trim();\n    return input === empty ? [] : input.split(whiteSpace);\n}\nfunction stringify(values) {\n    return values.join(space).trim();\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3BhY2Utc2VwYXJhdGVkLXRva2Vucy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUVBQSxhQUFhLEdBQUdDO0FBQ2hCRCxpQkFBaUIsR0FBR0U7QUFFcEIsSUFBSUMsUUFBUTtBQUNaLElBQUlDLFFBQVE7QUFDWixJQUFJQyxhQUFhO0FBRWpCLFNBQVNKLE1BQU1LLEtBQUs7SUFDbEIsSUFBSUMsUUFBUUMsT0FBT0YsU0FBU0gsT0FBT00sSUFBSTtJQUN2QyxPQUFPRixVQUFVSixRQUFRLEVBQUUsR0FBR0ksTUFBTUcsS0FBSyxDQUFDTDtBQUM1QztBQUVBLFNBQVNILFVBQVVTLE1BQU07SUFDdkIsT0FBT0EsT0FBT0MsSUFBSSxDQUFDUixPQUFPSyxJQUFJO0FBQ2hDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2l0aHViLXJlYWRtZS1nZW5lcmF0b3IvLi9ub2RlX21vZHVsZXMvc3BhY2Utc2VwYXJhdGVkLXRva2Vucy9pbmRleC5qcz9kNmI4Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLnBhcnNlID0gcGFyc2VcbmV4cG9ydHMuc3RyaW5naWZ5ID0gc3RyaW5naWZ5XG5cbnZhciBlbXB0eSA9ICcnXG52YXIgc3BhY2UgPSAnICdcbnZhciB3aGl0ZVNwYWNlID0gL1sgXFx0XFxuXFxyXFxmXSsvZ1xuXG5mdW5jdGlvbiBwYXJzZSh2YWx1ZSkge1xuICB2YXIgaW5wdXQgPSBTdHJpbmcodmFsdWUgfHwgZW1wdHkpLnRyaW0oKVxuICByZXR1cm4gaW5wdXQgPT09IGVtcHR5ID8gW10gOiBpbnB1dC5zcGxpdCh3aGl0ZVNwYWNlKVxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkodmFsdWVzKSB7XG4gIHJldHVybiB2YWx1ZXMuam9pbihzcGFjZSkudHJpbSgpXG59XG4iXSwibmFtZXMiOlsiZXhwb3J0cyIsInBhcnNlIiwic3RyaW5naWZ5IiwiZW1wdHkiLCJzcGFjZSIsIndoaXRlU3BhY2UiLCJ2YWx1ZSIsImlucHV0IiwiU3RyaW5nIiwidHJpbSIsInNwbGl0IiwidmFsdWVzIiwiam9pbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/space-separated-tokens/index.js\n");

/***/ })

};
;