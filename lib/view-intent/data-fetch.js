"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajax_worker_1 = require("ajax-worker");
const nav_1 = require("./nav");
const utility_collection_1 = require("utility-collection");
const state_root_1 = require("./state-root");
const helper_1 = require("./helper");
const uniqid_1 = require("uniqid");
// const u = new Url("teste#globa.teste:2");
// u.setQueries({
//   nome: "teste",
// });
// console.log("- url: ", u.toString());
var DataFetch;
(function (DataFetch) {
    const isReactNative = false;
    function processUrl(url) {
        if (DataFetch.origin !== undefined) {
            const u = new utility_collection_1.Url(url);
            u.setOrigin(DataFetch.origin);
            return u.toString();
        }
        else {
            return url;
        }
    }
    function get(url, data = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const u = new utility_collection_1.Url(url);
            u.setQueries(data);
            return yield genericFetch(u.toString(), "get");
        });
    }
    DataFetch.get = get;
    function post(url, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genericFetch(url, "post", data);
        });
    }
    DataFetch.post = post;
    function put(url, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genericFetch(url, "put", data);
        });
    }
    DataFetch.put = put;
    function patch(url, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genericFetch(url, "patch", data);
        });
    }
    DataFetch.patch = patch;
    function del(url, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const u = new utility_collection_1.Url(url);
            u.setQueries(data);
            return yield genericFetch(u.toString(), "delete");
        });
    }
    DataFetch.del = del;
    function genericFetch(url, method, data = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let viewIntentedPushed = false;
                const urlDataIntent = helper_1.Helper.toUrlDataIntent(url);
                if (!utility_collection_1.Is.nullOrUndefined(urlDataIntent.intent)) {
                    if (!utility_collection_1.Is.nullOrUndefined(urlDataIntent.intent.viewType) && !utility_collection_1.Is.nullOrUndefined(urlDataIntent.intent.areaName)) {
                        viewIntentedPushed = true;
                        nav_1.Nav.intentView(urlDataIntent.intent, urlDataIntent.url);
                    }
                }
                if (urlDataIntent.url !== null && urlDataIntent.url !== undefined && urlDataIntent.url !== "") {
                    ajax_worker_1.AjaxWorker.fetch({
                        sync: true,
                        id: uniqid_1.process().toString(),
                        url: processUrl(urlDataIntent.url),
                        body: method !== "get" && method !== "delete" ? data : undefined,
                        method,
                        headers: [
                            ["Request", "State"],
                            ["IsAjax", "true"],
                            ["Accept", "application/json"],
                            ["Content-Type", "application/json"],
                        ],
                        onSuccess: (response) => {
                            // if is Intent
                            if (response.data.intent !== undefined && response.data.intent !== null) {
                                const data = response.data;
                                // contain state
                                if (response.data.states !== undefined && response.data.states !== null) {
                                    state_root_1.RootStore.applyStatesRoots(response.data.states);
                                }
                                // nav
                                if (!response.urlRedirected.includes("p=")) {
                                    if (!viewIntentedPushed || response.redirected) {
                                        nav_1.Nav.intentView(data.intent, response.urlRedirected);
                                    }
                                    if (!utility_collection_1.Is.empty(data.intent.redirect)) {
                                        setImmediate(() => __awaiter(this, void 0, void 0, function* () {
                                            resolve(yield DataFetch.get(data.intent.redirect));
                                        }));
                                    }
                                    else {
                                        setImmediate(() => __awaiter(this, void 0, void 0, function* () {
                                            resolve(response);
                                        }));
                                    }
                                }
                            }
                            else {
                                resolve(response);
                            }
                        },
                        onAbort: (response) => {
                            // console.error("aborted request", response);
                        },
                        onError: (response) => {
                            reject(response);
                            // console.error("error request", response);
                        },
                        onDone: (response) => {
                            // console.error("done request", response);
                            // console.warn("TODO: decrease the loader counter here.");
                        },
                    });
                }
            });
        });
    }
})(DataFetch = exports.DataFetch || (exports.DataFetch = {}));
exports.default = DataFetch;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC9kYXRhLWZldGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSw2Q0FBeUM7QUFFekMsK0JBQTRCO0FBQzVCLDJEQUE2QztBQUM3Qyw2Q0FBeUM7QUFDekMscUNBQWtDO0FBRWxDLG1DQUF5QztBQUV6Qyw0Q0FBNEM7QUFDNUMsaUJBQWlCO0FBQ2pCLG1CQUFtQjtBQUNuQixNQUFNO0FBQ04sd0NBQXdDO0FBRXhDLElBQWlCLFNBQVMsQ0FpR3pCO0FBakdELFdBQWlCLFNBQVM7SUFDeEIsTUFBTSxhQUFhLEdBQVksS0FBSyxDQUFDO0lBRXJDLG9CQUFvQixHQUFXO1FBQzdCLElBQUksVUFBQSxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ3hCLE1BQU0sQ0FBQyxHQUFHLElBQUksd0JBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTSxDQUFDLENBQUM7WUFDcEIsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDckI7YUFBTTtZQUNMLE9BQU8sR0FBRyxDQUFDO1NBQ1o7SUFDSCxDQUFDO0lBQ0QsYUFBNkIsR0FBVyxFQUFFLE9BQWtFLElBQUk7O1lBQzlHLE1BQU0sQ0FBQyxHQUFHLElBQUksd0JBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUssQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sTUFBTSxZQUFZLENBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUM7S0FBQTtJQUpxQixhQUFHLE1BSXhCLENBQUE7SUFDRCxjQUE4QixHQUFXLEVBQUUsT0FBa0UsRUFBRTs7WUFDN0csT0FBTyxNQUFNLFlBQVksQ0FBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUM7S0FBQTtJQUZxQixjQUFJLE9BRXpCLENBQUE7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QyxDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7QUFDSCxDQUFDLEVBakdnQixTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQWlHekI7QUFDRCxrQkFBZSxTQUFTLENBQUMiLCJmaWxlIjoidmlldy1pbnRlbnQvZGF0YS1mZXRjaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFqYXhXb3JrZXIgfSBmcm9tIFwiYWpheC13b3JrZXJcIjtcclxuaW1wb3J0IHsgSUludGVudCwgSU5hdlN0YXRlLCBJVmlld0ludGVudFJlc3BvbnNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcclxuaW1wb3J0IHsgTmF2IH0gZnJvbSBcIi4vbmF2XCI7XHJcbmltcG9ydCB7IFVybCwgSXMgfSBmcm9tIFwidXRpbGl0eS1jb2xsZWN0aW9uXCI7XHJcbmltcG9ydCB7IFJvb3RTdG9yZSB9IGZyb20gXCIuL3N0YXRlLXJvb3RcIjtcclxuaW1wb3J0IHsgSGVscGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XHJcbmltcG9ydCB7IElSZXNwb25zZU9wdGlvbnMsIElSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJhamF4LXdvcmtlci9AdHlwZXMvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBwcm9jZXNzIGFzIHVuaXEgfSBmcm9tIFwidW5pcWlkXCI7XHJcblxyXG4vLyBjb25zdCB1ID0gbmV3IFVybChcInRlc3RlI2dsb2JhLnRlc3RlOjJcIik7XHJcbi8vIHUuc2V0UXVlcmllcyh7XHJcbi8vICAgbm9tZTogXCJ0ZXN0ZVwiLFxyXG4vLyB9KTtcclxuLy8gY29uc29sZS5sb2coXCItIHVybDogXCIsIHUudG9TdHJpbmcoKSk7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIERhdGFGZXRjaCB7XHJcbiAgY29uc3QgaXNSZWFjdE5hdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIGV4cG9ydCBsZXQgb3JpZ2luOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgZnVuY3Rpb24gcHJvY2Vzc1VybCh1cmw6IHN0cmluZykge1xyXG4gICAgaWYgKG9yaWdpbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGNvbnN0IHUgPSBuZXcgVXJsKHVybCk7XHJcbiAgICAgIHUuc2V0T3JpZ2luKG9yaWdpbik7XHJcbiAgICAgIHJldHVybiB1LnRvU3RyaW5nKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG4gIH1cclxuICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0PFQ+KHVybDogc3RyaW5nLCBkYXRhOiB7IFtwcm9wOiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgYW55IH0gfCBhbnkgPSBudWxsKTogUHJvbWlzZTxJUmVzcG9uc2VPcHRpb25zPFQ+PiB7XHJcbiAgICBjb25zdCB1ID0gbmV3IFVybCh1cmwpO1xyXG4gICAgdS5zZXRRdWVyaWVzKGRhdGEhKTtcclxuICAgIHJldHVybiBhd2FpdCBnZW5lcmljRmV0Y2g8VD4odS50b1N0cmluZygpLCBcImdldFwiKTtcclxuICB9XHJcbiAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHBvc3Q8VD4odXJsOiBzdHJpbmcsIGRhdGE6IHsgW3Byb3A6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBhbnkgfSB8IGFueSA9IHt9KTogUHJvbWlzZTxJUmVzcG9uc2VPcHRpb25zPFQ+PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgZ2VuZXJpY0ZldGNoPFQ+KHVybCwgXCJwb3N0XCIsIGRhdGEpO1xyXG4gIH1cclxuICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcHV0PFQ+KHVybDogc3RyaW5nLCBkYXRhOiB7IFtwcm9wOiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgYW55IH0gfCBhbnkgPSB7fSk6IFByb21pc2U8SVJlc3BvbnNlT3B0aW9uczxUPj4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IGdlbmVyaWNGZXRjaDxUPih1cmwsIFwicHV0XCIsIGRhdGEpO1xyXG4gIH1cclxuICBleHBvcnQgYXN5bmMgZnVuY3Rpb24gcGF0Y2g8VD4odXJsOiBzdHJpbmcsIGRhdGE6IHsgW3Byb3A6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBhbnkgfSB8IGFueSA9IHt9KTogUHJvbWlzZTxJUmVzcG9uc2VPcHRpb25zPFQ+PiB7XHJcbiAgICByZXR1cm4gYXdhaXQgZ2VuZXJpY0ZldGNoPFQ+KHVybCwgXCJwYXRjaFwiLCBkYXRhKTtcclxuICB9XHJcbiAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGRlbDxUPih1cmw6IHN0cmluZywgZGF0YTogeyBbcHJvcDogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IGFueSB9IHwgYW55ID0ge30pOiBQcm9taXNlPElSZXNwb25zZU9wdGlvbnM8VD4+IHtcclxuICAgIGNvbnN0IHUgPSBuZXcgVXJsKHVybCk7XHJcbiAgICB1LnNldFF1ZXJpZXMoZGF0YSk7XHJcbiAgICByZXR1cm4gYXdhaXQgZ2VuZXJpY0ZldGNoPFQ+KHUudG9TdHJpbmcoKSwgXCJkZWxldGVcIik7XHJcbiAgfVxyXG4gIGFzeW5jIGZ1bmN0aW9uIGdlbmVyaWNGZXRjaDxUPih1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIGRhdGE6IHsgW3Byb3A6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBhbnkgfSB8IGFueSA9IHt9KTogUHJvbWlzZTxJUmVzcG9uc2VPcHRpb25zPFQ+PiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8SVJlc3BvbnNlT3B0aW9uczxUPj4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBsZXQgdmlld0ludGVudGVkUHVzaGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IHVybERhdGFJbnRlbnQgPSBIZWxwZXIudG9VcmxEYXRhSW50ZW50KHVybCk7XHJcbiAgICAgIGlmICghSXMubnVsbE9yVW5kZWZpbmVkKHVybERhdGFJbnRlbnQuaW50ZW50KSkge1xyXG4gICAgICAgIGlmICghSXMubnVsbE9yVW5kZWZpbmVkKHVybERhdGFJbnRlbnQuaW50ZW50IS52aWV3VHlwZSkgJiYgIUlzLm51bGxPclVuZGVmaW5lZCh1cmxEYXRhSW50ZW50LmludGVudCEuYXJlYU5hbWUpKSB7XHJcbiAgICAgICAgICB2aWV3SW50ZW50ZWRQdXNoZWQgPSB0cnVlO1xyXG4gICAgICAgICAgTmF2LmludGVudFZpZXcodXJsRGF0YUludGVudC5pbnRlbnQhLCB1cmxEYXRhSW50ZW50LnVybCEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodXJsRGF0YUludGVudC51cmwgIT09IG51bGwgJiYgdXJsRGF0YUludGVudC51cmwgIT09IHVuZGVmaW5lZCAmJiB1cmxEYXRhSW50ZW50LnVybCAhPT0gXCJcIikge1xyXG4gICAgICAgIEFqYXhXb3JrZXIuZmV0Y2g8VD4oe1xyXG4gICAgICAgICAgc3luYzogdHJ1ZSxcclxuICAgICAgICAgIGlkOiB1bmlxKCkudG9TdHJpbmcoKSxcclxuICAgICAgICAgIHVybDogcHJvY2Vzc1VybCh1cmxEYXRhSW50ZW50LnVybCksXHJcbiAgICAgICAgICBib2R5OiBtZXRob2QgIT09IFwiZ2V0XCIgJiYgbWV0aG9kICE9PSBcImRlbGV0ZVwiID8gZGF0YSA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIG1ldGhvZCxcclxuICAgICAgICAgIGhlYWRlcnM6IFtcclxuICAgICAgICAgICAgW1wiUmVxdWVzdFwiLCBcIlN0YXRlXCJdLFxyXG4gICAgICAgICAgICBbXCJJc0FqYXhcIiwgXCJ0cnVlXCJdLFxyXG4gICAgICAgICAgICBbXCJBY2NlcHRcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCJdLFxyXG4gICAgICAgICAgICBbXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCJdLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIG9uU3VjY2VzczogKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGlmIGlzIEludGVudFxyXG4gICAgICAgICAgICBpZiAoKHJlc3BvbnNlLmRhdGEhIGFzIElWaWV3SW50ZW50UmVzcG9uc2UpLmludGVudCAhPT0gdW5kZWZpbmVkICYmIChyZXNwb25zZS5kYXRhISBhcyBJVmlld0ludGVudFJlc3BvbnNlKS5pbnRlbnQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YSEgYXMgSVZpZXdJbnRlbnRSZXNwb25zZTtcclxuICAgICAgICAgICAgICAvLyBjb250YWluIHN0YXRlXHJcbiAgICAgICAgICAgICAgaWYgKChyZXNwb25zZS5kYXRhISBhcyBJVmlld0ludGVudFJlc3BvbnNlKS5zdGF0ZXMgIT09IHVuZGVmaW5lZCAmJiAocmVzcG9uc2UuZGF0YSEgYXMgSVZpZXdJbnRlbnRSZXNwb25zZSkuc3RhdGVzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBSb290U3RvcmUuYXBwbHlTdGF0ZXNSb290cygocmVzcG9uc2UuZGF0YSEgYXMgSVZpZXdJbnRlbnRSZXNwb25zZSkuc3RhdGVzISk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIC8vIG5hdlxyXG4gICAgICAgICAgICAgIGlmICghcmVzcG9uc2UudXJsUmVkaXJlY3RlZCEuaW5jbHVkZXMoXCJwPVwiKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2aWV3SW50ZW50ZWRQdXNoZWQgfHwgcmVzcG9uc2UucmVkaXJlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICBOYXYuaW50ZW50VmlldyhkYXRhLmludGVudCEsIHJlc3BvbnNlLnVybFJlZGlyZWN0ZWQhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghSXMuZW1wdHkoZGF0YS5pbnRlbnQhLnJlZGlyZWN0KSkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRJbW1lZGlhdGUoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXdhaXQgRGF0YUZldGNoLmdldDxUPihkYXRhLmludGVudCEucmVkaXJlY3QhKSk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgc2V0SW1tZWRpYXRlKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uQWJvcnQ6IChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiYWJvcnRlZCByZXF1ZXN0XCIsIHJlc3BvbnNlKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvbkVycm9yOiAocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgcmVqZWN0KHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcImVycm9yIHJlcXVlc3RcIiwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG9uRG9uZTogKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJkb25lIHJlcXVlc3RcIiwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLndhcm4oXCJUT0RPOiBkZWNyZWFzZSB0aGUgbG9hZGVyIGNvdW50ZXIgaGVyZS5cIik7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRGF0YUZldGNoO1xyXG4iXX0=
