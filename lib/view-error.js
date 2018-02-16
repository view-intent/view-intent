import * as React from "react";
import { View } from "./view";
// import { View, ViewIntent, IViewInfo } from "view-intent";
// import { RootStore } from "tonolucro-delivery-state";
// import "./none.scss";
export class ViewNotFound extends View {
    constructor(props) {
        super(props);
        this.viewInfo = ViewNotFound.viewInfo;
        this.state = {};
        // this.bindStore(putRootStoreInstanceHere);
    }
    render() {
        return React.createElement("div", { className: "rows rh-12 rw-12" },
            React.createElement("div", null, "View Not Found"));
    }
}
(function (ViewNotFound) {
    ViewNotFound.viewInfo = {
        area: "default",
        name: "ViewNotFound",
        type: ViewNotFound,
        frameId: "root",
        require: [],
    };
})(ViewNotFound || (ViewNotFound = {}));
//# sourceMappingURL=view-error.js.map