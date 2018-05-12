/// <reference types="@types/react" />
import * as React from "react";
import { IIconProps } from "./types";
export interface IIconProps {
    className?: string;
    size?: string;
    src?: () => JSX.Element | string | any;
}
export declare class Icon extends React.Component<IIconProps> {
    render(): JSX.Element;
}
export default Icon;
