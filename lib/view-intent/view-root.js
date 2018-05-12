"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const view_frame_1 = require("./view-frame");
class ViewRoot {
}
exports.ViewRoot = ViewRoot;
(function (ViewRoot) {
    function htmlInit(intent, element, hotLoader = true) {
        setImmediate(() => {
            let rootElement = element;
            if (typeof element === "string") {
                rootElement = document.getElementById(element);
            }
            ReactDOM.render(React.createElement(view_frame_1.ViewFrame, { className: "root", root: true }), rootElement);
        });
    }
    ViewRoot.htmlInit = htmlInit;
})(ViewRoot = exports.ViewRoot || (exports.ViewRoot = {}));
exports.default = ViewRoot;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC92aWV3LXJvb3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0JBQStCO0FBQy9CLHNDQUFzQztBQUN0Qyw2Q0FBeUM7QUFDekM7Q0FBeUI7QUFBekIsNEJBQXlCO0FBQ3pCLFdBQWlCLFFBQVE7SUFDdkIsa0JBQXlCLE1BQWUsRUFBRSxPQUE2QixFQUFFLFlBQXFCLElBQUk7UUFDaEcsWUFBWSxDQUFDLEdBQUcsRUFBRTtZQUNoQixJQUFJLFdBQVcsR0FBZ0IsT0FBc0IsQ0FBQztZQUN0RCxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBaUIsQ0FBZ0IsQ0FBQzthQUN6RTtZQUNELFFBQVEsQ0FBQyxNQUFNLENBQUMsb0JBQUMsc0JBQVMsSUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBRSxJQUFJLEdBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFSZSxpQkFBUSxXQVF2QixDQUFBO0FBQ0gsQ0FBQyxFQVZnQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQVV4QjtBQUVELGtCQUFlLFFBQVEsQ0FBQyIsImZpbGUiOiJ2aWV3LWludGVudC92aWV3LXJvb3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJSW50ZW50IH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgVmlld0ZyYW1lIH0gZnJvbSBcIi4vdmlldy1mcmFtZVwiO1xyXG5leHBvcnQgY2xhc3MgVmlld1Jvb3QgeyB9XHJcbmV4cG9ydCBuYW1lc3BhY2UgVmlld1Jvb3Qge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBodG1sSW5pdChpbnRlbnQ6IElJbnRlbnQsIGVsZW1lbnQ6IHN0cmluZyB8IEhUTUxFbGVtZW50LCBob3RMb2FkZXI6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICBzZXRJbW1lZGlhdGUoKCkgPT4ge1xyXG4gICAgICBsZXQgcm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gZWxlbWVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50IGFzIHN0cmluZykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgICAgUmVhY3RET00ucmVuZGVyKDxWaWV3RnJhbWUgY2xhc3NOYW1lPVwicm9vdFwiIHJvb3Q9e3RydWV9IC8+LCByb290RWxlbWVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFZpZXdSb290O1xyXG4iXX0=
