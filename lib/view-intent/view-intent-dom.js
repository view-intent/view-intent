"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_collection_1 = require("utility-collection");
const helper_1 = require("./helper");
const main_1 = require("./main");
var ViewIntentDom;
(function (ViewIntentDom) {
    function init() {
        setLinksMiddleware();
    }
    ViewIntentDom.init = init;
    function setLinksMiddleware() {
        document.addEventListener("click", (e) => {
            let isTagA = false;
            const targetNode = e.target;
            let linkNode = null;
            if (targetNode.nodeName === "A") {
                isTagA = true;
                linkNode = targetNode;
            }
            else {
                utility_collection_1.Dom.parentElementUp(targetNode, (node) => {
                    if (node.nodeName === "A") {
                        isTagA = true;
                        linkNode = node;
                        return true;
                    }
                });
            }
            if (isTagA === true) {
                const linkTarget = linkNode.getAttribute("target");
                const linkHref = linkNode.getAttribute("href");
                if (linkTarget !== null && linkTarget !== undefined) {
                    if ((linkTarget.toLowerCase() === "_blank")) {
                        return;
                    }
                }
                if (linkHref !== null && linkTarget !== undefined) {
                    if (helper_1.Helper.isViewIntentUrl(linkHref)) {
                        main_1.ViewIntent.intentView(linkHref);
                        e.preventDefault();
                    }
                }
            }
        }, true);
    }
})(ViewIntentDom = exports.ViewIntentDom || (exports.ViewIntentDom = {}));

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy92aWV3LWludGVudC92aWV3LWludGVudC1kb20udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyREFBeUM7QUFDekMscUNBQWtDO0FBR2xDLGlDQUFvQztBQUVwQyxJQUFpQixhQUFhLENBc0M3QjtBQXRDRCxXQUFpQixhQUFhO0lBQzVCO1FBQ0Usa0JBQWtCLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRmUsa0JBQUksT0FFbkIsQ0FBQTtJQUNEO1FBQ0UsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQWEsRUFBUSxFQUFFO1lBQ3pELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNuQixNQUFNLFVBQVUsR0FBa0MsQ0FBQyxDQUFDLE1BQWUsQ0FBQztZQUNwRSxJQUFJLFFBQVEsR0FBaUIsSUFBSSxDQUFDO1lBQ2xDLElBQUksVUFBVSxDQUFDLFFBQVEsS0FBSyxHQUFHLEVBQUU7Z0JBQy9CLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2QsUUFBUSxHQUFHLFVBQVUsQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCx3QkFBRyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDdkMsSUFBSSxJQUFLLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTt3QkFDMUIsTUFBTSxHQUFHLElBQUksQ0FBQzt3QkFDZCxRQUFRLEdBQUcsSUFBSSxDQUFDO3dCQUNoQixPQUFPLElBQUksQ0FBQztxQkFDYjtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1lBQ0QsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFO2dCQUNuQixNQUFNLFVBQVUsR0FBSSxRQUFvQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxRQUFRLEdBQUksUUFBb0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVELElBQUksVUFBVSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO29CQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxLQUFLLFFBQVEsQ0FBQyxFQUFFO3dCQUMzQyxPQUFPO3FCQUNSO2lCQUNGO2dCQUNELElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxVQUFVLEtBQUssU0FBUyxFQUFFO29CQUNqRCxJQUFJLGVBQU0sQ0FBQyxlQUFlLENBQUMsUUFBUyxDQUFDLEVBQUU7d0JBQ3JDLGlCQUFVLENBQUMsVUFBVSxDQUFDLFFBQVMsQ0FBQyxDQUFDO3dCQUNqQyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7cUJBQ3BCO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDWCxDQUFDO0FBQ0gsQ0FBQyxFQXRDZ0IsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFzQzdCIiwiZmlsZSI6InZpZXctaW50ZW50L3ZpZXctaW50ZW50LWRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvbSB9IGZyb20gXCJ1dGlsaXR5LWNvbGxlY3Rpb25cIjtcclxuaW1wb3J0IHsgSGVscGVyIH0gZnJvbSBcIi4vaGVscGVyXCI7XHJcbmltcG9ydCB7IERhdGFGZXRjaCB9IGZyb20gXCIuL2RhdGEtZmV0Y2hcIjtcclxuaW1wb3J0IHsgTmF2IH0gZnJvbSBcIi4vbmF2XCI7XHJcbmltcG9ydCB7IFZpZXdJbnRlbnQgfSBmcm9tIFwiLi9tYWluXCI7XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFZpZXdJbnRlbnREb20ge1xyXG4gIGV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgc2V0TGlua3NNaWRkbGV3YXJlKCk7XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNldExpbmtzTWlkZGxld2FyZSgpIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xyXG4gICAgICBsZXQgaXNUYWdBID0gZmFsc2U7XHJcbiAgICAgIGNvbnN0IHRhcmdldE5vZGU6IE5vZGUgfCBIVE1MRWxlbWVudCB8IEVsZW1lbnQgPSAoZS50YXJnZXQgYXMgTm9kZSk7XHJcbiAgICAgIGxldCBsaW5rTm9kZTogTm9kZSB8IG51bGwgID0gbnVsbDtcclxuICAgICAgaWYgKHRhcmdldE5vZGUubm9kZU5hbWUgPT09IFwiQVwiKSB7XHJcbiAgICAgICAgaXNUYWdBID0gdHJ1ZTtcclxuICAgICAgICBsaW5rTm9kZSA9IHRhcmdldE5vZGU7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgRG9tLnBhcmVudEVsZW1lbnRVcCh0YXJnZXROb2RlLCAobm9kZSkgPT4ge1xyXG4gICAgICAgICAgaWYgKG5vZGUhLm5vZGVOYW1lID09PSBcIkFcIikge1xyXG4gICAgICAgICAgICBpc1RhZ0EgPSB0cnVlO1xyXG4gICAgICAgICAgICBsaW5rTm9kZSA9IG5vZGU7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc1RhZ0EgPT09IHRydWUpIHtcclxuICAgICAgICBjb25zdCBsaW5rVGFyZ2V0ID0gKGxpbmtOb2RlIGFzIEVsZW1lbnQpLmdldEF0dHJpYnV0ZShcInRhcmdldFwiKTtcclxuICAgICAgICBjb25zdCBsaW5rSHJlZiA9IChsaW5rTm9kZSBhcyBFbGVtZW50KS5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xyXG4gICAgICAgIGlmIChsaW5rVGFyZ2V0ICE9PSBudWxsICYmIGxpbmtUYXJnZXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaWYgKChsaW5rVGFyZ2V0LnRvTG93ZXJDYXNlKCkgPT09IFwiX2JsYW5rXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxpbmtIcmVmICE9PSBudWxsICYmIGxpbmtUYXJnZXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgaWYgKEhlbHBlci5pc1ZpZXdJbnRlbnRVcmwobGlua0hyZWYhKSkge1xyXG4gICAgICAgICAgICBWaWV3SW50ZW50LmludGVudFZpZXcobGlua0hyZWYhKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSwgdHJ1ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==
