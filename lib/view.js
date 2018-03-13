import * as React from "react";
import { observe } from "mobx";
const equal = require("deep-equal");
export class View extends React.Component {
    constructor(props) {
        super(props);
        this.viewState = null;
        this.mobxInstances = [];
        this.mobxUnregiters = [];
        this.viewState = props.viewState;
        // this.bindStore.bind(this);
        // this!.state = props.viewState!.viewState;
    }
    get viewClassName() {
        return this.viewInfo.area.toLowerCase() + "-" + this.viewInfo.name.toLowerCase();
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
        while (this.mobxUnregiters.length > 0) {
            this.mobxUnregiters.pop()();
        }
    }
}
export default View;
//# sourceMappingURL=view.js.map