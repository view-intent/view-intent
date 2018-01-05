import * as $ from "jquery";
// import DynamicEvents from "./dynamicEvent";

export module Scroll {
	export var CurrentReleasedElement: HTMLElement = null;

	export var StoreY: { [elementId: string]: number } = {};
	export var Changing: boolean = false;

	// methods ----------------
	export function ReleaseElement(element: HTMLElement, scrollY: number | null = null) {
		if (CurrentReleasedElement !== null && CurrentReleasedElement !== element) {
			FreezeElement(CurrentReleasedElement);
		}
		if (element !== CurrentReleasedElement) {
			CurrentReleasedElement = element;
			var oldScrollY: number = (StoreY[element.id] != undefined) ? (StoreY[element.id]) : (0);
			// release -------------------------
			requestAnimationFrame(() => {
				document.body.style.height = "90000px";
				element.style.position = "absolute";
				element.style.top = "0";
				if (scrollY !== null) {
					window.scrollTo(0, scrollY);
				} else {
					window.scrollTo(0, oldScrollY);
				}
				document.body.style.height = "auto";
			});
		}
	}
	export function FreezeElement(element: HTMLElement) {
		if (element === null) { return; }
		if (element === CurrentReleasedElement) {
			StoreY[element.id] = window.scrollY;
		} else {
			StoreY[element.id] = 0;
		}
		requestAnimationFrame(() => {
			element.style.position = "fixed";
			element.style.top = "-" + StoreY[element.id] + "px";
		});
	}
	export function RegisterElement(element: HTMLElement, tisCurrentPage: boolean = false) {
		if (element.hasAttribute("data-dynamic-scroll") === false) {
			element.setAttribute("data-dynamic-scroll", "true");
			element.classList.add("dynamic-scroll");
			//element.style.width = "100%";
			element.style.minHeight = "100%";
			element.style.overflow = "hidden";
			//element.style.boxSizing = "border-box";
			element.style.backfaceVisibility = "hidden";
			if (tisCurrentPage) {
				ReleaseElement(element);
			} else {
				FreezeElement(element);
			}
			// hover event ---------------
			RegisterUserEvents(element);

		}
	}

	// events ------------------
	var BackupReleasedElement: HTMLElement = null;
	export function RegisterUserEvents(element: HTMLElement) {
		function event(e: Event) {
			//Changing = true;
			var el: HTMLElement = e.currentTarget as HTMLElement;
			if (el !== CurrentReleasedElement) {
				BackupReleasedElement = CurrentReleasedElement;
				ReleaseElement(el);
				//Changing = false;
			}

		}
		// element.addEventListener("touchstart", event, DynamicEvents.Passive());

		// element.addEventListener("mouseenter", event, DynamicEvents.Passive());

		// element.addEventListener("pointermove", event, DynamicEvents.Passive());



	}


	export function MapAllScrollElements() {
		var all = document.querySelectorAll(".dynamic-scroll");
		for (var i = 0; i < all.length; i++) {
			let el = all[i] as HTMLElement;
			RegisterElement(el);
		}
	}


	export function Initialize() {
		document.body.style.overflow = "hidden";
		document.body.style.overflowX = "hidden";
		document.body.style.overflowY = "scroll";
		// Map All Scroll Elements
		MapAllScrollElements();


	}
}
export default Scroll;