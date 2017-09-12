export module Helper.Dom {

	export function insertBefore(element: Node, targetElement: Node): void {
		targetElement.parentElement.insertBefore(element, targetElement);
	}
	export function insertAfter(element: Node, targetElement: Node): void {
		var parent = targetElement.parentNode;
		if (parent.lastChild === targetElement) {
			parent.appendChild(element);
		} else {
			parent.insertBefore(element, targetElement.nextSibling);
		}
	}
	export function remove(element: Node): void {
		if (element.parentElement !== null) {
			element.parentElement.removeChild(element);
		}
	}
	export function htmlToNode(html: string | Element): Element {
		if (html instanceof Node) {
			return html;
		} else {
			let node: Element = <any>document.createElement("div");
			node.innerHTML = html;
			return node;
		}
	}
	// atributes  ---------------------------------------------
	export function getAttributes(element: Element | Node): { [key: string]: string; } {
		let attrs = element.attributes;
		let newAttr: { [key: string]: string; } = {};
		for (let i = 0; i < attrs.length; i++) {
			newAttr[attrs[i].name] = attrs[i].value;
		}
		return newAttr;
	}

	// Loops e giros pelo dom --------------------------------------------
	export function childElement(node: Element, each: (node: Element) => void): void {
		let child: Node = node.firstChild;
		while (child) {
			if (child.nodeType === 1) {
				each(<Element>child);
			}
			child = child.nextSibling;
		}
	}

	// element down --------------------------
	export function nodeDown(node: Node | Node, each: (node: Node | Node, parent?: Node | Node) => void | boolean): void {
		if (each(node, undefined) !== false) {
			this.childNodeDown(node, each);
		}
	}

	export function childNodeDown(node: Node, each: (node: Node, parent?: Node) => void | boolean): void {
		let parent: Node = node;
		let child: Node = node.firstChild;
		while (child) {
			let eachReturn: boolean | void = each(child, parent);
			if (eachReturn !== false) {
				this.childNodeDown(child, each);
			}
			child = child.nextSibling;
		}
	}

	export function elementDown(node: Element, each: (node: Element, parent?: Element) => void | boolean): void {
		if (each(node, undefined) !== false) {
			this.childElementDown(node, each);
		}
	}

	export function childElementDown(node: Element, each: (node: HTMLElement, parent?: HTMLElement) => void | boolean): void {
		let parent: Element = node;
		let child: Node = node.firstChild;
		while (child) {
			if (child.nodeType === 1) {
				let eachReturn: boolean | void = each(<HTMLElement>child, <HTMLElement>parent);
				if (eachReturn !== false) {
					this.childElementDown(<HTMLElement>child, each);
				}
			}
			child = child.nextSibling;
		}
	}

	// element up --------------------------
	export function elementUp(node: Element | HTMLElement, each: (node: Element | HTMLElement) => boolean | void): void {
		if (each(node) !== false) {
			parentElementUp(node, each);
		}
	}

	export function parentElementUp(node: Element | HTMLElement | Node, each: (node: Element | HTMLElement | Node) => boolean | void): void {
		let retorno: boolean | void = true;
		let current: Element = <any>node.parentNode;
		do {
			retorno = each(current);
			current = <any>current.parentNode;
		} while (retorno !== false && current !== null && current !== undefined && node.nodeName !== "BODY");
	}

	// dom --------------------------
	export function attribute(element: Element | HTMLElement | Node, each: (key: string, value: string) => void): void {
		// TODO: this still need to be tested
		let attributes = element.attributes;
		for (let i = 0; i < attributes.length; i++) {
			each(attributes[i].name, attributes[i].value);
		}
	}

	export function findNextSibling(target: Node | Node, validation: (node: Node | Node) => boolean | void): Node | Node {
		let current: Node | Node = target.nextSibling;
		while (current !== null) {
			if (validation(current) === true) {
				return current;
			} else {
				current = current.nextSibling;
			}
		}
		return null;
	}

	export function findPrevSibling(target: Node | Node, validation: (node: Node | Node) => boolean | void): Node | Node {
		let current: Node | Node = target.previousSibling;
		while (current !== null) {
			if (validation(current) === true) {
				return current;
			} else {
				current = current.previousSibling;
			}
		}
		return null;
	}

	export function findAllSiblings(target: Node): Array<Node> {
		let siblings: Array<Node> = [];
		findPrevSibling(target, (node) => {
			siblings.push(node);
			return false;
		});
		findNextSibling(target, (node) => {
			siblings.push(node);
			return false;
		});
		return siblings;
	}


}
export default Helper.Dom;

