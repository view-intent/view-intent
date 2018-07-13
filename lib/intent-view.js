import Helper from "./helper";
import { Is } from "utility-collection";
import DataFetch from "./data-fetch";
import { Nav } from "./nav";
export function intentView(intentOrUrl, viewState, callback) {
    if (viewState === void 0) { viewState = null; }
    if (callback === void 0) { callback = null; }
    var intent = Helper.pathToIntent(intentOrUrl, viewState);
    var url = Helper.removeSharp(intentOrUrl);
    if (!Is.empty(url)) {
        DataFetch.get(url, undefined);
    }
    if (intent != null) {
        Nav.intentView(intent, url, callback);
    }
}
//# sourceMappingURL=intent-view.js.map