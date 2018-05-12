import * as React from "react";
import * as ReactDOM from "react-dom";
import { Is } from "utility-collection";
import { process } from "uniqid";

// console.log("process: ", process());

export class Teleport extends React.Component<Teleport.IProps, Teleport.IState> {
  public state: Teleport.IState = {
  };
  constructor(props: Teleport.IProps) {
    super(props);
  }
  public componentWillMount() {
    if (Teleport.getSource(this.props.target) !== this) {
      Teleport.registerSource(this);
    }
  }
  public componentWillUnmount() {
    Teleport.unregisterSource(this);
  }
  public componentWillUpdate() {
    TeleportTarget.update(this.props.target);
  }
  public componentDidUpdate() {
  }
  public render(): React.ReactNode {
    return null;
  }
}
export class TeleportTarget extends React.Component<TeleportTarget.IProps, TeleportTarget.IState> {
  public state: TeleportTarget.IState = {
  };
  constructor(props: TeleportTarget.IProps) {
    super(props);
  }
  public componentWillMount() {
    TeleportTarget.registerTeleport(this);
  }
  public componentWillUnmount() {
    TeleportTarget.unregisterTeleport(this);
  }
  public render(): React.ReactNode | null {
    const source = Teleport.getSource(this.props.id);
    if (!Is.nullOrUndefined(source)) {
      return source!.props.children || null;
    } else {
      return null;
    }
  }
}
export namespace Teleport {
  const sources: { [target: string]: Teleport } = {};
  export function registerSource(source: Teleport) {
    sources[source.props.target] = source;
    TeleportTarget.update(source.props.target);
  }
  export function unregisterSource(source: Teleport) {
    delete sources[source.props.target];
    TeleportTarget.update(source.props.target);
  }
  export function getSource(targetId: string): Teleport | null {
    if (!Is.nullOrUndefined(sources[targetId])) {
      return sources[targetId];
    } else {
      return null;
    }
  }
  export interface IProps {
    target: string;
    children?: React.ReactNode | React.ReactNode[];
  }
  export interface IState {
  }
}
export namespace TeleportTarget {
  const targets: { [target: string]: TeleportTarget } = {};
  export function registerTeleport(target: TeleportTarget) {
    delete targets[target.props.id];
    targets[target.props.id] = target;
  }
  export function unregisterTeleport(target: TeleportTarget) {
    //
  }
  export function update(targetId: string) {
    if (!Is.nullOrUndefined(targets[targetId])) {
      targets[targetId].forceUpdate();
    }
  }
  export interface IProps {
    id: string;
  }
  export interface IState {
  }
}

const TeleportTargetBody: any = document.createElement("div");
document.body.appendChild(TeleportTargetBody);
ReactDOM.render(<TeleportTarget id="body" />, TeleportTargetBody);

console.log("TODO: still need fix.");
