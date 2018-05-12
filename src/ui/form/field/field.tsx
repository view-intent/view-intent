import * as React from "react";
import * as ReactDOM from "react-dom";
// import "./fields.scss";

export interface IFieldProps {
  className?: string;
  type: "input" | "checkbox" | "selectbox";
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
  bottomChildren?: React.ReactNode;
  topChildren?: React.ReactNode;
  children?: React.ReactNode;
}
export function Field(props: IFieldProps): JSX.Element {
  return <div className={"viui-field " + props.className || ""}>
    {(props.topChildren !== undefined) && <div className="-top-children">{props.topChildren}</div>}
    <div className={"viui-field__" + props.type}>
      {(props.leftChildren !== undefined) && <div className="-left-children">{props.leftChildren}</div>}
      <div className={"-children"}>{props.children}</div>
      {(props.rightChildren !== undefined) && <div className="-right-children">{props.rightChildren}</div>}
    </div>
    {(props.bottomChildren !== undefined) && <div className="-bottom-children">{props.bottomChildren}</div>}
  </div>;
}

export default Field;
