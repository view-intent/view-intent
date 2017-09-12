export var Helper;
(function (Helper) {
    var Dom;
    (function (Dom) {
        function insertBefore(element, targetElement) {
            targetElement.parentElement.insertBefore(element, targetElement);
        }
        Dom.insertBefore = insertBefore;
        function insertAfter(element, targetElement) {
            var parent = targetElement.parentNode;
            if (parent.lastChild === targetElement) {
                parent.appendChild(element);
            }
            else {
                parent.insertBefore(element, targetElement.nextSibling);
            }
        }
        Dom.insertAfter = insertAfter;
        function remove(element) {
            if (element.parentElement !== null) {
                element.parentElement.removeChild(element);
            }
        }
        Dom.remove = remove;
        function htmlToNode(html) {
            if (html instanceof Node) {
                return html;
            }
            else {
                var node = document.createElement("div");
                node.innerHTML = html;
                return node;
            }
        }
        Dom.htmlToNode = htmlToNode;
        // atributes  ---------------------------------------------
        function getAttributes(element) {
            var attrs = element.attributes;
            var newAttr = {};
            for (var i = 0; i < attrs.length; i++) {
                newAttr[attrs[i].name] = attrs[i].value;
            }
            return newAttr;
        }
        Dom.getAttributes = getAttributes;
        // Loops e giros pelo dom --------------------------------------------
        function childElement(node, each) {
            var child = node.firstChild;
            while (child) {
                if (child.nodeType === 1) {
                    each(child);
                }
                child = child.nextSibling;
            }
        }
        Dom.childElement = childElement;
        // element down --------------------------
        function nodeDown(node, each) {
            if (each(node, undefined) !== false) {
                this.childNodeDown(node, each);
            }
        }
        Dom.nodeDown = nodeDown;
        function childNodeDown(node, each) {
            var parent = node;
            var child = node.firstChild;
            while (child) {
                var eachReturn = each(child, parent);
                if (eachReturn !== false) {
                    this.childNodeDown(child, each);
                }
                child = child.nextSibling;
            }
        }
        Dom.childNodeDown = childNodeDown;
        function elementDown(node, each) {
            if (each(node, undefined) !== false) {
                this.childElementDown(node, each);
            }
        }
        Dom.elementDown = elementDown;
        function childElementDown(node, each) {
            var parent = node;
            var child = node.firstChild;
            while (child) {
                if (child.nodeType === 1) {
                    var eachReturn = each(child, parent);
                    if (eachReturn !== false) {
                        this.childElementDown(child, each);
                    }
                }
                child = child.nextSibling;
            }
        }
        Dom.childElementDown = childElementDown;
        // element up --------------------------
        function elementUp(node, each) {
            if (each(node) !== false) {
                parentElementUp(node, each);
            }
        }
        Dom.elementUp = elementUp;
        function parentElementUp(node, each) {
            var retorno = true;
            var current = node.parentNode;
            do {
                retorno = each(current);
                current = current.parentNode;
            } while (retorno !== false && current !== null && current !== undefined && node.nodeName !== "BODY");
        }
        Dom.parentElementUp = parentElementUp;
        // dom --------------------------
        function attribute(element, each) {
            // TODO: this still need to be tested
            var attributes = element.attributes;
            for (var i = 0; i < attributes.length; i++) {
                each(attributes[i].name, attributes[i].value);
            }
        }
        Dom.attribute = attribute;
        function findNextSibling(target, validation) {
            var current = target.nextSibling;
            while (current !== null) {
                if (validation(current) === true) {
                    return current;
                }
                else {
                    current = current.nextSibling;
                }
            }
            return null;
        }
        Dom.findNextSibling = findNextSibling;
        function findPrevSibling(target, validation) {
            var current = target.previousSibling;
            while (current !== null) {
                if (validation(current) === true) {
                    return current;
                }
                else {
                    current = current.previousSibling;
                }
            }
            return null;
        }
        Dom.findPrevSibling = findPrevSibling;
        function findAllSiblings(target) {
            var siblings = [];
            findPrevSibling(target, function (node) {
                siblings.push(node);
                return false;
            });
            findNextSibling(target, function (node) {
                siblings.push(node);
                return false;
            });
            return siblings;
        }
        Dom.findAllSiblings = findAllSiblings;
    })(Dom = Helper.Dom || (Helper.Dom = {}));
})(Helper || (Helper = {}));
export default Helper.Dom;
//# sourceMappingURL=dom.js.map