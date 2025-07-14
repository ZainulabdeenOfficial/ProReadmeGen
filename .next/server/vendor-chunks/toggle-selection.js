/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/toggle-selection";
exports.ids = ["vendor-chunks/toggle-selection"];
exports.modules = {

/***/ "(ssr)/./node_modules/toggle-selection/index.js":
/*!************************************************!*\
  !*** ./node_modules/toggle-selection/index.js ***!
  \************************************************/
/***/ ((module) => {

eval("module.exports = function() {\n    var selection = document.getSelection();\n    if (!selection.rangeCount) {\n        return function() {};\n    }\n    var active = document.activeElement;\n    var ranges = [];\n    for(var i = 0; i < selection.rangeCount; i++){\n        ranges.push(selection.getRangeAt(i));\n    }\n    switch(active.tagName.toUpperCase()){\n        case \"INPUT\":\n        case \"TEXTAREA\":\n            active.blur();\n            break;\n        default:\n            active = null;\n            break;\n    }\n    selection.removeAllRanges();\n    return function() {\n        selection.type === \"Caret\" && selection.removeAllRanges();\n        if (!selection.rangeCount) {\n            ranges.forEach(function(range) {\n                selection.addRange(range);\n            });\n        }\n        active && active.focus();\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9naXRodWItcmVhZG1lLWdlbmVyYXRvci8uL25vZGVfbW9kdWxlcy90b2dnbGUtc2VsZWN0aW9uL2luZGV4LmpzPzViYWUiXSwic291cmNlc0NvbnRlbnQiOlsiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGVjdGlvbiA9IGRvY3VtZW50LmdldFNlbGVjdGlvbigpO1xuICBpZiAoIXNlbGVjdGlvbi5yYW5nZUNvdW50KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHt9O1xuICB9XG4gIHZhciBhY3RpdmUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gIHZhciByYW5nZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaSsrKSB7XG4gICAgcmFuZ2VzLnB1c2goc2VsZWN0aW9uLmdldFJhbmdlQXQoaSkpO1xuICB9XG5cbiAgc3dpdGNoIChhY3RpdmUudGFnTmFtZS50b1VwcGVyQ2FzZSgpKSB7IC8vIC50b1VwcGVyQ2FzZSBoYW5kbGVzIFhIVE1MXG4gICAgY2FzZSAnSU5QVVQnOlxuICAgIGNhc2UgJ1RFWFRBUkVBJzpcbiAgICAgIGFjdGl2ZS5ibHVyKCk7XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBhY3RpdmUgPSBudWxsO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZWN0aW9uLnR5cGUgPT09ICdDYXJldCcgJiZcbiAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG5cbiAgICBpZiAoIXNlbGVjdGlvbi5yYW5nZUNvdW50KSB7XG4gICAgICByYW5nZXMuZm9yRWFjaChmdW5jdGlvbihyYW5nZSkge1xuICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWN0aXZlICYmXG4gICAgYWN0aXZlLmZvY3VzKCk7XG4gIH07XG59O1xuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJzZWxlY3Rpb24iLCJkb2N1bWVudCIsImdldFNlbGVjdGlvbiIsInJhbmdlQ291bnQiLCJhY3RpdmUiLCJhY3RpdmVFbGVtZW50IiwicmFuZ2VzIiwiaSIsInB1c2giLCJnZXRSYW5nZUF0IiwidGFnTmFtZSIsInRvVXBwZXJDYXNlIiwiYmx1ciIsInJlbW92ZUFsbFJhbmdlcyIsInR5cGUiLCJmb3JFYWNoIiwicmFuZ2UiLCJhZGRSYW5nZSIsImZvY3VzIl0sIm1hcHBpbmdzIjoiQUFDQUEsT0FBT0MsT0FBTyxHQUFHO0lBQ2YsSUFBSUMsWUFBWUMsU0FBU0MsWUFBWTtJQUNyQyxJQUFJLENBQUNGLFVBQVVHLFVBQVUsRUFBRTtRQUN6QixPQUFPLFlBQWE7SUFDdEI7SUFDQSxJQUFJQyxTQUFTSCxTQUFTSSxhQUFhO0lBRW5DLElBQUlDLFNBQVMsRUFBRTtJQUNmLElBQUssSUFBSUMsSUFBSSxHQUFHQSxJQUFJUCxVQUFVRyxVQUFVLEVBQUVJLElBQUs7UUFDN0NELE9BQU9FLElBQUksQ0FBQ1IsVUFBVVMsVUFBVSxDQUFDRjtJQUNuQztJQUVBLE9BQVFILE9BQU9NLE9BQU8sQ0FBQ0MsV0FBVztRQUNoQyxLQUFLO1FBQ0wsS0FBSztZQUNIUCxPQUFPUSxJQUFJO1lBQ1g7UUFFRjtZQUNFUixTQUFTO1lBQ1Q7SUFDSjtJQUVBSixVQUFVYSxlQUFlO0lBQ3pCLE9BQU87UUFDTGIsVUFBVWMsSUFBSSxLQUFLLFdBQ25CZCxVQUFVYSxlQUFlO1FBRXpCLElBQUksQ0FBQ2IsVUFBVUcsVUFBVSxFQUFFO1lBQ3pCRyxPQUFPUyxPQUFPLENBQUMsU0FBU0MsS0FBSztnQkFDM0JoQixVQUFVaUIsUUFBUSxDQUFDRDtZQUNyQjtRQUNGO1FBRUFaLFVBQ0FBLE9BQU9jLEtBQUs7SUFDZDtBQUNGIiwiZmlsZSI6Iihzc3IpLy4vbm9kZV9tb2R1bGVzL3RvZ2dsZS1zZWxlY3Rpb24vaW5kZXguanMiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/toggle-selection/index.js\n");

/***/ })

};
;