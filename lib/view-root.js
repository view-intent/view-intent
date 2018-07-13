import * as React from "react";
import { render } from "react-dom";
import { ViewFrame } from "./view-frame";
// import { AppContainer  } from "react-hot-loader";
var ViewRoot = /** @class */ (function () {
    function ViewRoot() {
    }
    return ViewRoot;
}());
export { ViewRoot };
(function (ViewRoot) {
    function htmlInit(intent, element, hotLoader) {
        if (hotLoader === void 0) { hotLoader = true; }
        setImmediate(function () {
            var rootElement = element;
            if (typeof element === "string") {
                rootElement = document.getElementById(element);
            }
            render(React.createElement(ViewFrame, { id: "root", className: "root", root: true }), rootElement);
        });
    }
    ViewRoot.htmlInit = htmlInit;
})(ViewRoot || (ViewRoot = {}));
export default ViewRoot;
//# sourceMappingURL=view-root.js.map