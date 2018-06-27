"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var utility_collection_1 = require("utility-collection");
// console.log("process: ", process());
var Teleport = /** @class */ (function (_super) {
    __extends(Teleport, _super);
    function Teleport(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Teleport.prototype.componentWillMount = function () {
        if (Teleport.getSource(this.props.target) !== this) {
            Teleport.registerSource(this);
        }
    };
    Teleport.prototype.componentWillUnmount = function () {
        Teleport.unregisterSource(this);
    };
    Teleport.prototype.componentWillUpdate = function () {
        TeleportTarget.update(this.props.target);
    };
    Teleport.prototype.componentDidUpdate = function () {
    };
    Teleport.prototype.render = function () {
        return null;
    };
    return Teleport;
}(React.Component));
exports.Teleport = Teleport;
var TeleportTarget = /** @class */ (function (_super) {
    __extends(TeleportTarget, _super);
    function TeleportTarget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TeleportTarget.prototype.componentWillMount = function () {
        TeleportTarget.registerTeleport(this);
    };
    TeleportTarget.prototype.componentWillUnmount = function () {
        TeleportTarget.unregisterTeleport(this);
    };
    TeleportTarget.prototype.render = function () {
        var source = Teleport.getSource(this.props.id);
        if (!utility_collection_1.Is.nullOrUndefined(source)) {
            return source.props.children || null;
        }
        else {
            return null;
        }
    };
    return TeleportTarget;
}(React.Component));
exports.TeleportTarget = TeleportTarget;
(function (Teleport) {
    var sources = {};
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
exports.Teleport = Teleport;
(function (TeleportTarget) {
    var targets = {};
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
exports.TeleportTarget = TeleportTarget;
// const TeleportTargetBody: any = document.createElement("div");
// document.body.appendChild(TeleportTargetBody);
// ReactDOM.render(<TeleportTarget id="body" />, TeleportTargetBody);
console.log("TODO: still need fix.");
//# sourceMappingURL=teleport.js.map