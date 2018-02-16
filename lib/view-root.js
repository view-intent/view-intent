import * as React from "react";
import * as ReactDOM from "react-dom";
import { ViewFrame } from "./view-frame";
export class ViewRoot {
}
(function (ViewRoot) {
    function htmlInit(intent, element) {
        setImmediate(() => {
            let rootElement = element;
            if (typeof element === "string") {
                rootElement = document.getElementById(element);
            }
            ReactDOM.render(React.createElement(ViewFrame, { className: "root", root: true }), rootElement);
            // console.log("view-intent");
        });
    }
    ViewRoot.htmlInit = htmlInit;
})(ViewRoot || (ViewRoot = {}));
export default ViewRoot;
//# sourceMappingURL=view-root.js.map