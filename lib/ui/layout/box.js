"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// import "./.scss";
const loadCss = require("load-css-file");
// loadCss("file:///D:/dan2dev/view-intent/src/ui/layout/box.css");
// import "./box.css";
class Box extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return React.createElement("div", { className: "viui-box" },
            React.createElement("div", { className: "viui-box__title" }, this.props.title),
            React.createElement("div", { className: "viui-box__body" }, this.props.children));
    }
}
exports.Box = Box;
exports.default = Box;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91aS9sYXlvdXQvYm94LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQUUvQixvQkFBb0I7QUFDcEIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3pDLG1FQUFtRTtBQUNuRSxzQkFBc0I7QUFFdEIsU0FBaUIsU0FBUSxLQUFLLENBQUMsU0FBaUM7SUFHOUQsWUFBWSxLQUFpQjtRQUMzQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFIUixVQUFLLEdBQWUsRUFDMUIsQ0FBQztJQUdGLENBQUM7SUFDTSxNQUFNO1FBQ1gsT0FBTyw2QkFBSyxTQUFTLEVBQUUsVUFBVTtZQUMvQiw2QkFBSyxTQUFTLEVBQUUsaUJBQWlCLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQU87WUFDM0QsNkJBQUssU0FBUyxFQUFFLGdCQUFnQixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFPLENBQ3pELENBQUM7SUFDVCxDQUFDO0NBQ0Y7QUFaRCxrQkFZQztBQVNELGtCQUFlLEdBQUcsQ0FBQyIsImZpbGUiOiJ1aS9sYXlvdXQvYm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuLy8gaW1wb3J0IFwiLi8uc2Nzc1wiO1xyXG5jb25zdCBsb2FkQ3NzID0gcmVxdWlyZShcImxvYWQtY3NzLWZpbGVcIik7XHJcbi8vIGxvYWRDc3MoXCJmaWxlOi8vL0Q6L2RhbjJkZXYvdmlldy1pbnRlbnQvc3JjL3VpL2xheW91dC9ib3guY3NzXCIpO1xyXG4vLyBpbXBvcnQgXCIuL2JveC5jc3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBCb3ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8Qm94LklQcm9wcywgQm94LklTdGF0ZT4ge1xyXG4gIHB1YmxpYyBzdGF0ZTogQm94LklTdGF0ZSA9IHtcclxuICB9O1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBCb3guSVByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHB1YmxpYyByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcInZpdWktYm94XCJ9PlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17XCJ2aXVpLWJveF9fdGl0bGVcIn0+e3RoaXMucHJvcHMudGl0bGV9PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtcInZpdWktYm94X19ib2R5XCJ9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvZGl2PlxyXG4gICAgPC9kaXY+O1xyXG4gIH1cclxufVxyXG5leHBvcnQgbmFtZXNwYWNlIEJveCB7XHJcbiAgZXhwb3J0IGludGVyZmFjZSBJUHJvcHMge1xyXG4gICAgdGl0bGU/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgICBjbGFzc05hbWU/OiBzdHJpbmdbXTtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xyXG4gIH1cclxufVxyXG5leHBvcnQgZGVmYXVsdCBCb3g7XHJcbiJdfQ==
