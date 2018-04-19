var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import * as React from "react";
// import { observe } from "mobx";
import { observe, observable } from "view-intent-mobx";
const equal = require("deep-equal");
export class View extends React.Component {
    constructor(props) {
        super(props);
        this.viewState = null;
        this.loadingClassName = "preload";
        this._isMounted = false;
        this.mobxInstances = [];
        this.mobxUnregiters = [];
        this.viewState = props.viewState;
        // this.bindStore.bind(this);
        // this!.state = props.viewState!.viewState;
    }
    get viewClassName() {
        return this.viewInfo.area.toLowerCase() + "-" + this.viewInfo.name.toLowerCase();
    }
    get isMounted() {
        return this._isMounted;
    }
    classNames(classNamesList, loader = false) {
        const mapped = classNamesList.map((value) => {
            if (value !== null && value !== undefined) {
                return value;
            }
        });
        if (loader) {
            mapped.push(this.loadingClassName);
        }
        return mapped.join(" ");
    }
    ref(refName) {
        return this.refs[refName];
    }
    bindStore(instance) {
        this.mobxInstances.push(instance);
        // this.mobxInstances[this.mobxInstances.length - 1].bind(this.mobxInstances[this.mobxInstances.length - 1]);
    }
    // public inject(state: any): void {
    // 	this.setState(state);
    // }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillMount() {
        const self = this;
        self.mobxInstances.forEach((instance) => {
            self.mobxUnregiters.push(observe(instance, (change) => {
                self.forceUpdate();
            }));
        });
        // update state before mount
        this.updateViewState();
    }
    updateViewState() {
        if (this.props.viewState && this.props.viewState.viewState) {
            this.setState(this.props.viewState.viewState);
        }
    }
    componentWillReceiveProps(newProp) {
        this.updateViewState();
    }
    componentWillUnmount() {
        this._isMounted = false;
        while (this.mobxUnregiters.length > 0) {
            this.mobxUnregiters.pop()();
        }
    }
}
__decorate([
    observable,
    __metadata("design:type", String)
], View.prototype, "loadingClassName", void 0);
export default View;
//# sourceMappingURL=view.js.map