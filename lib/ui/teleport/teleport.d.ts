/// <reference types="@types/react" />
import * as React from "react";
export declare class Teleport extends React.Component<Teleport.IProps, Teleport.IState> {
    state: Teleport.IState;
    constructor(props: Teleport.IProps);
    componentWillMount(): void;
    componentWillUnmount(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
}
export declare class TeleportTarget extends React.Component<TeleportTarget.IProps, TeleportTarget.IState> {
    state: TeleportTarget.IState;
    constructor(props: TeleportTarget.IProps);
    componentWillMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactNode | null;
}
export declare namespace Teleport {
    function registerSource(source: Teleport): void;
    function unregisterSource(source: Teleport): void;
    function getSource(targetId: string): Teleport | null;
    interface IProps {
        target: string;
        children?: React.ReactNode | React.ReactNode[];
    }
    interface IState {
    }
}
export declare namespace TeleportTarget {
    function registerTeleport(target: TeleportTarget): void;
    function unregisterTeleport(target: TeleportTarget): void;
    function update(targetId: string): void;
    interface IProps {
        id: string;
    }
    interface IState {
    }
}
