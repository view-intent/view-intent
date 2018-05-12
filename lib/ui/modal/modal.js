"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const main_1 = require("../../view-intent/main");
// import "./.scss";
class Modal extends main_1.View {
    constructor(props) {
        super(props);
        this.viewInfo = Modal.viewInfo;
        this.state = {};
        // this.bindStore(putRootStoreInstanceHere);
    }
    render() {
        return React.createElement("div", { className: " " + this.props.className }, "global.Modal");
    }
}
exports.Modal = Modal;
(function (Modal) {
    Modal.viewInfo = {
        area: "global",
        name: "Modal",
        type: Modal,
        frameId: "root",
        require: [],
    };
})(Modal = exports.Modal || (exports.Modal = {}));
main_1.ViewIntent.registerViewType(Modal.viewInfo);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91aS9tb2RhbC9tb2RhbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBK0I7QUFFL0IsaURBQXFFO0FBQ3JFLG9CQUFvQjtBQUVwQixXQUFtQixTQUFRLFdBQWdDO0lBSXZELFlBQVksS0FBbUI7UUFDM0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBSlYsYUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFDMUIsVUFBSyxHQUFpQixFQUM1QixDQUFDO1FBR0UsNENBQTRDO0lBQ2hELENBQUM7SUFDTSxNQUFNO1FBQ1QsT0FBTyw2QkFBSyxTQUFTLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxtQkFBb0IsQ0FBQztJQUMxRSxDQUFDO0NBQ0o7QUFYRCxzQkFXQztBQUNELFdBQWlCLEtBQUs7SUFDTCxjQUFRLEdBQWM7UUFDaEMsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsT0FBTztRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsRUFBRTtLQUNiLENBQUM7QUFNTixDQUFDLEVBYmdCLEtBQUssR0FBTCxhQUFLLEtBQUwsYUFBSyxRQWFyQjtBQUNELGlCQUFVLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6InVpL21vZGFsL21vZGFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgVmlldywgVmlld0ludGVudCwgSVZpZXdJbmZvIH0gZnJvbSBcIi4uLy4uL3ZpZXctaW50ZW50L21haW5cIjtcclxuLy8gaW1wb3J0IFwiLi8uc2Nzc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZGFsIGV4dGVuZHMgVmlldzxNb2RhbC5JUHJvcHMsIE1vZGFsLklTdGF0ZT4ge1xyXG4gICAgcHVibGljIHZpZXdJbmZvID0gTW9kYWwudmlld0luZm87XHJcbiAgICBwdWJsaWMgc3RhdGU6IE1vZGFsLklTdGF0ZSA9IHtcclxuICAgIH07XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogTW9kYWwuSVByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIC8vIHRoaXMuYmluZFN0b3JlKHB1dFJvb3RTdG9yZUluc3RhbmNlSGVyZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e1wiIFwiICsgdGhpcy5wcm9wcy5jbGFzc05hbWV9Pmdsb2JhbC5Nb2RhbDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgbmFtZXNwYWNlIE1vZGFsIHtcclxuICAgIGV4cG9ydCBjb25zdCB2aWV3SW5mbzogSVZpZXdJbmZvID0ge1xyXG4gICAgICAgYXJlYTogXCJnbG9iYWxcIixcclxuICAgICAgIG5hbWU6IFwiTW9kYWxcIixcclxuICAgICAgIHR5cGU6IE1vZGFsLFxyXG4gICAgICAgZnJhbWVJZDogXCJyb290XCIsXHJcbiAgICAgICByZXF1aXJlOiBbXSxcclxuICAgIH07XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElQcm9wcyBleHRlbmRzIFZpZXcuSVByb3BzIHtcclxuICAgICAgICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTdGF0ZSBleHRlbmRzIFZpZXcuSVN0YXRlIHtcclxuICAgIH1cclxufVxyXG5WaWV3SW50ZW50LnJlZ2lzdGVyVmlld1R5cGUoTW9kYWwudmlld0luZm8pO1xyXG4iXX0=
