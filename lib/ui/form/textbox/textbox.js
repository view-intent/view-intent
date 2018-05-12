"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
// import "./.scss";
const field_1 = require("../field/field");
const utility_collection_1 = require("utility-collection");
const mother_mask_1 = require("mother-mask");
// import { debounce } from "throttle-debounce";
const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
class Textbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            value: "",
            loading: false,
            mounted: false,
        };
        this.inputElement = null;
        this.debounce = -1;
        this.inputBlur = this.inputBlur.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputKeyUp = this.inputKeyUp.bind(this);
        this.inputKeyDown = this.inputKeyDown.bind(this);
        this.inputClick = this.inputClick.bind(this);
        // set value
        this.value = this.props.value;
    }
    get value() {
        return this.state.value;
    }
    set value(value) {
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
    }
    isValid() {
        return true;
    }
    get isFocus() {
        return this.state.focus;
    }
    loading() {
        if (!this.state.loading) {
            this.state.loading = true;
            if (this.state.mounted) {
                this.setState(this.state);
            }
        }
    }
    loaded() {
        if (this.state.loading) {
            this.state.loading = false;
            if (!this.state.mounted) {
                this.setState(this.state);
            }
        }
    }
    inputChange() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFocus) {
                this.loading();
                if (this.props.onChange !== undefined && this.props.onChange !== null) {
                    yield this.props.onChange(this);
                }
                if (this.props.onChangeDebounce !== undefined && this.props.onChangeDebounce !== null) {
                    clearTimeout(this.debounce);
                    this.loading();
                    this.debounce = setTimeout(() => {
                        (() => __awaiter(this, void 0, void 0, function* () {
                            yield this.props.onChangeDebounce(this);
                            this.loaded();
                        }))();
                    }, this.props.onChangeDebounceDelay || 600);
                }
                this.loaded();
            }
        });
    }
    inputFocus(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.focus = true;
            this.setState(this.state);
        });
    }
    inputBlur(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.focus = false;
            this.setState(this.state);
        });
    }
    inputKeyUp(e) {
        return __awaiter(this, void 0, void 0, function* () {
            this.value = e.target.value;
        });
    }
    inputKeyDown(e) {
        return __awaiter(this, void 0, void 0, function* () {
            setImmediate(() => {
                this.value = e.target.value;
            });
        });
    }
    inputClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!utility_collection_1.Is.nullOrUndefined(this.props.onClick)) {
                this.loading();
                yield this.props.onClick(this);
                this.loaded();
            }
        });
    }
    isFilled() {
        if (!utility_collection_1.Is.empty(this.state.value)) {
            return true;
        }
        else {
            return false;
        }
    }
    isLabeled() {
        if (!utility_collection_1.Is.empty(this.props.label)) {
            return true;
        }
        else {
            return false;
        }
    }
    isDisabled() {
        return (this.props.disabled || this.state.loading);
    }
    setInputValue(value) {
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
    }
    componentDidMount() {
        this.state.mounted = true;
        this.inputElement = this.refs["input"];
        if (!utility_collection_1.Is.nullOrUndefined(this.inputElement)) {
            this.inputElement.addEventListener("focus", this.inputFocus);
            this.inputElement.addEventListener("blur", this.inputBlur);
            this.inputElement.addEventListener("click", this.inputClick);
            if (!utility_collection_1.Is.empty(this.props.mask)) {
                mother_mask_1.MotherMask.bind(this.inputElement, this.props.mask, (value) => {
                    this.value = value;
                });
                this.value = !utility_collection_1.Is.nullOrUndefined(this.props.value) ? mother_mask_1.MotherMask.process(this.props.value, this.props.mask) : "";
            }
            else {
                this.inputElement.addEventListener("keydown", this.inputKeyDown);
                this.inputElement.addEventListener("paste", this.inputKeyDown);
                this.value = this.props.value;
            }
        }
    }
    componentWillUnmount() {
        this.state.mounted = false;
        this.inputElement.removeEventListener("focus", this.inputFocus);
        this.inputElement.removeEventListener("blur", this.inputBlur);
        this.inputElement.removeEventListener("keydown", this.inputKeyDown);
        this.inputElement.removeEventListener("click", this.inputClick);
    }
    componentWillReceiveProps(props) {
        this.value = props.value;
    }
    componentDidUpdate() {
        this.setInputValue(this.value);
    }
    render() {
        return React.createElement(field_1.Field, { type: "input", className: "viui-textbox " +
                (this.isDisabled() ? " -disabled " : " -enabled ") +
                (this.state.loading ? " -loading " : "") +
                (this.state.focus ? " -focus " : "") +
                (this.isFilled() ? " -filled " : "") +
                (this.isLabeled() ? " -labeled" : "") },
            !utility_collection_1.Is.empty(this.props.label) && React.createElement("label", { className: "-label" }, this.props.label),
            React.createElement("input", { ref: "input", className: "-input", formNoValidate: true, onFocus: (e) => __awaiter(this, void 0, void 0, function* () {
                    if (!utility_collection_1.Is.nullOrUndefined(this.props.onFocus)) {
                        this.props.onFocus(this);
                    }
                }), onChange: (e) => {
                    // ios ugly fix
                    // watch this bug: https://github.com/facebook/react/issues/8938
                    if (iOS) {
                        this.value = e.target.value;
                    }
                }, onBlur: (e) => __awaiter(this, void 0, void 0, function* () {
                    if (!utility_collection_1.Is.nullOrUndefined(this.props.onBlur)) {
                        this.props.onBlur(this);
                    }
                }), type: this.props.type }));
    }
}
exports.Textbox = Textbox;
// console.log("-> textbox ");
exports.default = Textbox;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy91aS9mb3JtL3RleHRib3gvdGV4dGJveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUUvQixvQkFBb0I7QUFDcEIsMENBQXVDO0FBQ3ZDLDJEQUFvRDtBQUVwRCw2Q0FBeUM7QUFLekMsZ0RBQWdEO0FBQ2hELE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDaEYsYUFDRSxTQUFRLEtBQUssQ0FBQyxTQUF5QztJQVd2RCxZQUFZLEtBQXFCO1FBQy9CLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQVRSLFVBQUssR0FBbUI7WUFDN0IsS0FBSyxFQUFFLEtBQUs7WUFDWixLQUFLLEVBQUUsRUFBRTtZQUNULE9BQU8sRUFBRSxLQUFLO1lBQ2QsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO1FBQ0ssaUJBQVksR0FBNEIsSUFBSSxDQUFDO1FBQzVDLGFBQVEsR0FBaUIsQ0FBQyxDQUFDLENBQUM7UUFHbEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLFlBQVk7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQ2hDLENBQUM7SUFDRCxJQUFXLEtBQUs7UUFDZCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUFXLEtBQUssQ0FBQyxLQUF5QztRQUV4RCxvQ0FBb0M7UUFDcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDOUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLHdCQUFVLENBQUMsT0FBTyxDQUFDLEtBQWUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzthQUMxQjtZQUNELDBCQUEwQjtZQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEI7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxJQUFXLE9BQU87UUFDaEIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUMxQixDQUFDO0lBQ00sT0FBTztRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7U0FDRjtJQUNILENBQUM7SUFDTSxNQUFNO1FBQ1gsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO2dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQjtTQUNGO0lBQ0gsQ0FBQztJQUNZLFdBQVc7O1lBQ3RCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDaEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtvQkFDckUsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixLQUFLLElBQUksRUFBRTtvQkFDckYsWUFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRTt3QkFDOUIsQ0FBQyxHQUFTLEVBQUU7NEJBQ1YsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUN6QyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7d0JBQ2hCLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztvQkFDUCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDN0M7Z0JBQ0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDO0tBQUE7SUFDWSxVQUFVLENBQUMsQ0FBYTs7WUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7S0FBQTtJQUNZLFNBQVMsQ0FBQyxDQUFROztZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUFBO0lBQ1ksVUFBVSxDQUFDLENBQVE7O1lBQzlCLElBQUksQ0FBQyxLQUFLLEdBQUksQ0FBQyxDQUFDLE1BQTJCLENBQUMsS0FBSyxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQUNZLFlBQVksQ0FBQyxDQUFROztZQUNoQyxZQUFZLENBQUMsR0FBRyxFQUFFO2dCQUNoQixJQUFJLENBQUMsS0FBSyxHQUFJLENBQUMsQ0FBQyxNQUEyQixDQUFDLEtBQUssQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUNZLFVBQVUsQ0FBQyxDQUFROztZQUM5QixJQUFJLENBQUMsdUJBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNmO1FBQ0gsQ0FBQztLQUFBO0lBQ00sUUFBUTtRQUNiLElBQUksQ0FBQyx1QkFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBQ00sU0FBUztRQUNkLElBQUksQ0FBQyx1QkFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9CLE9BQU8sSUFBSSxDQUFDO1NBQ2I7YUFBTTtZQUNMLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7SUFDSCxDQUFDO0lBQ00sVUFBVTtRQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDTSxhQUFhLENBQUMsS0FBeUM7UUFDNUQsSUFBSSxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksRUFBRTtZQUM5QixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDckMsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7b0JBQ3pDLElBQUksQ0FBQyxZQUFhLENBQUMsS0FBSyxHQUFHLEtBQWUsQ0FBQztpQkFDNUM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFlBQWEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2lCQUMvQjtnQkFDRCxJQUFJLENBQUMsWUFBYSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQyxjQUFjO2FBQ3JEO1NBQ0Y7SUFDSCxDQUFDO0lBQ00saUJBQWlCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQyxJQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLHVCQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMxQyxJQUFJLENBQUMsWUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLFlBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxZQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5RCxJQUFJLENBQUMsdUJBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsd0JBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQWEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUssRUFBRSxDQUFDLEtBQWEsRUFBRSxFQUFFO29CQUN0RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLHVCQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7YUFDN0g7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLFlBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNsRSxJQUFJLENBQUMsWUFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7YUFDL0I7U0FDRjtJQUNILENBQUM7SUFDTSxvQkFBb0I7UUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFhLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsWUFBYSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFlBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxZQUFhLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBQ00seUJBQXlCLENBQUMsS0FBcUI7UUFDcEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFDTSxrQkFBa0I7UUFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNNLE1BQU07UUFDWCxPQUFPLG9CQUFDLGFBQUssSUFDWCxJQUFJLEVBQUMsT0FBTyxFQUNaLFNBQVMsRUFBRSxlQUFlO2dCQUN4QixDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBQ2xELENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN4QyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDcEMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNwQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFdEMsQ0FBQyx1QkFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLCtCQUFPLFNBQVMsRUFBRSxRQUFRLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQVM7WUFDdEYsK0JBQ0UsR0FBRyxFQUFDLE9BQU8sRUFDWCxTQUFTLEVBQUUsUUFBUSxFQUNuQixjQUFjLEVBQUUsSUFBSSxFQUNwQixPQUFPLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLHVCQUFFLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBUSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUMzQjtnQkFDSCxDQUFDLENBQUEsRUFDRCxRQUFRLEVBQ04sQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDSixlQUFlO29CQUNmLGdFQUFnRTtvQkFDaEUsSUFBSSxHQUFHLEVBQUU7d0JBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztxQkFDN0I7Z0JBQ0gsQ0FBQyxFQUNILE1BQU0sRUFBRSxDQUFPLENBQUMsRUFBRSxFQUFFO29CQUNsQixJQUFJLENBQUMsdUJBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzFCO2dCQUNILENBQUMsQ0FBQSxFQUNELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FDckIsQ0FDSSxDQUFDO0lBQ1gsQ0FBQztDQUNGO0FBek1ELDBCQXlNQztBQStCRCw4QkFBOEI7QUFDOUIsa0JBQWUsT0FBTyxDQUFDIiwiZmlsZSI6InVpL2Zvcm0vdGV4dGJveC90ZXh0Ym94LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCAqIGFzIFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcclxuLy8gaW1wb3J0IFwiLi8uc2Nzc1wiO1xyXG5pbXBvcnQgeyBGaWVsZCB9IGZyb20gXCIuLi9maWVsZC9maWVsZFwiO1xyXG5pbXBvcnQgeyBJcywgUmVmbGVjdGlvbiB9IGZyb20gXCJ1dGlsaXR5LWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgRGF0YUZldGNoIH0gZnJvbSBcIi4uLy4uLy4uL3ZpZXctaW50ZW50L2RhdGEtZmV0Y2hcIjtcclxuaW1wb3J0IHsgTW90aGVyTWFzayB9IGZyb20gXCJtb3RoZXItbWFza1wiO1xyXG5pbXBvcnQgeyBJY29uIH0gZnJvbSBcIi4uLy4uL2ljb25zL2ljb25cIjtcclxuaW1wb3J0IHsgSUxvYWRhYmxlQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvbG9hZGFibGVcIjtcclxuaW1wb3J0IHsgSVZhbGlkYWJsZUNvbXBvbmVudCwgSVZhbGlkYXRpb25SZXNwb25zZSB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL3ZhbGlkYWJsZVwiO1xyXG5cclxuLy8gaW1wb3J0IHsgZGVib3VuY2UgfSBmcm9tIFwidGhyb3R0bGUtZGVib3VuY2VcIjtcclxuY29uc3QgaU9TID0gISFuYXZpZ2F0b3IucGxhdGZvcm0gJiYgL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnBsYXRmb3JtKTtcclxuZXhwb3J0IGNsYXNzIFRleHRib3hcclxuICBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxUZXh0Ym94LklQcm9wcywgVGV4dGJveC5JU3RhdGU+XHJcbiAgaW1wbGVtZW50cyBJTG9hZGFibGVDb21wb25lbnQge1xyXG5cclxuICBwdWJsaWMgc3RhdGU6IFRleHRib3guSVN0YXRlID0ge1xyXG4gICAgZm9jdXM6IGZhbHNlLFxyXG4gICAgdmFsdWU6IFwiXCIsXHJcbiAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgIG1vdW50ZWQ6IGZhbHNlLFxyXG4gIH07XHJcbiAgcHVibGljIGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG4gIHByaXZhdGUgZGVib3VuY2U6IG51bWJlciB8IGFueSA9IC0xO1xyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiBUZXh0Ym94LklQcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy5pbnB1dEJsdXIgPSB0aGlzLmlucHV0Qmx1ci5iaW5kKHRoaXMpO1xyXG4gICAgdGhpcy5pbnB1dEZvY3VzID0gdGhpcy5pbnB1dEZvY3VzLmJpbmQodGhpcyk7XHJcbiAgICB0aGlzLmlucHV0S2V5VXAgPSB0aGlzLmlucHV0S2V5VXAuYmluZCh0aGlzKTtcclxuICAgIHRoaXMuaW5wdXRLZXlEb3duID0gdGhpcy5pbnB1dEtleURvd24uYmluZCh0aGlzKTtcclxuICAgIHRoaXMuaW5wdXRDbGljayA9IHRoaXMuaW5wdXRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgLy8gc2V0IHZhbHVlXHJcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTtcclxuICB9XHJcbiAgcHVibGljIGdldCB2YWx1ZSgpOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnN0YXRlLnZhbHVlO1xyXG4gIH1cclxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgLy8gY29uc29sZS5sb2coXCIgc2V0IHZhbHVlXCIsIHZhbHVlKTtcclxuICAgIGlmICh0aGlzLnN0YXRlLnZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICBpZiAodGhpcy5wcm9wcy5tYXNrICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnZhbHVlID0gTW90aGVyTWFzay5wcm9jZXNzKHZhbHVlIGFzIHN0cmluZywgdGhpcy5wcm9wcy5tYXNrKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnN0YXRlLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgIH1cclxuICAgICAgLy8gdGhpcyB3aWxsIGJlIGluIHRoZSBlbmRcclxuICAgICAgdGhpcy5pbnB1dENoYW5nZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRJbnB1dFZhbHVlKHRoaXMuc3RhdGUudmFsdWUpO1xyXG4gIH1cclxuICBwdWJsaWMgaXNWYWxpZCgpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICBwdWJsaWMgZ2V0IGlzRm9jdXMoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5mb2N1cztcclxuICB9XHJcbiAgcHVibGljIGxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuc3RhdGUubG9hZGluZykge1xyXG4gICAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy5zdGF0ZS5tb3VudGVkKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLnN0YXRlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgbG9hZGVkKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3RhdGUubG9hZGluZykge1xyXG4gICAgICB0aGlzLnN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgaWYgKCF0aGlzLnN0YXRlLm1vdW50ZWQpIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBhc3luYyBpbnB1dENoYW5nZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICh0aGlzLmlzRm9jdXMpIHtcclxuICAgICAgdGhpcy5sb2FkaW5nKCk7XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGF3YWl0IHRoaXMucHJvcHMub25DaGFuZ2UhKHRoaXMpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlRGVib3VuY2UgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLm9uQ2hhbmdlRGVib3VuY2UgIT09IG51bGwpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5kZWJvdW5jZSk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nKCk7XHJcbiAgICAgICAgdGhpcy5kZWJvdW5jZSA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5wcm9wcy5vbkNoYW5nZURlYm91bmNlISh0aGlzKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkZWQoKTtcclxuICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfSwgdGhpcy5wcm9wcy5vbkNoYW5nZURlYm91bmNlRGVsYXkgfHwgNjAwKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLmxvYWRlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgYXN5bmMgaW5wdXRGb2N1cyhlOiBGb2N1c0V2ZW50KSB7XHJcbiAgICB0aGlzLnN0YXRlLmZvY3VzID0gdHJ1ZTtcclxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhc3luYyBpbnB1dEJsdXIoZTogRXZlbnQpIHtcclxuICAgIHRoaXMuc3RhdGUuZm9jdXMgPSBmYWxzZTtcclxuICAgIHRoaXMuc2V0U3RhdGUodGhpcy5zdGF0ZSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhc3luYyBpbnB1dEtleVVwKGU6IEV2ZW50KSB7XHJcbiAgICB0aGlzLnZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gIH1cclxuICBwdWJsaWMgYXN5bmMgaW5wdXRLZXlEb3duKGU6IEV2ZW50KSB7XHJcbiAgICBzZXRJbW1lZGlhdGUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnZhbHVlID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBhc3luYyBpbnB1dENsaWNrKGU6IEV2ZW50KSB7XHJcbiAgICBpZiAoIUlzLm51bGxPclVuZGVmaW5lZCh0aGlzLnByb3BzLm9uQ2xpY2spKSB7XHJcbiAgICAgIHRoaXMubG9hZGluZygpO1xyXG4gICAgICBhd2FpdCB0aGlzLnByb3BzLm9uQ2xpY2shKHRoaXMpO1xyXG4gICAgICB0aGlzLmxvYWRlZCgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgaXNGaWxsZWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIUlzLmVtcHR5KHRoaXMuc3RhdGUudmFsdWUpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgaXNMYWJlbGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFJcy5lbXB0eSh0aGlzLnByb3BzLmxhYmVsKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGlzRGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKHRoaXMucHJvcHMuZGlzYWJsZWQgfHwgdGhpcy5zdGF0ZS5sb2FkaW5nKTtcclxuICB9XHJcbiAgcHVibGljIHNldElucHV0VmFsdWUodmFsdWU6IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQpIHtcclxuICAgIGlmICh0aGlzLmlucHV0RWxlbWVudCAhPT0gbnVsbCkge1xyXG4gICAgICBpZiAodGhpcy5pbnB1dEVsZW1lbnQudmFsdWUgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuaW5wdXRFbGVtZW50IS52YWx1ZSA9IHZhbHVlIGFzIHN0cmluZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQhLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQhLmRlZmF1bHRWYWx1ZSA9IFwiXCI7IC8vIHRyeSBpb3MgZml4XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcHVibGljIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgdGhpcy5zdGF0ZS5tb3VudGVkID0gdHJ1ZTtcclxuICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gKHRoaXMucmVmcyBhcyBhbnkpW1wiaW5wdXRcIl07XHJcbiAgICBpZiAoIUlzLm51bGxPclVuZGVmaW5lZCh0aGlzLmlucHV0RWxlbWVudCkpIHtcclxuICAgICAgdGhpcy5pbnB1dEVsZW1lbnQhLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCB0aGlzLmlucHV0Rm9jdXMpO1xyXG4gICAgICB0aGlzLmlucHV0RWxlbWVudCEuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgdGhpcy5pbnB1dEJsdXIpO1xyXG4gICAgICB0aGlzLmlucHV0RWxlbWVudCEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuaW5wdXRDbGljayk7XHJcbiAgICAgIGlmICghSXMuZW1wdHkodGhpcy5wcm9wcy5tYXNrKSkge1xyXG4gICAgICAgIE1vdGhlck1hc2suYmluZCh0aGlzLmlucHV0RWxlbWVudCEsIHRoaXMucHJvcHMubWFzayEsICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICFJcy5udWxsT3JVbmRlZmluZWQodGhpcy5wcm9wcy52YWx1ZSkgPyBNb3RoZXJNYXNrLnByb2Nlc3ModGhpcy5wcm9wcy52YWx1ZSEgYXMgc3RyaW5nLCB0aGlzLnByb3BzLm1hc2shKSA6IFwiXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQhLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIHRoaXMuaW5wdXRLZXlEb3duKTtcclxuICAgICAgICB0aGlzLmlucHV0RWxlbWVudCEuYWRkRXZlbnRMaXN0ZW5lcihcInBhc3RlXCIsIHRoaXMuaW5wdXRLZXlEb3duKTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5wcm9wcy52YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBwdWJsaWMgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB0aGlzLnN0YXRlLm1vdW50ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaW5wdXRFbGVtZW50IS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgdGhpcy5pbnB1dEZvY3VzKTtcclxuICAgIHRoaXMuaW5wdXRFbGVtZW50IS5yZW1vdmVFdmVudExpc3RlbmVyKFwiYmx1clwiLCB0aGlzLmlucHV0Qmx1cik7XHJcbiAgICB0aGlzLmlucHV0RWxlbWVudCEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5pbnB1dEtleURvd24pO1xyXG4gICAgdGhpcy5pbnB1dEVsZW1lbnQhLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmlucHV0Q2xpY2spO1xyXG4gIH1cclxuICBwdWJsaWMgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhwcm9wczogVGV4dGJveC5JUHJvcHMpIHtcclxuICAgIHRoaXMudmFsdWUgPSBwcm9wcy52YWx1ZTtcclxuICB9XHJcbiAgcHVibGljIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgIHRoaXMuc2V0SW5wdXRWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICB9XHJcbiAgcHVibGljIHJlbmRlcigpOiBSZWFjdC5SZWFjdE5vZGUge1xyXG4gICAgcmV0dXJuIDxGaWVsZFxyXG4gICAgICB0eXBlPVwiaW5wdXRcIlxyXG4gICAgICBjbGFzc05hbWU9e1widml1aS10ZXh0Ym94IFwiICtcclxuICAgICAgICAodGhpcy5pc0Rpc2FibGVkKCkgPyBcIiAtZGlzYWJsZWQgXCIgOiBcIiAtZW5hYmxlZCBcIikgK1xyXG4gICAgICAgICh0aGlzLnN0YXRlLmxvYWRpbmcgPyBcIiAtbG9hZGluZyBcIiA6IFwiXCIpICtcclxuICAgICAgICAodGhpcy5zdGF0ZS5mb2N1cyA/IFwiIC1mb2N1cyBcIiA6IFwiXCIpICtcclxuICAgICAgICAodGhpcy5pc0ZpbGxlZCgpID8gXCIgLWZpbGxlZCBcIiA6IFwiXCIpICtcclxuICAgICAgICAodGhpcy5pc0xhYmVsZWQoKSA/IFwiIC1sYWJlbGVkXCIgOiBcIlwiKVxyXG4gICAgICB9PlxyXG4gICAgICB7IUlzLmVtcHR5KHRoaXMucHJvcHMubGFiZWwpICYmIDxsYWJlbCBjbGFzc05hbWU9e1wiLWxhYmVsXCJ9Pnt0aGlzLnByb3BzLmxhYmVsfTwvbGFiZWw+fVxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICByZWY9XCJpbnB1dFwiXHJcbiAgICAgICAgY2xhc3NOYW1lPXtcIi1pbnB1dFwifVxyXG4gICAgICAgIGZvcm1Ob1ZhbGlkYXRlPXt0cnVlfVxyXG4gICAgICAgIG9uRm9jdXM9e2FzeW5jIChlKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIUlzLm51bGxPclVuZGVmaW5lZCh0aGlzLnByb3BzLm9uRm9jdXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25Gb2N1cyEodGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfX1cclxuICAgICAgICBvbkNoYW5nZT17XHJcbiAgICAgICAgICAoZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBpb3MgdWdseSBmaXhcclxuICAgICAgICAgICAgLy8gd2F0Y2ggdGhpcyBidWc6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvODkzOFxyXG4gICAgICAgICAgICBpZiAoaU9TKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgIG9uQmx1cj17YXN5bmMgKGUpID0+IHtcclxuICAgICAgICAgIGlmICghSXMubnVsbE9yVW5kZWZpbmVkKHRoaXMucHJvcHMub25CbHVyKSkge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQmx1ciEodGhpcyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfX1cclxuICAgICAgICB0eXBlPXt0aGlzLnByb3BzLnR5cGV9XHJcbiAgICAgIC8+XHJcbiAgICA8L0ZpZWxkPjtcclxuICB9XHJcbn1cclxuZXhwb3J0IG5hbWVzcGFjZSBUZXh0Ym94IHtcclxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgICBsYWJlbD86IHN0cmluZztcclxuICAgIHR5cGU/OiBcInRleHRcIiB8IFwicGFzc3dvcmRcIiB8IFwibnVtYmVyXCIgfCBzdHJpbmc7XHJcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQ7XHJcbiAgICBkZWZhdWx0VmFsdWU/OiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgbWFzaz86IHN0cmluZztcclxuICAgIC8vIGN1c3RvbWl6YXRpb25cclxuICAgIGljb25TcmM/OiAoKSA9PiBKU1guRWxlbWVudCB8IHN0cmluZyB8IGFueTtcclxuICAgIHNyY0xvYWRlcj86IHN0cmluZztcclxuICAgIC8vIHZhbGlkYXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gICAgdmFsaWRhdGlvbj86IEFycmF5PCgodmFsdWU6IHN0cmluZykgPT4gUHJvbWlzZTxJVmFsaWRhdGlvblJlc3BvbnNlPikgfCAoKHZhbHVlOiBzdHJpbmcpID0+IElWYWxpZGF0aW9uUmVzcG9uc2UpPjtcclxuICAgIC8vIGV2ZW50c1xyXG4gICAgb25FbnRlcj86ICh0ZXh0Ym94OiBUZXh0Ym94KSA9PiB2b2lkO1xyXG4gICAgb25Gb2N1cz86ICh0ZXh0Ym94OiBUZXh0Ym94KSA9PiB2b2lkO1xyXG4gICAgb25CbHVyPzogKHRleHRib3g6IFRleHRib3gpID0+IHZvaWQ7XHJcbiAgICBvbkNsaWNrPzogKHRleHRib3g6IFRleHRib3gpID0+IHZvaWQ7XHJcbiAgICBvbkNoYW5nZT86ICh0ZXh0Ym94OiBUZXh0Ym94KSA9PiB2b2lkO1xyXG4gICAgb25DaGFuZ2VEZWJvdW5jZT86ICh0ZXh0Ym94OiBUZXh0Ym94KSA9PiB2b2lkO1xyXG4gICAgb25DaGFuZ2VEZWJvdW5jZURlbGF5PzogbnVtYmVyO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIElTdGF0ZSB7XHJcbiAgICBmb2N1czogYm9vbGVhbjtcclxuICAgIHZhbHVlOiBzdHJpbmcgfCBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkO1xyXG4gICAgbG9hZGluZzogYm9vbGVhbjtcclxuICAgIG1vdW50ZWQ6IGJvb2xlYW47XHJcbiAgfVxyXG59XHJcbi8vIGNvbnNvbGUubG9nKFwiLT4gdGV4dGJveCBcIik7XHJcbmV4cG9ydCBkZWZhdWx0IFRleHRib3g7XHJcbiJdfQ==
