"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const main_1 = require("../../../view-intent/main");
class SelectboxModal extends main_1.View {
    constructor(props) {
        super(props);
        this.viewInfo = SelectboxModal.viewInfo;
        this.state = {};
    }
    render() {
        return React.createElement("div", { className: " " + this.props.className },
            React.createElement("button", { onClick: () => { main_1.ViewIntent.back(); } },
                "voltar - ",
                this.viewState.instanceId));
    }
}
exports.SelectboxModal = SelectboxModal;
(function (SelectboxModal) {
    SelectboxModal.viewInfo = {
        area: "viui",
        name: "SelectboxModal",
        type: SelectboxModal,
        frameId: "root",
        require: "stack",
    };
})(SelectboxModal = exports.SelectboxModal || (exports.SelectboxModal = {}));
console.log("selectbox modal");
main_1.ViewIntent.registerViewType(SelectboxModal.viewInfo);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91aS9mb3JtL3NlbGVjdGJveC9zZWxlY3Rib3gtbW9kYWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0JBQStCO0FBRS9CLG9EQUF3RTtBQUV4RSxvQkFBNEIsU0FBUSxXQUFrRDtJQUlwRixZQUFZLEtBQTRCO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUpSLGFBQVEsR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDO1FBQ25DLFVBQUssR0FBMEIsRUFDckMsQ0FBQztJQUdGLENBQUM7SUFDTSxNQUFNO1FBQ1gsT0FBTyw2QkFBSyxTQUFTLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztZQUMvQyxnQ0FBUSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUUsaUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7O2dCQUFZLElBQUksQ0FBQyxTQUFVLENBQUMsVUFBVSxDQUFVLENBQ3hGLENBQUM7SUFDVCxDQUFDO0NBQ0Y7QUFaRCx3Q0FZQztBQUNELFdBQWlCLGNBQWM7SUFDaEIsdUJBQVEsR0FBYztRQUNqQyxJQUFJLEVBQUUsTUFBTTtRQUNaLElBQUksRUFBRSxnQkFBZ0I7UUFDdEIsSUFBSSxFQUFFLGNBQWM7UUFDcEIsT0FBTyxFQUFFLE1BQU07UUFDZixPQUFPLEVBQUUsT0FBTztLQUNqQixDQUFDO0FBTUosQ0FBQyxFQWJnQixjQUFjLEdBQWQsc0JBQWMsS0FBZCxzQkFBYyxRQWE5QjtBQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMvQixpQkFBVSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJ1aS9mb3JtL3NlbGVjdGJveC9zZWxlY3Rib3gtbW9kYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyBWaWV3LCBWaWV3SW50ZW50LCBJVmlld0luZm8gfSBmcm9tIFwiLi4vLi4vLi4vdmlldy1pbnRlbnQvbWFpblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlbGVjdGJveE1vZGFsIGV4dGVuZHMgVmlldzxTZWxlY3Rib3hNb2RhbC5JUHJvcHMsIFNlbGVjdGJveE1vZGFsLklTdGF0ZT4ge1xyXG4gIHB1YmxpYyB2aWV3SW5mbyA9IFNlbGVjdGJveE1vZGFsLnZpZXdJbmZvO1xyXG4gIHB1YmxpYyBzdGF0ZTogU2VsZWN0Ym94TW9kYWwuSVN0YXRlID0ge1xyXG4gIH07XHJcbiAgY29uc3RydWN0b3IocHJvcHM6IFNlbGVjdGJveE1vZGFsLklQcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCIgXCIgKyB0aGlzLnByb3BzLmNsYXNzTmFtZX0+XHJcbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4ge1ZpZXdJbnRlbnQuYmFjaygpOyB9fT52b2x0YXIgLSB7dGhpcy52aWV3U3RhdGUhLmluc3RhbmNlSWR9PC9idXR0b24+XHJcbiAgICA8L2Rpdj47XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBuYW1lc3BhY2UgU2VsZWN0Ym94TW9kYWwge1xyXG4gIGV4cG9ydCBjb25zdCB2aWV3SW5mbzogSVZpZXdJbmZvID0ge1xyXG4gICAgYXJlYTogXCJ2aXVpXCIsXHJcbiAgICBuYW1lOiBcIlNlbGVjdGJveE1vZGFsXCIsXHJcbiAgICB0eXBlOiBTZWxlY3Rib3hNb2RhbCxcclxuICAgIGZyYW1lSWQ6IFwicm9vdFwiLFxyXG4gICAgcmVxdWlyZTogXCJzdGFja1wiLFxyXG4gIH07XHJcbiAgZXhwb3J0IGludGVyZmFjZSBJUHJvcHMgZXh0ZW5kcyBWaWV3LklQcm9wcyB7XHJcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIGV4dGVuZHMgVmlldy5JU3RhdGUge1xyXG4gIH1cclxufVxyXG5jb25zb2xlLmxvZyhcInNlbGVjdGJveCBtb2RhbFwiKTtcclxuVmlld0ludGVudC5yZWdpc3RlclZpZXdUeXBlKFNlbGVjdGJveE1vZGFsLnZpZXdJbmZvKTtcclxuIl19
