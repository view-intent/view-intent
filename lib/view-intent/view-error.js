"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const view_1 = require("./view");
// import { View, ViewIntent, IViewInfo } from "view-intent";
// import { RootStore } from "tonolucro-delivery-state";
// import "./none.scss";
class ViewNotFound extends view_1.View {
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
exports.ViewNotFound = ViewNotFound;
(function (ViewNotFound) {
    ViewNotFound.viewInfo = {
        area: "default",
        name: "ViewNotFound",
        type: ViewNotFound,
        frameId: "root",
        require: [],
    };
})(ViewNotFound = exports.ViewNotFound || (exports.ViewNotFound = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC92aWV3LWVycm9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQUUvQixpQ0FBOEI7QUFHOUIsNkRBQTZEO0FBQzdELHdEQUF3RDtBQUN4RCx3QkFBd0I7QUFFeEIsa0JBQTBCLFNBQVEsV0FBOEM7SUFJOUUsWUFBWSxLQUEwQjtRQUNwQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFKUixhQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxVQUFLLEdBQXdCLEVBQ25DLENBQUM7UUFHQSw0Q0FBNEM7SUFDOUMsQ0FBQztJQUNNLE1BQU07UUFDWCxPQUFPLDZCQUFLLFNBQVMsRUFBRSxrQkFBa0I7WUFBRSxrREFBeUIsQ0FBTSxDQUFDO0lBQzdFLENBQUM7Q0FDRjtBQVhELG9DQVdDO0FBQ0QsV0FBaUIsWUFBWTtJQUNkLHFCQUFRLEdBQWM7UUFDakMsSUFBSSxFQUFFLFNBQVM7UUFDZixJQUFJLEVBQUUsY0FBYztRQUNwQixJQUFJLEVBQUUsWUFBWTtRQUNsQixPQUFPLEVBQUUsTUFBTTtRQUNmLE9BQU8sRUFBRSxFQUFFO0tBQ1osQ0FBQztBQU1KLENBQUMsRUFiZ0IsWUFBWSxHQUFaLG9CQUFZLEtBQVosb0JBQVksUUFhNUIiLCJmaWxlIjoidmlldy1pbnRlbnQvdmlldy1lcnJvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XHJcbmltcG9ydCB7IElWaWV3SW5mbyB9IGZyb20gXCIuL3R5cGVzXCI7XHJcblxyXG4vLyBpbXBvcnQgeyBWaWV3LCBWaWV3SW50ZW50LCBJVmlld0luZm8gfSBmcm9tIFwidmlldy1pbnRlbnRcIjtcclxuLy8gaW1wb3J0IHsgUm9vdFN0b3JlIH0gZnJvbSBcInRvbm9sdWNyby1kZWxpdmVyeS1zdGF0ZVwiO1xyXG4vLyBpbXBvcnQgXCIuL25vbmUuc2Nzc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdOb3RGb3VuZCBleHRlbmRzIFZpZXc8Vmlld05vdEZvdW5kLklQcm9wcywgVmlld05vdEZvdW5kLklTdGF0ZT4ge1xyXG4gIHB1YmxpYyB2aWV3SW5mbyA9IFZpZXdOb3RGb3VuZC52aWV3SW5mbztcclxuICBwdWJsaWMgc3RhdGU6IFZpZXdOb3RGb3VuZC5JU3RhdGUgPSB7XHJcbiAgfTtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogVmlld05vdEZvdW5kLklQcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgLy8gdGhpcy5iaW5kU3RvcmUocHV0Um9vdFN0b3JlSW5zdGFuY2VIZXJlKTtcclxuICB9XHJcbiAgcHVibGljIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XHJcbiAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wicm93cyByaC0xMiBydy0xMlwifT48ZGl2PlZpZXcgTm90IEZvdW5kPC9kaXY+PC9kaXY+O1xyXG4gIH1cclxufVxyXG5leHBvcnQgbmFtZXNwYWNlIFZpZXdOb3RGb3VuZCB7XHJcbiAgZXhwb3J0IGNvbnN0IHZpZXdJbmZvOiBJVmlld0luZm8gPSB7XHJcbiAgICBhcmVhOiBcImRlZmF1bHRcIixcclxuICAgIG5hbWU6IFwiVmlld05vdEZvdW5kXCIsXHJcbiAgICB0eXBlOiBWaWV3Tm90Rm91bmQsXHJcbiAgICBmcmFtZUlkOiBcInJvb3RcIixcclxuICAgIHJlcXVpcmU6IFtdLFxyXG4gIH07XHJcbiAgZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBWaWV3LklQcm9wcyB7XHJcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIGV4dGVuZHMgVmlldy5JU3RhdGUge1xyXG4gIH1cclxufVxyXG4iXX0=
