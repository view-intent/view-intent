"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const box_1 = require("./box");
// import "./.scss";
class ViewBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderTitle.bind(this);
    }
    renderTitle() {
        return [
            React.createElement("div", { className: "-title-name" }, this.props.title),
            React.createElement("div", { className: "-title-action" }),
        ];
    }
    render() {
        return React.createElement(box_1.Box, { title: this.props.title }, this.props.children);
    }
}
exports.ViewBox = ViewBox;
exports.default = ViewBox;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91aS9sYXlvdXQvdmlldy1ib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBRS9CLCtCQUE0QjtBQUM1QixvQkFBb0I7QUFFcEIsYUFBcUIsU0FBUSxLQUFLLENBQUMsU0FBeUM7SUFHMUUsWUFBWSxLQUFxQjtRQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFIUixVQUFLLEdBQW1CLEVBQzlCLENBQUM7UUFHQSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ00sV0FBVztRQUNoQixPQUFPO1lBQ0wsNkJBQUssU0FBUyxFQUFDLGFBQWEsSUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBTztZQUNyRCw2QkFBSyxTQUFTLEVBQUMsZUFBZSxHQUFPO1NBQ3RDLENBQUM7SUFDSixDQUFDO0lBQ00sTUFBTTtRQUNYLE9BQU8sb0JBQUMsU0FBRyxJQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBTyxDQUFDO0lBQ25FLENBQUM7Q0FDRjtBQWhCRCwwQkFnQkM7QUFXRCxrQkFBZSxPQUFPLENBQUMiLCJmaWxlIjoidWkvbGF5b3V0L3ZpZXctYm94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgQm94IH0gZnJvbSBcIi4vYm94XCI7XHJcbi8vIGltcG9ydCBcIi4vLnNjc3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBWaWV3Qm94IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFZpZXdCb3guSVByb3BzLCBWaWV3Qm94LklTdGF0ZT4ge1xyXG4gIHB1YmxpYyBzdGF0ZTogVmlld0JveC5JU3RhdGUgPSB7XHJcbiAgfTtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogVmlld0JveC5JUHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMucmVuZGVyVGl0bGUuYmluZCh0aGlzKTtcclxuICB9XHJcbiAgcHVibGljIHJlbmRlclRpdGxlKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIi10aXRsZS1uYW1lXCI+e3RoaXMucHJvcHMudGl0bGV9PC9kaXY+LFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIi10aXRsZS1hY3Rpb25cIj48L2Rpdj4sXHJcbiAgICBdO1xyXG4gIH1cclxuICBwdWJsaWMgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgIHJldHVybiA8Qm94IHRpdGxlPXt0aGlzLnByb3BzLnRpdGxlfT57dGhpcy5wcm9wcy5jaGlsZHJlbn08L0JveD47XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBuYW1lc3BhY2UgVmlld0JveCB7XHJcbiAgZXhwb3J0IGludGVyZmFjZSBJUHJvcHMge1xyXG4gICAgdGl0bGU/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgICBjbG9zZUJ1dHRvbj86IGJvb2xlYW47XHJcbiAgICBjbGFzc05hbWU/OiBzdHJpbmdbXTtcclxuICB9XHJcbiAgZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xyXG5cclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVmlld0JveDtcclxuIl19
