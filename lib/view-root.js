"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var view_frame_1 = require("./view-frame");
var ViewRoot;
(function (ViewRoot) {
    function htmlInit(intent, element) {
        setImmediate(function () {
            var rootElement = element;
            if (typeof element === "string") {
                rootElement = document.getElementById(element);
            }
            ReactDOM.render(React.createElement(view_frame_1.ViewFrame, { stack: "z", className: "root", root: true }), rootElement);
            // console.log("view-intent");
        });
    }
    ViewRoot.htmlInit = htmlInit;
})(ViewRoot = exports.ViewRoot || (exports.ViewRoot = {}));
exports.default = ViewRoot;
//# sourceMappingURL=view-root.js.map