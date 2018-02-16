import * as React from "react";
import { observe } from "mobx";
const equal = require("deep-equal");
export class View extends React.Component {
    constructor(props) {
        super(props);
        this.mobxInstances = [];
        this.mobxUnregiters = [];
        // this.bindStore.bind(this);
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
                // if (!equal(change.oldValue, change.newValue)) {
                // }
            }));
        });
    }
    componentWillUnmount() {
        while (this.mobxUnregiters.length > 0) {
            this.mobxUnregiters.pop()();
        }
    }
}
export default View;
//# sourceMappingURL=view.js.map