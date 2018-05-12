/// <reference types="@types/react" />
import * as React from "react";
export interface IFieldProps {
    className?: string;
    type: "input" | "checkbox" | "selectbox";
    leftChildren?: React.ReactNode;
    rightChildren?: React.ReactNode;
    bottomChildren?: React.ReactNode;
    topChildren?: React.ReactNode;
    children?: React.ReactNode;
}
export declare function Field(props: IFieldProps): JSX.Element;
export default Field;
