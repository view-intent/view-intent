"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const main_1 = require("../mobx/main");
const equal = require("deep-equal");
class View extends React.Component {
    constructor(props) {
        super(props);
        this.viewState = null;
        this.loadingClassName = "preload";
        this._isMounted = false;
        this.mobxInstances = [];
        this.mobxUnregiters = [];
        this.viewState = props.viewState;
        this.joinClass.bind(this);
    }
    get viewClassName() {
        return this.viewInfo.area.toLowerCase() + "-" + this.viewInfo.name.toLowerCase();
    }
    get isMounted() {
        return this._isMounted;
    }
    joinClass(classNamesList, loader = false) {
        const mapped = classNamesList.map((value) => {
            if (value !== null && value !== undefined) {
                return value;
            }
        });
        if (loader) {
            mapped.push(this.loadingClassName);
        }
        return mapped.join(" ");
    }
    ref(refName) {
        return this.refs[refName];
    }
    bindStore(instance) {
        this.mobxInstances.push(instance);
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillMount() {
        const self = this;
        self.mobxInstances.forEach((instance) => {
            self.mobxUnregiters.push(main_1.observe(instance, (change) => {
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
        this._isMounted = false;
        while (this.mobxUnregiters.length > 0) {
            this.mobxUnregiters.pop()();
        }
    }
}
__decorate([
    main_1.observable,
    __metadata("design:type", String)
], View.prototype, "loadingClassName", void 0);
exports.View = View;
exports.default = View;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC92aWV3LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLCtCQUErQjtBQUUvQix1Q0FBNEQ7QUFLNUQsTUFBTSxLQUFLLEdBQTBDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUUzRSxVQUFtRixTQUFRLEtBQUssQ0FBQyxTQUF5QjtJQWN4SCxZQUFtQixLQUFhO1FBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQVpSLGNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBQ3ZCLHFCQUFnQixHQUFXLFNBQVMsQ0FBQztRQUNoRCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBTzVCLGtCQUFhLEdBQWlDLEVBQUUsQ0FBQztRQUNqRCxtQkFBYyxHQUFzQixFQUFFLENBQUM7UUFHN0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBVSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFaRCxJQUFXLGFBQWE7UUFDdEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEYsQ0FBQztJQUNELElBQVcsU0FBUztRQUNsQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQVFNLFNBQVMsQ0FBQyxjQUE0QyxFQUFFLFNBQWtCLEtBQUs7UUFDcEYsTUFBTSxNQUFNLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQzFDLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO2dCQUN6QyxPQUFPLEtBQUssQ0FBQzthQUNkO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUNNLEdBQUcsQ0FBcUQsT0FBZTtRQUM1RSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFNLENBQUM7SUFDakMsQ0FBQztJQUNNLFNBQVMsQ0FBQyxRQUFhO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTSxpQkFBaUI7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDekIsQ0FBQztJQUNNLGtCQUFrQjtRQUN2QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ3BELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7UUFDSCw0QkFBNEI7UUFDNUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFDTSxlQUFlO1FBQ3BCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDO0lBQ00seUJBQXlCLENBQUMsT0FBZTtRQUM5QyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNNLG9CQUFvQjtRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRyxFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0NBRUY7QUE1RGE7SUFBWCxpQkFBVTs7OENBQTZDO0FBSjFELG9CQWdFQztBQXdCRCxrQkFBZSxJQUFJLENBQUMiLCJmaWxlIjoidmlldy1pbnRlbnQvdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgKiBhcyBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IG9ic2VydmUsIGF1dG9ydW4sIG9ic2VydmFibGUgfSBmcm9tIFwiLi4vbW9ieC9tYWluXCI7XHJcbmltcG9ydCB7IElJbnRlbnQsIElWaWV3SW5mbywgSU5hdlN0YXRlIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgVmlld0ludGVudFN0YXRlLCBWaWV3U3RhdGUgfSBmcm9tIFwiLi92aWV3LWludGVudC1zdGF0ZVwiO1xyXG5pbXBvcnQgeyBSZWZsZWN0aW9uIH0gZnJvbSBcInV0aWxpdHktY29sbGVjdGlvblwiO1xyXG5cclxuY29uc3QgZXF1YWw6ICh2YWx1ZTE6IGFueSwgdmFsdWUyOiBhbnkpID0+IGJvb2xlYW4gPSByZXF1aXJlKFwiZGVlcC1lcXVhbFwiKTtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBWaWV3PFRQcm9wcyBleHRlbmRzIFZpZXcuSVByb3BzLCBUU3RhdGUgZXh0ZW5kcyBWaWV3LklTdGF0ZT4gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8VFByb3BzLCBUU3RhdGU+IGltcGxlbWVudHMgVmlldy5JVmlldzxUUHJvcHMsIFRTdGF0ZT4gIHtcclxuICBwdWJsaWMgYWJzdHJhY3Qgdmlld0luZm86IElWaWV3SW5mbztcclxuICBwdWJsaWMgYWJzdHJhY3Qgc3RhdGU6IFRTdGF0ZTtcclxuICBwdWJsaWMgdmlld1N0YXRlOiBWaWV3U3RhdGUgfCBudWxsID0gbnVsbDtcclxuICBAb2JzZXJ2YWJsZSBwdWJsaWMgbG9hZGluZ0NsYXNzTmFtZTogc3RyaW5nID0gXCJwcmVsb2FkXCI7XHJcbiAgcHJpdmF0ZSBfaXNNb3VudGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljIGdldCB2aWV3Q2xhc3NOYW1lKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlld0luZm8uYXJlYSEudG9Mb3dlckNhc2UoKSArIFwiLVwiICsgdGhpcy52aWV3SW5mby5uYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHB1YmxpYyBnZXQgaXNNb3VudGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2lzTW91bnRlZDtcclxuICB9XHJcbiAgcHJpdmF0ZSBtb2J4SW5zdGFuY2VzOiBBcnJheTwoY2hhbmdlOiBhbnkpID0+IHZvaWQ+ID0gW107XHJcbiAgcHJpdmF0ZSBtb2J4VW5yZWdpdGVyczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuICBwdWJsaWMgY29uc3RydWN0b3IocHJvcHM6IFRQcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgdGhpcy52aWV3U3RhdGUgPSBwcm9wcy52aWV3U3RhdGUhO1xyXG4gICAgdGhpcy5qb2luQ2xhc3MuYmluZCh0aGlzKTtcclxuICB9XHJcbiAgcHVibGljIGpvaW5DbGFzcyhjbGFzc05hbWVzTGlzdDogQXJyYXk8c3RyaW5nfHVuZGVmaW5lZHxudWxsPiwgbG9hZGVyOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbWFwcGVkID0gY2xhc3NOYW1lc0xpc3QubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAobG9hZGVyKSB7XHJcbiAgICAgIG1hcHBlZC5wdXNoKHRoaXMubG9hZGluZ0NsYXNzTmFtZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbWFwcGVkLmpvaW4oXCIgXCIpO1xyXG4gIH1cclxuICBwdWJsaWMgcmVmPFQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQgfCB7IFtrZXk6IHN0cmluZ106IGFueSB9PihyZWZOYW1lOiBzdHJpbmcpOiBUIHtcclxuICAgIHJldHVybiB0aGlzLnJlZnNbcmVmTmFtZV0gYXMgVDtcclxuICB9XHJcbiAgcHVibGljIGJpbmRTdG9yZShpbnN0YW5jZTogYW55KSB7XHJcbiAgICB0aGlzLm1vYnhJbnN0YW5jZXMucHVzaChpbnN0YW5jZSk7XHJcbiAgfVxyXG4gIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX2lzTW91bnRlZCA9IHRydWU7XHJcbiAgfVxyXG4gIHB1YmxpYyBjb21wb25lbnRXaWxsTW91bnQoKSB7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIHNlbGYubW9ieEluc3RhbmNlcy5mb3JFYWNoKChpbnN0YW5jZSkgPT4ge1xyXG4gICAgICBzZWxmLm1vYnhVbnJlZ2l0ZXJzLnB1c2gob2JzZXJ2ZShpbnN0YW5jZSwgKGNoYW5nZSkgPT4ge1xyXG4gICAgICAgIHNlbGYuZm9yY2VVcGRhdGUoKTtcclxuICAgICAgfSkpO1xyXG4gICAgfSk7XHJcbiAgICAvLyB1cGRhdGUgc3RhdGUgYmVmb3JlIG1vdW50XHJcbiAgICB0aGlzLnVwZGF0ZVZpZXdTdGF0ZSgpO1xyXG4gIH1cclxuICBwdWJsaWMgdXBkYXRlVmlld1N0YXRlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucHJvcHMudmlld1N0YXRlICYmIHRoaXMucHJvcHMudmlld1N0YXRlLnZpZXdTdGF0ZSkge1xyXG4gICAgICB0aGlzLnNldFN0YXRlKHRoaXMucHJvcHMudmlld1N0YXRlLnZpZXdTdGF0ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3A6IFRQcm9wcykge1xyXG4gICAgdGhpcy51cGRhdGVWaWV3U3RhdGUoKTtcclxuICB9XHJcbiAgcHVibGljIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgdGhpcy5faXNNb3VudGVkID0gZmFsc2U7XHJcbiAgICB3aGlsZSAodGhpcy5tb2J4VW5yZWdpdGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMubW9ieFVucmVnaXRlcnMucG9wKCkhKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHB1YmxpYyBhYnN0cmFjdCByZW5kZXIoKTogUmVhY3QuUmVhY3ROb2RlIHwgSlNYLkVsZW1lbnQgfCBKU1guRWxlbWVudFtdO1xyXG59XHJcbmV4cG9ydCBuYW1lc3BhY2UgVmlldyB7XHJcbiAgZXhwb3J0IGludGVyZmFjZSBJU3RhdGUge1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIElQcm9wcyB7XHJcbiAgICBpbnN0YW5jZUlkPzogc3RyaW5nO1xyXG4gICAgdmlzaWJsZT86IGJvb2xlYW47XHJcbiAgICB2aWV3U3RhdGU/OiBWaWV3U3RhdGU7XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVZpZXc8VFByb3BzIGV4dGVuZHMgSVByb3BzLCBUU3RhdGUgZXh0ZW5kcyBJU3RhdGU+IHsgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVZpZXdDb25zdHJ1Y3RvciB7XHJcbiAgICByZXF1aXJlPzogKCkgPT4gSUludGVudFtdO1xyXG4gICAgbmV3KC4uLmFyZ3M6IGFueVtdKTogVmlldzxhbnksIGFueT47XHJcbiAgfVxyXG4gIGV4cG9ydCBpbnRlcmZhY2UgSVZpZXdNZWFzdXJlcyB7XHJcbiAgICBtb2JpbGU/OiBJVmlld01lYXN1cmU7XHJcbiAgICB0YWJsZXQ/OiBJVmlld01lYXN1cmU7XHJcbiAgICBkZXNrdG9wPzogSVZpZXdNZWFzdXJlO1xyXG4gIH1cclxuICBleHBvcnQgaW50ZXJmYWNlIElWaWV3TWVhc3VyZSB7XHJcbiAgICB3aWR0aD86IG51bWJlciB8IHN0cmluZztcclxuICAgIGhlaWdodD86IG51bWJlciB8IHN0cmluZztcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgVmlldztcclxuIl19
