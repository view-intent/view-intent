"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function Field(props) {
    return React.createElement("div", { className: "viui-field " + props.className || "" },
        (props.topChildren !== undefined) && React.createElement("div", { className: "-top-children" }, props.topChildren),
        React.createElement("div", { className: "viui-field__" + props.type },
            (props.leftChildren !== undefined) && React.createElement("div", { className: "-left-children" }, props.leftChildren),
            React.createElement("div", { className: "-children" }, props.children),
            (props.rightChildren !== undefined) && React.createElement("div", { className: "-right-children" }, props.rightChildren)),
        (props.bottomChildren !== undefined) && React.createElement("div", { className: "-bottom-children" }, props.bottomChildren));
}
exports.Field = Field;
exports.default = Field;
//# sourceMappingURL=field.js.map