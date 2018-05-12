"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const defaults_1 = require("./defaults");
function style(size = "32px") {
    return {
        width: size,
        height: size,
    };
}
class Icon extends React.Component {
    render() {
        const computedStyle = style(this.props.size);
        return React.createElement("span", { className: "viui-icon " + (this.props.className || ""), style: computedStyle }, () => {
            if (this.props.src === undefined || this.props.src === null) {
                return React.createElement("span", { className: "viui-icon-core", style: computedStyle },
                    React.createElement(defaults_1.CircleIcon, null));
            }
            else if (typeof this.props.src === "string") {
                return React.createElement("span", { className: "viui-icon-core" },
                    React.createElement("img", { src: this.props.src, style: computedStyle }));
            }
            else {
                const Src = this.props.src;
                return React.createElement("span", { className: "viui-icon-core", style: computedStyle },
                    React.createElement(Src, null));
            }
        });
    }
}
exports.Icon = Icon;
exports.default = Icon;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91aS9pY29ucy9pY29uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtCQUErQjtBQUUvQix5Q0FBd0M7QUFHeEMsZUFBZSxPQUFlLE1BQU07SUFJbEMsT0FBTztRQUNMLEtBQUssRUFBRSxJQUFJO1FBQ1gsTUFBTSxFQUFFLElBQUk7S0FDYixDQUFDO0FBQ0osQ0FBQztBQU9ELFVBQWtCLFNBQVEsS0FBSyxDQUFDLFNBQXFCO0lBQzVDLE1BQU07UUFDWCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QyxPQUFPLDhCQUNMLFNBQVMsRUFBRSxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUMsRUFDdEQsS0FBSyxFQUFFLGFBQWEsSUFBRyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUMzRCxPQUFPLDhCQUFNLFNBQVMsRUFBQyxnQkFBZ0IsRUFBQyxLQUFLLEVBQUUsYUFBYTtvQkFBRSxvQkFBQyxxQkFBVSxPQUFHLENBQU8sQ0FBQzthQUNyRjtpQkFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssUUFBUSxFQUFFO2dCQUM3QyxPQUFPLDhCQUFNLFNBQVMsRUFBQyxnQkFBZ0I7b0JBQUMsNkJBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLEdBQUksQ0FBTyxDQUFDO2FBQ25HO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBd0IsQ0FBQztnQkFDaEQsT0FBTyw4QkFBTSxTQUFTLEVBQUMsZ0JBQWdCLEVBQUMsS0FBSyxFQUFFLGFBQWE7b0JBQUUsb0JBQUMsR0FBRyxPQUFHLENBQU8sQ0FBQzthQUM5RTtRQUNILENBQUMsQ0FDSSxDQUFDO0lBQ1YsQ0FBQztDQUNGO0FBakJELG9CQWlCQztBQUVELGtCQUFlLElBQUksQ0FBQyIsImZpbGUiOiJ1aS9pY29ucy9pY29uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgQ2lyY2xlSWNvbiB9IGZyb20gXCIuL2RlZmF1bHRzXCI7XHJcbmltcG9ydCB7IElJY29uUHJvcHMgfSBmcm9tIFwiLi90eXBlc1wiO1xyXG5cclxuZnVuY3Rpb24gc3R5bGUoc2l6ZTogc3RyaW5nID0gXCIzMnB4XCIpOiB7XHJcbiAgd2lkdGg6IHN0cmluZyxcclxuICBoZWlnaHQ6IHN0cmluZyxcclxufSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHdpZHRoOiBzaXplLFxyXG4gICAgaGVpZ2h0OiBzaXplLFxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJSWNvblByb3BzIHtcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgc2l6ZT86IHN0cmluZztcclxuICBzcmM/OiAoKSA9PiBKU1guRWxlbWVudCB8IHN0cmluZyB8IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEljb24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SUljb25Qcm9wcz4ge1xyXG4gIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gc3R5bGUodGhpcy5wcm9wcy5zaXplKTtcclxuICAgIHJldHVybiA8c3BhblxyXG4gICAgICBjbGFzc05hbWU9e1widml1aS1pY29uIFwiICsgKHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8IFwiXCIpfVxyXG4gICAgICBzdHlsZT17Y29tcHV0ZWRTdHlsZX0+eygpID0+IHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zcmMgPT09IHVuZGVmaW5lZCB8fCB0aGlzLnByb3BzLnNyYyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cInZpdWktaWNvbi1jb3JlXCIgc3R5bGU9e2NvbXB1dGVkU3R5bGV9PjxDaXJjbGVJY29uIC8+PC9zcGFuPjtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnByb3BzLnNyYyA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgcmV0dXJuIDxzcGFuIGNsYXNzTmFtZT1cInZpdWktaWNvbi1jb3JlXCI+PGltZyBzcmM9e3RoaXMucHJvcHMuc3JjfSBzdHlsZT17Y29tcHV0ZWRTdHlsZX0gLz48L3NwYW4+O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBTcmMgPSB0aGlzLnByb3BzLnNyYyBhcyAoKSA9PiBKU1guRWxlbWVudDtcclxuICAgICAgICAgIHJldHVybiA8c3BhbiBjbGFzc05hbWU9XCJ2aXVpLWljb24tY29yZVwiIHN0eWxlPXtjb21wdXRlZFN0eWxlfT48U3JjIC8+PC9zcGFuPjtcclxuICAgICAgICB9XHJcbiAgICAgIH19XHJcbiAgICA8L3NwYW4+O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSWNvbjtcclxuIl19
