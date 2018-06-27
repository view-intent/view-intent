"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var view_frame_1 = require("./view-frame");
// import { AppContainer  } from "react-hot-loader";
var ViewRoot = /** @class */ (function () {
    function ViewRoot() {
    }
    return ViewRoot;
}());
exports.ViewRoot = ViewRoot;
(function (ViewRoot) {
    function htmlInit(intent, element, hotLoader) {
        if (hotLoader === void 0) { hotLoader = true; }
        setImmediate(function () {
            var rootElement = element;
            if (typeof element === "string") {
                rootElement = document.getElementById(element);
            }
            ReactDOM.render(React.createElement(view_frame_1.ViewFrame, { id: "root", className: "root", root: true }), rootElement);
        });
    }
    ViewRoot.htmlInit = htmlInit;
})(ViewRoot = exports.ViewRoot || (exports.ViewRoot = {}));
exports.ViewRoot = ViewRoot;
exports.default = ViewRoot;
//# sourceMappingURL=view-root.js.map