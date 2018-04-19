import { Dom } from "utility-collection";
import { Helper } from "./helper";
import { DataFetch } from "./data-fetch";
export namespace ViewIntentDom {
  export function init() {
    setLinksMiddleware();
  }
  function setLinksMiddleware() {
    document.addEventListener("click", (e: MouseEvent): void => {

      let isTagA = false;
      const targetNode: Node | HTMLElement | Element = (e.target as Node);
      let linkNode = null;
      if (targetNode.nodeName === "A") {
        isTagA = true;
        linkNode = targetNode;
      } else {
        Dom.parentElementUp(targetNode, (node) => {
          if (node.nodeName === "A") {
            isTagA = true;
            linkNode = node;
            return true;
          }
        });
      }
      if (isTagA === true) {
        const linkTarget = (linkNode as Element).getAttribute("target");
        const linkHref = (linkNode as Element).getAttribute("href");
        if (linkTarget !== null && linkTarget !== undefined) {
          if ((linkTarget.toLowerCase() === "_blank")) {
            return;
          }
        }
        if (Helper.isViewIntentUrl(linkHref!)) {
          DataFetch.get(linkHref!);
          e.preventDefault();
        }
      }
    }, true);
  }
}
