import * as React from "react";
import * as ReactDOM from "react-dom";
// import "./.scss";
import { Field } from "../field/field";
import { Is, Reflection } from "utility-collection";
import { DataFetch } from "../../../view-intent/data-fetch";
import { MotherMask } from "mother-mask";
import { Icon } from "../../icons/icon";
import { ILoadableComponent } from "../../interfaces/loadable";
import { IValidableComponent, IValidationResponse } from "../../interfaces/validable";

// import { debounce } from "throttle-debounce";
const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
export class Textbox
  extends React.Component<Textbox.IProps, Textbox.IState>
  implements ILoadableComponent {

  public state: Textbox.IState = {
    focus: false,
    value: "",
    loading: false,
    mounted: false,
  };
  public inputElement: HTMLInputElement | null = null;
  private debounce: number | any = -1;
  constructor(props: Textbox.IProps) {
    super(props);
    this.inputBlur = this.inputBlur.bind(this);
    this.inputFocus = this.inputFocus.bind(this);
    this.inputKeyUp = this.inputKeyUp.bind(this);
    this.inputKeyDown = this.inputKeyDown.bind(this);
    this.inputClick = this.inputClick.bind(this);
    // set value
    this.value = this.props.value;
  }
  public get value(): string | number | null | undefined {
    return this.state.value;
  }
  public set value(value: string | number | null | undefined) {

    // console.log(" set value", value);
    if (this.state.value !== value) {
      if (this.props.mask !== undefined) {
        this.state.value = MotherMask.process(value as string, this.props.mask);
      } else {
        this.state.value = value;
      }
      // this will be in the end
      this.inputChange();
    }
    this.setInputValue(this.state.value);
  }
  public isValid() {
    return true;
  }
  public get isFocus(): boolean {
    return this.state.focus;
  }
  public loading(): void {
    if (!this.state.loading) {
      this.state.loading = true;
      if (this.state.mounted) {
        this.setState(this.state);
      }
    }
  }
  public loaded(): void {
    if (this.state.loading) {
      this.state.loading = false;
      if (!this.state.mounted) {
        this.setState(this.state);
      }
    }
  }
  public async inputChange(): Promise<void> {
    if (this.isFocus) {
      this.loading();
      if (this.props.onChange !== undefined && this.props.onChange !== null) {
        await this.props.onChange!(this);
      }
      if (this.props.onChangeDebounce !== undefined && this.props.onChangeDebounce !== null) {
        clearTimeout(this.debounce);
        this.loading();
        this.debounce = setTimeout(() => {
          (async () => {
            await this.props.onChangeDebounce!(this);
            this.loaded();
          })();
        }, this.props.onChangeDebounceDelay || 600);
      }
      this.loaded();
    }
  }
  public async inputFocus(e: FocusEvent) {
    this.state.focus = true;
    this.setState(this.state);
  }
  public async inputBlur(e: Event) {
    this.state.focus = false;
    this.setState(this.state);
  }
  public async inputKeyUp(e: Event) {
    this.value = (e.target as HTMLInputElement).value;
  }
  public async inputKeyDown(e: Event) {
    setImmediate(() => {
      this.value = (e.target as HTMLInputElement).value;
    });
  }
  public async inputClick(e: Event) {
    if (!Is.nullOrUndefined(this.props.onClick)) {
      this.loading();
      await this.props.onClick!(this);
      this.loaded();
    }
  }
  public isFilled(): boolean {
    if (!Is.empty(this.state.value)) {
      return true;
    } else {
      return false;
    }
  }
  public isLabeled(): boolean {
    if (!Is.empty(this.props.label)) {
      return true;
    } else {
      return false;
    }
  }
  public isDisabled(): boolean {
    return (this.props.disabled || this.state.loading);
  }
  public setInputValue(value: string | number | null | undefined) {
    if (this.inputElement !== null) {
      if (this.inputElement.value !== value) {
        if (value !== undefined && value !== null) {
          this.inputElement!.value = value as string;
        } else {
          this.inputElement!.value = "";
        }
        this.inputElement!.defaultValue = ""; // try ios fix
      }
    }
  }
  public componentDidMount() {
    this.state.mounted = true;
    this.inputElement = (this.refs as any)["input"];
    if (!Is.nullOrUndefined(this.inputElement)) {
      this.inputElement!.addEventListener("focus", this.inputFocus);
      this.inputElement!.addEventListener("blur", this.inputBlur);
      this.inputElement!.addEventListener("click", this.inputClick);
      if (!Is.empty(this.props.mask)) {
        MotherMask.bind(this.inputElement!, this.props.mask!, (value: string) => {
          this.value = value;
        });
        this.value = !Is.nullOrUndefined(this.props.value) ? MotherMask.process(this.props.value! as string, this.props.mask!) : "";
      } else {
        this.inputElement!.addEventListener("keydown", this.inputKeyDown);
        this.inputElement!.addEventListener("paste", this.inputKeyDown);
        this.value = this.props.value;
      }
    }
  }
  public componentWillUnmount() {
    this.state.mounted = false;
    this.inputElement!.removeEventListener("focus", this.inputFocus);
    this.inputElement!.removeEventListener("blur", this.inputBlur);
    this.inputElement!.removeEventListener("keydown", this.inputKeyDown);
    this.inputElement!.removeEventListener("click", this.inputClick);
  }
  public componentWillReceiveProps(props: Textbox.IProps) {
    this.value = props.value;
  }
  public componentDidUpdate() {
    this.setInputValue(this.value);
  }
  public render(): React.ReactNode {
    return <Field
      type="input"
      className={"viui-textbox " +
        (this.isDisabled() ? " -disabled " : " -enabled ") +
        (this.state.loading ? " -loading " : "") +
        (this.state.focus ? " -focus " : "") +
        (this.isFilled() ? " -filled " : "") +
        (this.isLabeled() ? " -labeled" : "")
      }>
      {!Is.empty(this.props.label) && <label className={"-label"}>{this.props.label}</label>}
      <input
        ref="input"
        className={"-input"}
        formNoValidate={true}
        onFocus={async (e) => {
          if (!Is.nullOrUndefined(this.props.onFocus)) {
            this.props.onFocus!(this);
          }
        }}
        onChange={
          (e) => {
            // ios ugly fix
            // watch this bug: https://github.com/facebook/react/issues/8938
            if (iOS) {
              this.value = e.target.value;
            }
          }}
        onBlur={async (e) => {
          if (!Is.nullOrUndefined(this.props.onBlur)) {
            this.props.onBlur!(this);
          }
        }}
        type={this.props.type}
      />
    </Field>;
  }
}
export namespace Textbox {
  export interface IProps {
    className?: string;
    label?: string;
    type?: "text" | "password" | "number" | string;
    disabled?: boolean;
    value?: string | number | null | undefined;
    defaultValue?: string | number | null | undefined;
    mask?: string;
    // customization
    iconSrc?: () => JSX.Element | string | any;
    srcLoader?: string;
    // validation -------------------------
    validation?: Array<((value: string) => Promise<IValidationResponse>) | ((value: string) => IValidationResponse)>;
    // events
    onEnter?: (textbox: Textbox) => void;
    onFocus?: (textbox: Textbox) => void;
    onBlur?: (textbox: Textbox) => void;
    onClick?: (textbox: Textbox) => void;
    onChange?: (textbox: Textbox) => void;
    onChangeDebounce?: (textbox: Textbox) => void;
    onChangeDebounceDelay?: number;
  }
  export interface IState {
    focus: boolean;
    value: string | number | null | undefined;
    loading: boolean;
    mounted: boolean;
  }
}
// console.log("-> textbox ");
export default Textbox;
