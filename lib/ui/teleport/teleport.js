"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const utility_collection_1 = require("utility-collection");
// console.log("process: ", process());
class Teleport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        if (Teleport.getSource(this.props.target) !== this) {
            Teleport.registerSource(this);
        }
    }
    componentWillUnmount() {
        Teleport.unregisterSource(this);
    }
    componentWillUpdate() {
        TeleportTarget.update(this.props.target);
    }
    componentDidUpdate() {
    }
    render() {
        return null;
    }
}
exports.Teleport = Teleport;
class TeleportTarget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        TeleportTarget.registerTeleport(this);
    }
    componentWillUnmount() {
        TeleportTarget.unregisterTeleport(this);
    }
    render() {
        const source = Teleport.getSource(this.props.id);
        if (!utility_collection_1.Is.nullOrUndefined(source)) {
            return source.props.children || null;
        }
        else {
            return null;
        }
    }
}
exports.TeleportTarget = TeleportTarget;
(function (Teleport) {
    const sources = {};
    function registerSource(source) {
        sources[source.props.target] = source;
        TeleportTarget.update(source.props.target);
    }
    Teleport.registerSource = registerSource;
    function unregisterSource(source) {
        delete sources[source.props.target];
        TeleportTarget.update(source.props.target);
    }
    Teleport.unregisterSource = unregisterSource;
    function getSource(targetId) {
        if (!utility_collection_1.Is.nullOrUndefined(sources[targetId])) {
            return sources[targetId];
        }
        else {
            return null;
        }
    }
    Teleport.getSource = getSource;
})(Teleport = exports.Teleport || (exports.Teleport = {}));
(function (TeleportTarget) {
    const targets = {};
    function registerTeleport(target) {
        delete targets[target.props.id];
        targets[target.props.id] = target;
    }
    TeleportTarget.registerTeleport = registerTeleport;
    function unregisterTeleport(target) {
        //
    }
    TeleportTarget.unregisterTeleport = unregisterTeleport;
    function update(targetId) {
        if (!utility_collection_1.Is.nullOrUndefined(targets[targetId])) {
            targets[targetId].forceUpdate();
        }
    }
    TeleportTarget.update = update;
})(TeleportTarget = exports.TeleportTarget || (exports.TeleportTarget = {}));
const TeleportTargetBody = document.createElement("div");
document.body.appendChild(TeleportTargetBody);
ReactDOM.render(React.createElement(TeleportTarget, { id: "body" }), TeleportTargetBody);
console.log("TODO: still need fix.");

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91aS90ZWxlcG9ydC90ZWxlcG9ydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLDJEQUF3QztBQUd4Qyx1Q0FBdUM7QUFFdkMsY0FBc0IsU0FBUSxLQUFLLENBQUMsU0FBMkM7SUFHN0UsWUFBWSxLQUFzQjtRQUNoQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFIUixVQUFLLEdBQW9CLEVBQy9CLENBQUM7SUFHRixDQUFDO0lBQ00sa0JBQWtCO1FBQ3ZCLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNsRCxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUNNLG9CQUFvQjtRQUN6QixRQUFRLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNNLG1CQUFtQjtRQUN4QixjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNNLGtCQUFrQjtJQUN6QixDQUFDO0lBQ00sTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztDQUNGO0FBdEJELDRCQXNCQztBQUNELG9CQUE0QixTQUFRLEtBQUssQ0FBQyxTQUF1RDtJQUcvRixZQUFZLEtBQTRCO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUhSLFVBQUssR0FBMEIsRUFDckMsQ0FBQztJQUdGLENBQUM7SUFDTSxrQkFBa0I7UUFDdkIsY0FBYyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDTSxvQkFBb0I7UUFDekIsY0FBYyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDTSxNQUFNO1FBQ1gsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyx1QkFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQixPQUFPLE1BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQztTQUN2QzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7Q0FDRjtBQXBCRCx3Q0FvQkM7QUFDRCxXQUFpQixRQUFRO0lBQ3ZCLE1BQU0sT0FBTyxHQUFtQyxFQUFFLENBQUM7SUFDbkQsd0JBQStCLE1BQWdCO1FBQzdDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUN0QyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUhlLHVCQUFjLGlCQUc3QixDQUFBO0lBQ0QsMEJBQWlDLE1BQWdCO1FBQy9DLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFIZSx5QkFBZ0IsbUJBRy9CLENBQUE7SUFDRCxtQkFBMEIsUUFBZ0I7UUFDeEMsSUFBSSxDQUFDLHVCQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzFCO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQU5lLGtCQUFTLFlBTXhCLENBQUE7QUFPSCxDQUFDLEVBdkJnQixRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQXVCeEI7QUFDRCxXQUFpQixjQUFjO0lBQzdCLE1BQU0sT0FBTyxHQUF5QyxFQUFFLENBQUM7SUFDekQsMEJBQWlDLE1BQXNCO1FBQ3JELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFIZSwrQkFBZ0IsbUJBRy9CLENBQUE7SUFDRCw0QkFBbUMsTUFBc0I7UUFDdkQsRUFBRTtJQUNKLENBQUM7SUFGZSxpQ0FBa0IscUJBRWpDLENBQUE7SUFDRCxnQkFBdUIsUUFBZ0I7UUFDckMsSUFBSSxDQUFDLHVCQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7SUFKZSxxQkFBTSxTQUlyQixDQUFBO0FBTUgsQ0FBQyxFQW5CZ0IsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFtQjlCO0FBRUQsTUFBTSxrQkFBa0IsR0FBUSxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzlELFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDOUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxvQkFBQyxjQUFjLElBQUMsRUFBRSxFQUFDLE1BQU0sR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFFbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDIiwiZmlsZSI6InVpL3RlbGVwb3J0L3RlbGVwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgSXMgfSBmcm9tIFwidXRpbGl0eS1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IHByb2Nlc3MgfSBmcm9tIFwidW5pcWlkXCI7XHJcblxyXG4vLyBjb25zb2xlLmxvZyhcInByb2Nlc3M6IFwiLCBwcm9jZXNzKCkpO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRlbGVwb3J0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFRlbGVwb3J0LklQcm9wcywgVGVsZXBvcnQuSVN0YXRlPiB7XHJcbiAgcHVibGljIHN0YXRlOiBUZWxlcG9ydC5JU3RhdGUgPSB7XHJcbiAgfTtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogVGVsZXBvcnQuSVByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICBpZiAoVGVsZXBvcnQuZ2V0U291cmNlKHRoaXMucHJvcHMudGFyZ2V0KSAhPT0gdGhpcykge1xyXG4gICAgICBUZWxlcG9ydC5yZWdpc3RlclNvdXJjZSh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgVGVsZXBvcnQudW5yZWdpc3RlclNvdXJjZSh0aGlzKTtcclxuICB9XHJcbiAgcHVibGljIGNvbXBvbmVudFdpbGxVcGRhdGUoKSB7XHJcbiAgICBUZWxlcG9ydFRhcmdldC51cGRhdGUodGhpcy5wcm9wcy50YXJnZXQpO1xyXG4gIH1cclxuICBwdWJsaWMgY29tcG9uZW50RGlkVXBkYXRlKCkge1xyXG4gIH1cclxuICBwdWJsaWMgcmVuZGVyKCk6IFJlYWN0LlJlYWN0Tm9kZSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFRlbGVwb3J0VGFyZ2V0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFRlbGVwb3J0VGFyZ2V0LklQcm9wcywgVGVsZXBvcnRUYXJnZXQuSVN0YXRlPiB7XHJcbiAgcHVibGljIHN0YXRlOiBUZWxlcG9ydFRhcmdldC5JU3RhdGUgPSB7XHJcbiAgfTtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogVGVsZXBvcnRUYXJnZXQuSVByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcyk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICBUZWxlcG9ydFRhcmdldC5yZWdpc3RlclRlbGVwb3J0KHRoaXMpO1xyXG4gIH1cclxuICBwdWJsaWMgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICBUZWxlcG9ydFRhcmdldC51bnJlZ2lzdGVyVGVsZXBvcnQodGhpcyk7XHJcbiAgfVxyXG4gIHB1YmxpYyByZW5kZXIoKTogUmVhY3QuUmVhY3ROb2RlIHwgbnVsbCB7XHJcbiAgICBjb25zdCBzb3VyY2UgPSBUZWxlcG9ydC5nZXRTb3VyY2UodGhpcy5wcm9wcy5pZCk7XHJcbiAgICBpZiAoIUlzLm51bGxPclVuZGVmaW5lZChzb3VyY2UpKSB7XHJcbiAgICAgIHJldHVybiBzb3VyY2UhLnByb3BzLmNoaWxkcmVuIHx8IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0IG5hbWVzcGFjZSBUZWxlcG9ydCB7XHJcbiAgY29uc3Qgc291cmNlczogeyBbdGFyZ2V0OiBzdHJpbmddOiBUZWxlcG9ydCB9ID0ge307XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyU291cmNlKHNvdXJjZTogVGVsZXBvcnQpIHtcclxuICAgIHNvdXJjZXNbc291cmNlLnByb3BzLnRhcmdldF0gPSBzb3VyY2U7XHJcbiAgICBUZWxlcG9ydFRhcmdldC51cGRhdGUoc291cmNlLnByb3BzLnRhcmdldCk7XHJcbiAgfVxyXG4gIGV4cG9ydCBmdW5jdGlvbiB1bnJlZ2lzdGVyU291cmNlKHNvdXJjZTogVGVsZXBvcnQpIHtcclxuICAgIGRlbGV0ZSBzb3VyY2VzW3NvdXJjZS5wcm9wcy50YXJnZXRdO1xyXG4gICAgVGVsZXBvcnRUYXJnZXQudXBkYXRlKHNvdXJjZS5wcm9wcy50YXJnZXQpO1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlKHRhcmdldElkOiBzdHJpbmcpOiBUZWxlcG9ydCB8IG51bGwge1xyXG4gICAgaWYgKCFJcy5udWxsT3JVbmRlZmluZWQoc291cmNlc1t0YXJnZXRJZF0pKSB7XHJcbiAgICAgIHJldHVybiBzb3VyY2VzW3RhcmdldElkXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgICB0YXJnZXQ6IHN0cmluZztcclxuICAgIGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlIHwgUmVhY3QuUmVhY3ROb2RlW107XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVN0YXRlIHtcclxuICB9XHJcbn1cclxuZXhwb3J0IG5hbWVzcGFjZSBUZWxlcG9ydFRhcmdldCB7XHJcbiAgY29uc3QgdGFyZ2V0czogeyBbdGFyZ2V0OiBzdHJpbmddOiBUZWxlcG9ydFRhcmdldCB9ID0ge307XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyVGVsZXBvcnQodGFyZ2V0OiBUZWxlcG9ydFRhcmdldCkge1xyXG4gICAgZGVsZXRlIHRhcmdldHNbdGFyZ2V0LnByb3BzLmlkXTtcclxuICAgIHRhcmdldHNbdGFyZ2V0LnByb3BzLmlkXSA9IHRhcmdldDtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIHVucmVnaXN0ZXJUZWxlcG9ydCh0YXJnZXQ6IFRlbGVwb3J0VGFyZ2V0KSB7XHJcbiAgICAvL1xyXG4gIH1cclxuICBleHBvcnQgZnVuY3Rpb24gdXBkYXRlKHRhcmdldElkOiBzdHJpbmcpIHtcclxuICAgIGlmICghSXMubnVsbE9yVW5kZWZpbmVkKHRhcmdldHNbdGFyZ2V0SWRdKSkge1xyXG4gICAgICB0YXJnZXRzW3RhcmdldElkXS5mb3JjZVVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgICBpZDogc3RyaW5nO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIElTdGF0ZSB7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBUZWxlcG9ydFRhcmdldEJvZHk6IGFueSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoVGVsZXBvcnRUYXJnZXRCb2R5KTtcclxuUmVhY3RET00ucmVuZGVyKDxUZWxlcG9ydFRhcmdldCBpZD1cImJvZHlcIiAvPiwgVGVsZXBvcnRUYXJnZXRCb2R5KTtcclxuXHJcbmNvbnNvbGUubG9nKFwiVE9ETzogc3RpbGwgbmVlZCBmaXguXCIpO1xyXG4iXX0=
