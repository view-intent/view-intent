import * as React from "react";
import { ViewIntentState } from "./view-intent-state";
import { ViewTypeStore } from "./view-type-store";
// import "./view-frame.scss";
// import "./view-frame-transitions.scss";
import { observe } from "mobx";
export class ViewFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRoot: this.props.root,
            id: this.props.id,
        };
        this.unobserve = null;
        if (this.state.isRoot === true) {
            this.state.id = "root";
            ViewFrame.rootDefined = true;
        }
        else if (this.state.id === undefined || this.state.id === undefined) {
            throw new Error("View Frame must have an id.");
        }
        else if (this.state.id.toLowerCase() === "root") {
            this.state.isRoot = true;
            ViewFrame.rootDefined = true;
        }
        if (ViewFrame.rootDefined === false) {
            throw new Error(`The root "ViewFrame" wasn't defined.`);
        }
    }
    componentWillMount() {
        this.unobserve = observe(ViewIntentState.Instance, (change) => {
            this.forceUpdate();
        });
    }
    componentWillUnmount() {
        this.unobserve();
    }
    renderViewList() {
        return ViewIntentState.Instance.getViewStateListByFrameId(this.state.id).map((viewState, index) => {
            let ViewRenderComponent;
            ViewRenderComponent = ViewTypeStore.getViewType(viewState.areaName, viewState.viewType);
            return (viewState.isVisible ? React.createElement(ViewRenderComponent, { key: viewState.instanceId }) : null);
        });
    }
    render() {
        return React.createElement("div", { id: this.props.id, className: (this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame" }, this.renderViewList());
        // return <ReactCSSTransitionGroup
        // 		transitionName="view-intent"
        // 		transitionAppear={true}
        // 		transitionLeave={false}
        // 		transitionEnter={true}
        // 		component="div"
        // 		id={this.props.id}
        // 		className={(this.props.className !== undefined && this.props.className !== null) ? "view-intent-frame " + this.props.className : "view-intent-frame"}
        // 		transitionEnterTimeout={300}
        // 		transitionAppearTimeout={300}>
        // 		{this.renderViewList()}
        // 	</ReactCSSTransitionGroup>;
    }
}
(function (ViewFrame) {
    ViewFrame.rootDefined = false;
})(ViewFrame || (ViewFrame = {}));
export default ViewFrame;
//# sourceMappingURL=view-frame.js.map