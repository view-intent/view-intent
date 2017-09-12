export var Helper;
(function (Helper) {
    var Is;
    (function (Is) {
        function nullOrUndefined(value) {
            if (value === undefined || value === null) {
                return true;
            }
            else {
                return false;
            }
        }
        Is.nullOrUndefined = nullOrUndefined;
        function empty(value) {
            if (value === undefined || value === null || value === "") {
                return true;
            }
            else {
                return false;
            }
        }
        Is.empty = empty;
    })(Is = Helper.Is || (Helper.Is = {}));
})(Helper || (Helper = {}));
export default Helper.Is;
//# sourceMappingURL=is.js.map