"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { observe, toJS } from "mobx";
const main_1 = require("../mobx/main");
const localforage = require("localforage");
const utility_collection_1 = require("utility-collection");
// import * as CircularJSON from "circular-json";
var Persistent;
(function (Persistent) {
    function restoreState(stateRootName, stateRootInstance) {
        setImmediate(() => {
            localforage.getItem("@viewintent:" + stateRootName).then((value) => {
                if (!utility_collection_1.Is.nullOrUndefined(value)) {
                    stateRootInstance.persistInput(value);
                }
            }).catch((err) => {
                console.warn(err);
            });
        });
    }
    function saveState(stateRootName, value) {
        localforage.setItem("@viewintent:" + stateRootName, value);
    }
    function init(stateRootName, stateRootInstance) {
        if (stateRootInstance.persistOutput !== undefined && stateRootInstance.persistInput !== undefined) {
            main_1.observe(stateRootInstance, (change) => {
                if (change.name !== "viUpVersion") {
                    saveState(stateRootName, stateRootInstance.persistOutput());
                }
            });
            restoreState(stateRootName, stateRootInstance);
        }
    }
    Persistent.init = init;
})(Persistent = exports.Persistent || (exports.Persistent = {}));
exports.default = Persistent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC9wZXJzaXN0ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXdDO0FBQ3hDLHVDQUE2QztBQUM3QywyQ0FBMkM7QUFFM0MsMkRBQXdDO0FBQ3hDLGlEQUFpRDtBQUVqRCxJQUFpQixVQUFVLENBeUIxQjtBQXpCRCxXQUFpQixVQUFVO0lBQ3pCLHNCQUFzQixhQUFxQixFQUFFLGlCQUFzQjtRQUNqRSxZQUFZLENBQUMsR0FBRyxFQUFFO1lBQ2hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNqRSxJQUFJLENBQUMsdUJBQUUsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzlCLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdkM7WUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDZixPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsbUJBQW1CLGFBQXFCLEVBQUUsS0FBVTtRQUNsRCxXQUFXLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELGNBQXFCLGFBQXFCLEVBQUUsaUJBQXNCO1FBQ2hFLElBQUksaUJBQWlCLENBQUMsYUFBYSxLQUFLLFNBQVMsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1lBQ2pHLGNBQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNwQyxJQUFLLE1BQWMsQ0FBQyxJQUFJLEtBQUssYUFBYSxFQUFFO29CQUMxQyxTQUFTLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7aUJBQzdEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxZQUFZLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBVGUsZUFBSSxPQVNuQixDQUFBO0FBQ0gsQ0FBQyxFQXpCZ0IsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUF5QjFCO0FBQ0Qsa0JBQWUsVUFBVSxDQUFDIiwiZmlsZSI6InZpZXctaW50ZW50L3BlcnNpc3RlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBvYnNlcnZlLCB0b0pTIH0gZnJvbSBcIm1vYnhcIjtcclxuaW1wb3J0IHsgb2JzZXJ2ZSwgdG9KUyB9IGZyb20gXCIuLi9tb2J4L21haW5cIjtcclxuaW1wb3J0ICogYXMgbG9jYWxmb3JhZ2UgZnJvbSBcImxvY2FsZm9yYWdlXCI7XHJcbmltcG9ydCB7IFJlZmxlY3Rpb24gfSBmcm9tIFwidXRpbGl0eS1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IElzIH0gZnJvbSBcInV0aWxpdHktY29sbGVjdGlvblwiO1xyXG4vLyBpbXBvcnQgKiBhcyBDaXJjdWxhckpTT04gZnJvbSBcImNpcmN1bGFyLWpzb25cIjtcclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgUGVyc2lzdGVudCB7XHJcbiAgZnVuY3Rpb24gcmVzdG9yZVN0YXRlKHN0YXRlUm9vdE5hbWU6IHN0cmluZywgc3RhdGVSb290SW5zdGFuY2U6IGFueSkge1xyXG4gICAgc2V0SW1tZWRpYXRlKCgpID0+IHtcclxuICAgICAgbG9jYWxmb3JhZ2UuZ2V0SXRlbShcIkB2aWV3aW50ZW50OlwiICsgc3RhdGVSb290TmFtZSkudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICBpZiAoIUlzLm51bGxPclVuZGVmaW5lZCh2YWx1ZSkpIHtcclxuICAgICAgICAgIHN0YXRlUm9vdEluc3RhbmNlLnBlcnNpc3RJbnB1dCh2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKGVycik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNhdmVTdGF0ZShzdGF0ZVJvb3ROYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcclxuICAgIGxvY2FsZm9yYWdlLnNldEl0ZW0oXCJAdmlld2ludGVudDpcIiArIHN0YXRlUm9vdE5hbWUsIHZhbHVlKTtcclxuICB9XHJcbiAgZXhwb3J0IGZ1bmN0aW9uIGluaXQoc3RhdGVSb290TmFtZTogc3RyaW5nLCBzdGF0ZVJvb3RJbnN0YW5jZTogYW55KSB7XHJcbiAgICBpZiAoc3RhdGVSb290SW5zdGFuY2UucGVyc2lzdE91dHB1dCAhPT0gdW5kZWZpbmVkICYmIHN0YXRlUm9vdEluc3RhbmNlLnBlcnNpc3RJbnB1dCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIG9ic2VydmUoc3RhdGVSb290SW5zdGFuY2UsIChjaGFuZ2UpID0+IHtcclxuICAgICAgICBpZiAoKGNoYW5nZSBhcyBhbnkpLm5hbWUgIT09IFwidmlVcFZlcnNpb25cIikge1xyXG4gICAgICAgICAgc2F2ZVN0YXRlKHN0YXRlUm9vdE5hbWUsIHN0YXRlUm9vdEluc3RhbmNlLnBlcnNpc3RPdXRwdXQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmVzdG9yZVN0YXRlKHN0YXRlUm9vdE5hbWUsIHN0YXRlUm9vdEluc3RhbmNlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgUGVyc2lzdGVudDtcclxuIl19
