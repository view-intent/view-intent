"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const field_1 = require("../field/field");
const main_1 = require("../../../view-intent/main");
// import "./.scss";
const uniqid_1 = require("uniqid");
require("./selectbox-modal");
// const loadCss = require("load-css-file");
// // loadCss("D:\\dan2dev\\view-intent\\src\\ui\\form\\selectbox\\selectbox.css");
class Selectbox extends React.Component {
    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
        this.uniqueId = uniqid_1.process();
        this.state = {};
        this.viewResponse.bind(this);
        console.log("uniqueId: " + this.uniqueId);
    }
    viewResponse(data) {
        console.log("response - ", data);
    }
    render() {
        return React.createElement(field_1.default, { type: "selectbox", className: "viui-selectbox" },
            React.createElement("div", { ref: this.buttonRef, onClick: () => {
                    main_1.default.intentView({ areaName: "viui", viewType: "SelectboxModal", instanceId: this.uniqueId }, {}, this.viewResponse);
                } },
                React.createElement("span", null,
                    "\\/ ---xx ",
                    this.uniqueId)));
    }
}
exports.Selectbox = Selectbox;
exports.default = Selectbox;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91aS9mb3JtL3NlbGVjdGJveC9zZWxlY3Rib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBRS9CLDBDQUFtQztBQUNuQyxvREFBbUQ7QUFDbkQsb0JBQW9CO0FBQ3BCLG1DQUFpQztBQUNqQyw2QkFBMkI7QUFFM0IsNENBQTRDO0FBQzVDLG1GQUFtRjtBQUVuRixlQUF1QixTQUFRLEtBQUssQ0FBQyxTQUE2QztJQUtoRixZQUFZLEtBQXVCO1FBQ2pDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUxSLGNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxFQUFrQixDQUFDO1FBQzlDLGFBQVEsR0FBVyxnQkFBTyxFQUFFLENBQUM7UUFDN0IsVUFBSyxHQUFxQixFQUNoQyxDQUFDO1FBR0EsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTSxZQUFZLENBQUMsSUFBUztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ00sTUFBTTtRQUNYLE9BQU8sb0JBQUMsZUFBSyxJQUNYLElBQUksRUFBQyxXQUFXLEVBQ2hCLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0IsNkJBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRTtvQkFDdEMsY0FBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDNUgsQ0FBQztnQkFDQzs7b0JBQWdCLElBQUksQ0FBQyxRQUFRLENBQVEsQ0FDakMsQ0FDQSxDQUFDO0lBQ1gsQ0FBQztDQUNGO0FBeEJELDhCQXdCQztBQVNELGtCQUFlLFNBQVMsQ0FBQyIsImZpbGUiOiJ1aS9mb3JtL3NlbGVjdGJveC9zZWxlY3Rib3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgRmllbGQgZnJvbSBcIi4uL2ZpZWxkL2ZpZWxkXCI7XHJcbmltcG9ydCBWaWV3SW50ZW50IGZyb20gXCIuLi8uLi8uLi92aWV3LWludGVudC9tYWluXCI7XHJcbi8vIGltcG9ydCBcIi4vLnNjc3NcIjtcclxuaW1wb3J0IHsgcHJvY2VzcyB9IGZyb20gXCJ1bmlxaWRcIjtcclxuaW1wb3J0IFwiLi9zZWxlY3Rib3gtbW9kYWxcIjtcclxuXHJcbi8vIGNvbnN0IGxvYWRDc3MgPSByZXF1aXJlKFwibG9hZC1jc3MtZmlsZVwiKTtcclxuLy8gLy8gbG9hZENzcyhcIkQ6XFxcXGRhbjJkZXZcXFxcdmlldy1pbnRlbnRcXFxcc3JjXFxcXHVpXFxcXGZvcm1cXFxcc2VsZWN0Ym94XFxcXHNlbGVjdGJveC5jc3NcIik7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VsZWN0Ym94IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFNlbGVjdGJveC5JUHJvcHMsIFNlbGVjdGJveC5JU3RhdGU+IHtcclxuICBwdWJsaWMgYnV0dG9uUmVmID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xyXG4gIHB1YmxpYyB1bmlxdWVJZDogc3RyaW5nID0gcHJvY2VzcygpO1xyXG4gIHB1YmxpYyBzdGF0ZTogU2VsZWN0Ym94LklTdGF0ZSA9IHtcclxuICB9O1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBTZWxlY3Rib3guSVByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgICB0aGlzLnZpZXdSZXNwb25zZS5iaW5kKHRoaXMpO1xyXG4gICAgY29uc29sZS5sb2coXCJ1bmlxdWVJZDogXCIgKyB0aGlzLnVuaXF1ZUlkKTtcclxuICB9XHJcbiAgcHVibGljIHZpZXdSZXNwb25zZShkYXRhOiBhbnkpIHtcclxuICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2UgLSBcIiwgZGF0YSk7XHJcbiAgfVxyXG4gIHB1YmxpYyByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgcmV0dXJuIDxGaWVsZFxyXG4gICAgICB0eXBlPVwic2VsZWN0Ym94XCJcclxuICAgICAgY2xhc3NOYW1lPXtcInZpdWktc2VsZWN0Ym94XCJ9PlxyXG4gICAgICA8ZGl2IHJlZj17dGhpcy5idXR0b25SZWZ9IG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICBWaWV3SW50ZW50LmludGVudFZpZXcoeyBhcmVhTmFtZTogXCJ2aXVpXCIsIHZpZXdUeXBlOiBcIlNlbGVjdGJveE1vZGFsXCIsIGluc3RhbmNlSWQ6IHRoaXMudW5pcXVlSWQgfSwge30sIHRoaXMudmlld1Jlc3BvbnNlKTtcclxuICAgICAgfX0+XHJcbiAgICAgICAgPHNwYW4+XFwvIC0tLXh4IHt0aGlzLnVuaXF1ZUlkfTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L0ZpZWxkPjtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgU2VsZWN0Ym94IHtcclxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdGJveDtcclxuIl19
