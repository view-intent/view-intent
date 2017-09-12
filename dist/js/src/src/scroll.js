// import DynamicEvents from "./dynamicEvent";
export var Scroll;
(function (Scroll) {
    Scroll.CurrentReleasedElement = null;
    Scroll.StoreY = {};
    Scroll.Changing = false;
    // methods ----------------
    function ReleaseElement(element, scrollY) {
        if (scrollY === void 0) { scrollY = null; }
        if (Scroll.CurrentReleasedElement !== null && Scroll.CurrentReleasedElement !== element) {
            FreezeElement(Scroll.CurrentReleasedElement);
        }
        if (element !== Scroll.CurrentReleasedElement) {
            Scroll.CurrentReleasedElement = element;
            var oldScrollY = (Scroll.StoreY[element.id] != undefined) ? (Scroll.StoreY[element.id]) : (0);
            // release -------------------------
            requestAnimationFrame(function () {
                document.body.style.height = "90000px";
                element.style.position = "absolute";
                element.style.top = "0";
                if (scrollY !== null) {
                    window.scrollTo(0, scrollY);
                }
                else {
                    window.scrollTo(0, oldScrollY);
                }
                document.body.style.height = "auto";
            });
        }
    }
    Scroll.ReleaseElement = ReleaseElement;
    function FreezeElement(element) {
        if (element === null) {
            return;
        }
        if (element === Scroll.CurrentReleasedElement) {
            Scroll.StoreY[element.id] = window.scrollY;
        }
        else {
            Scroll.StoreY[element.id] = 0;
        }
        requestAnimationFrame(function () {
            element.style.position = "fixed";
            element.style.top = "-" + Scroll.StoreY[element.id] + "px";
        });
    }
    Scroll.FreezeElement = FreezeElement;
    function RegisterElement(element, tisCurrentPage) {
        if (tisCurrentPage === void 0) { tisCurrentPage = false; }
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
            }
            else {
                FreezeElement(element);
            }
            // hover event ---------------
            RegisterUserEvents(element);
        }
    }
    Scroll.RegisterElement = RegisterElement;
    // events ------------------
    var BackupReleasedElement = null;
    function RegisterUserEvents(element) {
        function event(e) {
            //Changing = true;
            var el = e.currentTarget;
            if (el !== Scroll.CurrentReleasedElement) {
                BackupReleasedElement = Scroll.CurrentReleasedElement;
                ReleaseElement(el);
                //Changing = false;
            }
        }
        // element.addEventListener("touchstart", event, DynamicEvents.Passive());
        // element.addEventListener("mouseenter", event, DynamicEvents.Passive());
        // element.addEventListener("pointermove", event, DynamicEvents.Passive());
    }
    Scroll.RegisterUserEvents = RegisterUserEvents;
    function MapAllScrollElements() {
        var all = document.querySelectorAll(".dynamic-scroll");
        for (var i = 0; i < all.length; i++) {
            var el = all[i];
            RegisterElement(el);
        }
    }
    Scroll.MapAllScrollElements = MapAllScrollElements;
    function Initialize() {
        document.body.style.overflow = "hidden";
        document.body.style.overflowX = "hidden";
        document.body.style.overflowY = "scroll";
        // Map All Scroll Elements
        MapAllScrollElements();
    }
    Scroll.Initialize = Initialize;
})(Scroll || (Scroll = {}));
export default Scroll;
//# sourceMappingURL=scroll.js.map