var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// import from "Vue";
// import vueResource from '@types/vue-resource';
// import * as Vue from 'vue-resource';
import Vue from "vue";
import View from "../../src/View";
// class for ViewAdapter
var VueView = (function (_super) {
    __extends(VueView, _super);
    function VueView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.RequireTemplate = true;
        return _this;
    }
    VueView.prototype.Inject = function (viewInfo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.Inject.call(this, viewInfo);
                this.InjectModel(this.ViewInfo.model);
                return [2 /*return*/];
            });
        });
    };
    VueView.prototype.InjectTemplate = function (template) {
        return __awaiter(this, void 0, void 0, function () {
            var beforeRender, afterRender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(template != null && template != undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, Dynamic.Execute("beforeRender", this)];
                    case 1:
                        beforeRender = _a.sent();
                        this.BaseElement.innerHTML = template;
                        return [4 /*yield*/, Dynamic.Execute("afterRender", this)];
                    case 2:
                        afterRender = _a.sent();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    VueView.prototype.InjectModel = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return VueView;
}(View));
export { VueView };
//export class VueView extends View {
//	private instance: any;
//	public builder<VueView>(el: HTMLElement) {
//		this.instance = VueView.defaultView(el);
//	}
//}
(function (VueView) {
    function defaultView(el) {
        var app = new Vue({
            el: el,
            data: {
                get: {},
                post: {}
            }
        });
    }
    VueView.defaultView = defaultView;
})(VueView || (VueView = {}));
// import View from "../src/view";
// export class VueView2 extends View {
// }
// export module VueView {
// 	export function generate() {
// 		// var app = new Vue({
// 		// 	el: '#app',
// 		// 	data: {
// 		// 	message: 'Hello Vue!'
// 		// 	}
// 		// })
// 		// return new Vue({
// 		// 	el: "#app",
// 		// 	template: `
// 		// 	<div>
// 		// 		<div>Hello {{name}}!</div>
// 		// 		Name: <input v-model="name" type="text">
// 		// 	</div>`,
// 		// 	data: {
// 		// 		name: "World"
// 		// 	}
// 		// });
// 	}
// }
// console.log("ok");  
//# sourceMappingURL=view.js.map