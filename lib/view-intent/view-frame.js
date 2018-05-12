"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const view_intent_state_1 = require("./view-intent-state");
const view_type_store_1 = require("./view-type-store");
const main_1 = require("../mobx/main");
class ViewFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRoot: this.props.root,
            id: this.props.id,
        };
        this.mounted = false;
        this.unobserve = null;
        if (this.state.isRoot === true) {
            this.state.id = "root";
            ViewFrame.rootDefined = true;
        }
        else if (this.state.id === undefined || this.state.id === undefined) {
            throw new Error("View Frame must have an id.");
        }
        else if (this.state.id.toLowerCase() === "root") {
            this.state.isRoot = true;
            ViewFrame.rootDefined = true;
        }
        if (ViewFrame.rootDefined === false) {
            throw new Error(`The root "ViewFrame" wasn't defined.`);
        }
    }
    componentWillMount() {
        this.unobserve = main_1.observe(view_intent_state_1.ViewIntentState.Instance, (change) => {
            if (this.mounted) {
                this.forceUpdate();
            }
        });
    }
    componentDidMount() {
        this.mounted = true;
    }
    componentWillUnmount() {
        this.unobserve();
        this.mounted = false;
    }
    renderViewList() {
        const stateId = this.state.id;
        const r = view_intent_state_1.ViewIntentState.Instance.getViewStateListByFrameId(stateId)
            .map((viewState, index) => {
            let ViewRenderComponent;
            ViewRenderComponent = view_type_store_1.ViewTypeStore.getViewType(viewState.areaName, viewState.viewType);
            if (viewState.visible) {
                return React.createElement(ViewRenderComponent, { viewState: viewState, key: viewState.getViewInstanceAddress() });
            }
        });
        if (r !== undefined) {
            return r;
        }
        else {
            return [];
        }
    }
    render() {
        return React.createElement("div", { key: this.props.id, id: this.props.id, className: (this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame" }, this.renderViewList());
    }
}
exports.ViewFrame = ViewFrame;
(function (ViewFrame) {
    ViewFrame.rootDefined = false;
})(ViewFrame = exports.ViewFrame || (exports.ViewFrame = {}));
// export const HotViewFrame: any = hot(module)(ViewFrame);
exports.default = ViewFrame;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC92aWV3LWZyYW1lLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQUcvQiwyREFBaUU7QUFDakUsdURBQWtEO0FBRWxELHVDQUE2QztBQUc3QyxlQUF1QixTQUFRLEtBQUssQ0FBQyxTQUE2QztJQU9oRixZQUFZLEtBQXVCO1FBQ2pDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQVBSLFVBQUssR0FBcUI7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSTtZQUN2QixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1NBQ2xCLENBQUM7UUFDTSxZQUFPLEdBQVksS0FBSyxDQUFDO1FBQ3pCLGNBQVMsR0FBd0IsSUFBSSxDQUFDO1FBRzVDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssSUFBSSxFQUFFO1lBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQztZQUN2QixTQUFTLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUM5QjthQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFBRTtZQUNyRSxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7U0FDaEQ7YUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sRUFBRTtZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDekIsU0FBUyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDOUI7UUFDRCxJQUFJLFNBQVMsQ0FBQyxXQUFXLEtBQUssS0FBSyxFQUFFO1lBQ25DLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFDTSxrQkFBa0I7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxjQUFPLENBQUMsbUNBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUM1RCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUNwQjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNNLGlCQUFpQjtRQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDO0lBQ00sb0JBQW9CO1FBQ3pCLElBQUksQ0FBQyxTQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBRU0sY0FBYztRQUNuQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQWEsQ0FBQztRQUN6QyxNQUFNLENBQUMsR0FBRyxtQ0FBZSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxPQUFPLENBQUM7YUFDbEUsR0FBRyxDQUFDLENBQUMsU0FBb0IsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUMzQyxJQUFJLG1CQUFnQyxDQUFDO1lBQ3JDLG1CQUFtQixHQUFHLCtCQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3hGLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsT0FBTyxvQkFBQyxtQkFBbUIsSUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsc0JBQXNCLEVBQUUsR0FBSSxDQUFDO2FBQy9GO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDbkIsT0FBTyxDQUFDLENBQUM7U0FDVjthQUFNO1lBQ0wsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7SUFDTSxNQUFNO1FBQ1gsT0FBTyw2QkFDTCxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQ2xCLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFDakIsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsbUJBQW1CLElBQ25KLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FDbEIsQ0FBQztJQUNULENBQUM7Q0FDRjtBQTdERCw4QkE2REM7QUFDRCxXQUFpQixTQUFTO0lBQ2IscUJBQVcsR0FBWSxLQUFLLENBQUM7QUFVMUMsQ0FBQyxFQVhnQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQVd6QjtBQUNELDJEQUEyRDtBQUMzRCxrQkFBZSxTQUFTLENBQUMiLCJmaWxlIjoidmlldy1pbnRlbnQvdmlldy1mcmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XHJcbmltcG9ydCB7IFZpZXdJbnRlbnRTdGF0ZSwgVmlld1N0YXRlIH0gZnJvbSBcIi4vdmlldy1pbnRlbnQtc3RhdGVcIjtcclxuaW1wb3J0IHsgVmlld1R5cGVTdG9yZSB9IGZyb20gXCIuL3ZpZXctdHlwZS1zdG9yZVwiO1xyXG5pbXBvcnQgeyBob3QgfSBmcm9tIFwicmVhY3QtaG90LWxvYWRlclwiO1xyXG5pbXBvcnQgeyBvYnNlcnZlLCB0b0pTIH0gZnJvbSBcIi4uL21vYngvbWFpblwiO1xyXG5pbXBvcnQgKiBhcyB1bmlxaWQgZnJvbSBcInVuaXFpZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFZpZXdGcmFtZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxWaWV3RnJhbWUuSVByb3BzLCBWaWV3RnJhbWUuSVN0YXRlPiB7XHJcbiAgcHVibGljIHN0YXRlOiBWaWV3RnJhbWUuSVN0YXRlID0ge1xyXG4gICAgaXNSb290OiB0aGlzLnByb3BzLnJvb3QsXHJcbiAgICBpZDogdGhpcy5wcm9wcy5pZCxcclxuICB9O1xyXG4gIHByaXZhdGUgbW91bnRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgdW5vYnNlcnZlOiAoKCkgPT4gdm9pZCkgfCBudWxsID0gbnVsbDtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogVmlld0ZyYW1lLklQcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNSb290ID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuc3RhdGUuaWQgPSBcInJvb3RcIjtcclxuICAgICAgVmlld0ZyYW1lLnJvb3REZWZpbmVkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5pZCA9PT0gdW5kZWZpbmVkIHx8IHRoaXMuc3RhdGUuaWQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJWaWV3IEZyYW1lIG11c3QgaGF2ZSBhbiBpZC5cIik7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuaWQudG9Mb3dlckNhc2UoKSA9PT0gXCJyb290XCIpIHtcclxuICAgICAgdGhpcy5zdGF0ZS5pc1Jvb3QgPSB0cnVlO1xyXG4gICAgICBWaWV3RnJhbWUucm9vdERlZmluZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKFZpZXdGcmFtZS5yb290RGVmaW5lZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgcm9vdCBcIlZpZXdGcmFtZVwiIHdhc24ndCBkZWZpbmVkLmApO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgY29tcG9uZW50V2lsbE1vdW50KCkge1xyXG4gICAgdGhpcy51bm9ic2VydmUgPSBvYnNlcnZlKFZpZXdJbnRlbnRTdGF0ZS5JbnN0YW5jZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5tb3VudGVkKSB7XHJcbiAgICAgICAgdGhpcy5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbiAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5tb3VudGVkID0gdHJ1ZTtcclxuICB9XHJcbiAgcHVibGljIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgdGhpcy51bm9ic2VydmUhKCk7XHJcbiAgICB0aGlzLm1vdW50ZWQgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW5kZXJWaWV3TGlzdCgpOiBBcnJheTxKU1guRWxlbWVudCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3Qgc3RhdGVJZCA9IHRoaXMuc3RhdGUuaWQhIGFzIHN0cmluZztcclxuICAgIGNvbnN0IHIgPSBWaWV3SW50ZW50U3RhdGUuSW5zdGFuY2UuZ2V0Vmlld1N0YXRlTGlzdEJ5RnJhbWVJZChzdGF0ZUlkKVxyXG4gICAgICAubWFwKCh2aWV3U3RhdGU6IFZpZXdTdGF0ZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGxldCBWaWV3UmVuZGVyQ29tcG9uZW50OiB0eXBlb2YgVmlldztcclxuICAgICAgICBWaWV3UmVuZGVyQ29tcG9uZW50ID0gVmlld1R5cGVTdG9yZS5nZXRWaWV3VHlwZSh2aWV3U3RhdGUuYXJlYU5hbWUsIHZpZXdTdGF0ZS52aWV3VHlwZSk7XHJcbiAgICAgICAgaWYgKHZpZXdTdGF0ZS52aXNpYmxlKSB7XHJcbiAgICAgICAgICByZXR1cm4gPFZpZXdSZW5kZXJDb21wb25lbnQgdmlld1N0YXRlPXt2aWV3U3RhdGV9IGtleT17dmlld1N0YXRlLmdldFZpZXdJbnN0YW5jZUFkZHJlc3MoKX0gLz47XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIGlmIChyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgcmV0dXJuIHI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gW107XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgcmV0dXJuIDxkaXZcclxuICAgICAga2V5PXt0aGlzLnByb3BzLmlkfVxyXG4gICAgICBpZD17dGhpcy5wcm9wcy5pZH1cclxuICAgICAgY2xhc3NOYW1lPXsodGhpcy5wcm9wcy5jbGFzc05hbWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLmNsYXNzTmFtZSAhPT0gbnVsbCkgPyBcInZpZXctaW50ZW50LWZyYW1lIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWUgOiBcInZpZXctaW50ZW50LWZyYW1lXCJ9PlxyXG4gICAgICB7dGhpcy5yZW5kZXJWaWV3TGlzdCgpfVxyXG4gICAgPC9kaXY+O1xyXG4gIH1cclxufVxyXG5leHBvcnQgbmFtZXNwYWNlIFZpZXdGcmFtZSB7XHJcbiAgZXhwb3J0IGxldCByb290RGVmaW5lZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVByb3BzIHtcclxuICAgIHJvb3Q/OiBib29sZWFuO1xyXG4gICAgaWQ/OiBzdHJpbmc7XHJcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcclxuICAgIGlzUm9vdD86IGJvb2xlYW47XHJcbiAgICBpZD86IHN0cmluZztcclxuICB9XHJcbn1cclxuLy8gZXhwb3J0IGNvbnN0IEhvdFZpZXdGcmFtZTogYW55ID0gaG90KG1vZHVsZSkoVmlld0ZyYW1lKTtcclxuZXhwb3J0IGRlZmF1bHQgVmlld0ZyYW1lO1xyXG4iXX0=
