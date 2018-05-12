import * as React from "react";
import * as ReactDOM from "react-dom";
import { CircleIcon } from "./defaults";
import { IIconProps } from "./types";

function style(size: string = "32px"): {
  width: string,
  height: string,
} {
  return {
    width: size,
    height: size,
  };
}
export interface IIconProps {
  className?: string;
  size?: string;
  src?: () => JSX.Element | string | any;
}

export class Icon extends React.Component<IIconProps> {
  public render() {
    const computedStyle = style(this.props.size);
    return <span
      className={"viui-icon " + (this.props.className || "")}
      style={computedStyle}>{() => {
        if (this.props.src === undefined || this.props.src === null) {
          return <span className="viui-icon-core" style={computedStyle}><CircleIcon /></span>;
        } else if (typeof this.props.src === "string") {
          return <span className="viui-icon-core"><img src={this.props.src} style={computedStyle} /></span>;
        } else {
          const Src = this.props.src as () => JSX.Element;
          return <span className="viui-icon-core" style={computedStyle}><Src /></span>;
        }
      }}
    </span>;
  }
}

export default Icon;
