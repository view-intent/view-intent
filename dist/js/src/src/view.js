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
import Holder from "./holder";
import Helper from "../../helpers/helper";
// View Abstract class ------------------------------------
var View = (function () {
    function View() {
        this.viewInfo = null;
        this.id = null;
        this.holderId = null;
        this.viewElement = null;
        this.holders = [];
    }
    View.prototype.getHolders = function () {
        return Holder.getHoldersInView(this.id);
    };
    View.prototype.mapHolders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Helper.Dom.childElementDown(this.viewElement, function (element, parent) {
                    Holder.registerElement(element, _this);
                });
                return [2 /*return*/];
            });
        });
    };
    View.prototype.registerEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw "regiterEvents need to be implemented";
            });
        });
    };
    View.prototype.go = function (target) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // get view types -------------------------------------
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(true);
                    })];
            });
        });
    };
    View.prototype.setTemplate = function (template) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(true);
                    })];
            });
        });
    };
    View.prototype.setModel = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(true);
                    })];
            });
        });
    };
    View.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(true);
                    })];
            });
        });
    };
    View.prototype.hide = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(true);
                    })];
            });
        });
    };
    View.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(true);
                    })];
            });
        });
    };
    View.prototype.generateBaseElement = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(true);
                    })];
            });
        });
    };
    View.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        resolve(true);
                    })];
            });
        });
    };
    return View;
}());
export { View };
// View module -----------------------------------------------------
(function (View) {
    View.store = {};
    function getViewsInHolder(holderId) {
        var viewReturn = getViews().map(function (view, index) {
            if (view.holderId === holderId) {
                return view;
            }
        });
        return viewReturn;
    }
    View.getViewsInHolder = getViewsInHolder;
    function getViews() {
        var viewsReturn = [];
        for (var viewId in View.store) {
            if (View.store.hasOwnProperty(viewId)) {
                var view = View.store[viewId];
                viewsReturn.push(view);
            }
        }
        return viewsReturn;
    }
    View.getViews = getViews;
    function init() {
        console.log("view started --------- ");
    }
    View.init = init;
})(View || (View = {}));
// View Adapter --------------------------------------------
(function (View) {
    var Adapter;
    (function (Adapter) {
        var store = {};
        function register(viewType, options) {
            store[viewType] = options;
        }
        Adapter.register = register;
        function create(viewType) {
            if (!Helper.Is.nullOrUndefined(store[viewType])) {
                return store[viewType].builder();
            }
            else {
                throw "The adapter " + viewType + " is not registered!";
            }
        }
        Adapter.create = create;
    })(Adapter = View.Adapter || (View.Adapter = {}));
})(View || (View = {}));
// View Routine --------------------------------------------
(function (View) {
    var Routine;
    (function (Routine) {
        Routine.store = {};
        function register(key, options) {
            Routine.store[key] = options;
        }
        Routine.register = register;
    })(Routine = View.Routine || (View.Routine = {}));
})(View || (View = {}));
export default View;
//# sourceMappingURL=view.js.map