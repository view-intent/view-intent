import * as React from "react";
import * as ReactDOM from "react-dom";
import { ViewFrame } from "./view-frame";
export var ViewRoot;
(function (ViewRoot) {
    function htmlInit(intent, element) {
        setImmediate(function () {
            var rootElement = element;
            if (typeof element === "string") {
                rootElement = document.getElementById(element);
            }
            ReactDOM.render(React.createElement(ViewFrame, { stack: "z", className: "root", root: true }), rootElement);
            // console.log("view-intent");
        });
    }
    ViewRoot.htmlInit = htmlInit;
})(ViewRoot || (ViewRoot = {}));
export default ViewRoot;
//# sourceMappingURL=view-root.js.map