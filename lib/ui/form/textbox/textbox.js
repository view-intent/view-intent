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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// import "./.scss";
var field_1 = require("../field/field");
var utility_collection_1 = require("utility-collection");
var mother_mask_1 = require("mother-mask");
// import { debounce } from "throttle-debounce";
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var Textbox = /** @class */ (function (_super) {
    __extends(Textbox, _super);
    function Textbox(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            focus: false,
            value: "",
            loading: false,
            mounted: false,
        };
        _this.inputElement = null;
        _this.debounce = -1;
        _this.inputBlur = _this.inputBlur.bind(_this);
        _this.inputFocus = _this.inputFocus.bind(_this);
        _this.inputKeyUp = _this.inputKeyUp.bind(_this);
        _this.inputKeyDown = _this.inputKeyDown.bind(_this);
        _this.inputClick = _this.inputClick.bind(_this);
        // set value
        _this.value = _this.props.value;
        return _this;
    }
    Object.defineProperty(Textbox.prototype, "value", {
        get: function () {
            return this.state.value;
        },
        set: function (value) {
            // console.log(" set value", value);
            if (this.state.value !== value) {
                if (this.props.mask !== undefined) {
                    this.state.value = mother_mask_1.MotherMask.process(value, this.props.mask);
                }
                else {
                    this.state.value = value;
                }
                // this will be in the end
                this.inputChange();
            }
            this.setInputValue(this.state.value);
        },
        enumerable: true,
        configurable: true
    });
    Textbox.prototype.isValid = function () {
        return true;
    };
    Object.defineProperty(Textbox.prototype, "isFocus", {
        get: function () {
            return this.state.focus;
        },
        enumerable: true,
        configurable: true
    });
    Textbox.prototype.loading = function () {
        if (!this.state.loading) {
            this.state.loading = true;
            if (this.state.mounted) {
                this.setState(this.state);
            }
        }
    };
    Textbox.prototype.loaded = function () {
        if (this.state.loading) {
            this.state.loading = false;
            if (!this.state.mounted) {
                this.setState(this.state);
            }
        }
    };
    Textbox.prototype.inputChange = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isFocus) return [3 /*break*/, 3];
                        this.loading();
                        if (!(this.props.onChange !== undefined && this.props.onChange !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.props.onChange(this)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this.props.onChangeDebounce !== undefined && this.props.onChangeDebounce !== null) {
                            clearTimeout(this.debounce);
                            this.loading();
                            this.debounce = setTimeout(function () {
                                (function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.props.onChangeDebounce(this)];
                                            case 1:
                                                _a.sent();
                                                this.loaded();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })();
                            }, this.props.onChangeDebounceDelay || 600);
                        }
                        this.loaded();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Textbox.prototype.inputFocus = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.state.focus = true;
                this.setState(this.state);
                return [2 /*return*/];
            });
        });
    };
    Textbox.prototype.inputBlur = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.state.focus = false;
                this.setState(this.state);
                return [2 /*return*/];
            });
        });
    };
    Textbox.prototype.inputKeyUp = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.value = e.target.value;
                return [2 /*return*/];
            });
        });
    };
    Textbox.prototype.inputKeyDown = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setImmediate(function () {
                    _this.value = e.target.value;
                });
                return [2 /*return*/];
            });
        });
    };
    Textbox.prototype.inputClick = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!utility_collection_1.Is.nullOrUndefined(this.props.onClick)) return [3 /*break*/, 2];
                        this.loading();
                        return [4 /*yield*/, this.props.onClick(this)];
                    case 1:
                        _a.sent();
                        this.loaded();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Textbox.prototype.isFilled = function () {
        if (!utility_collection_1.Is.empty(this.state.value)) {
            return true;
        }
        else {
            return false;
        }
    };
    Textbox.prototype.isLabeled = function () {
        if (!utility_collection_1.Is.empty(this.props.label)) {
            return true;
        }
        else {
            return false;
        }
    };
    Textbox.prototype.isDisabled = function () {
        return (this.props.disabled || this.state.loading);
    };
    Textbox.prototype.setInputValue = function (value) {
        if (this.inputElement !== null) {
            if (this.inputElement.value !== value) {
                if (value !== undefined && value !== null) {
                    this.inputElement.value = value;
                }
                else {
                    this.inputElement.value = "";
                }
                this.inputElement.defaultValue = ""; // try ios fix
            }
        }
    };
    Textbox.prototype.componentDidMount = function () {
        var _this = this;
        this.state.mounted = true;
        this.inputElement = this.refs["input"];
        if (!utility_collection_1.Is.nullOrUndefined(this.inputElement)) {
            this.inputElement.addEventListener("focus", this.inputFocus);
            this.inputElement.addEventListener("blur", this.inputBlur);
            this.inputElement.addEventListener("click", this.inputClick);
            if (!utility_collection_1.Is.empty(this.props.mask)) {
                mother_mask_1.MotherMask.bind(this.inputElement, this.props.mask, function (value) {
                    _this.value = value;
                });
                this.value = !utility_collection_1.Is.nullOrUndefined(this.props.value) ? mother_mask_1.MotherMask.process(this.props.value, this.props.mask) : "";
            }
            else {
                this.inputElement.addEventListener("keydown", this.inputKeyDown);
                this.inputElement.addEventListener("paste", this.inputKeyDown);
                this.value = this.props.value;
            }
        }
    };
    Textbox.prototype.componentWillUnmount = function () {
        this.state.mounted = false;
        this.inputElement.removeEventListener("focus", this.inputFocus);
        this.inputElement.removeEventListener("blur", this.inputBlur);
        this.inputElement.removeEventListener("keydown", this.inputKeyDown);
        this.inputElement.removeEventListener("click", this.inputClick);
    };
    Textbox.prototype.componentWillReceiveProps = function (props) {
        this.value = props.value;
    };
    Textbox.prototype.componentDidUpdate = function () {
        this.setInputValue(this.value);
    };
    Textbox.prototype.render = function () {
        var _this = this;
        return React.createElement(field_1.Field, { type: "input", className: "viui-textbox " +
                (this.isDisabled() ? " -disabled " : " -enabled ") +
                (this.state.loading ? " -loading " : "") +
                (this.state.focus ? " -focus " : "") +
                (this.isFilled() ? " -filled " : "") +
                (this.isLabeled() ? " -labeled" : "") },
            !utility_collection_1.Is.empty(this.props.label) && React.createElement("label", { className: "-label" }, this.props.label),
            React.createElement("input", { ref: "input", className: "-input", formNoValidate: true, onFocus: function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!utility_collection_1.Is.nullOrUndefined(this.props.onFocus)) {
                            this.props.onFocus(this);
                        }
                        return [2 /*return*/];
                    });
                }); }, onChange: function (e) {
                    // ios ugly fix
                    // watch this bug: https://github.com/facebook/react/issues/8938
                    if (iOS) {
                        _this.value = e.target.value;
                    }
                }, onBlur: function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!utility_collection_1.Is.nullOrUndefined(this.props.onBlur)) {
                            this.props.onBlur(this);
                        }
                        return [2 /*return*/];
                    });
                }); }, type: this.props.type }));
    };
    return Textbox;
}(React.Component));
exports.Textbox = Textbox;
// console.log("-> textbox ");
exports.default = Textbox;
//# sourceMappingURL=textbox.js.map