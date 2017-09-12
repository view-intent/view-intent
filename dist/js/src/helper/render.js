export var Render;
(function (Render) {
    // console.log("./view/render");
    var executing = false;
    var queuedList = [];
    var readyFunc = undefined;
    function async(callback) {
        // queuedList[queuedList.length] = callback;
        queuedList.push(callback);
        if (executing === false) {
            executing = true;
            requestAnimationFrame(function () {
                // setImmediate(() => {
                executing = true;
                // var length = queuedList.length;
                // console.time("rendering");
                for (var i = 0; i < queuedList.length; i++) {
                    queuedList[i]();
                }
                // console.timeEnd("rendering"); 
                queuedList = [];
                executing = false;
            });
        }
    }
    Render.async = async;
    // export function ready(callback: () => void) {
    // }
})(Render || (Render = {}));
//# sourceMappingURL=render.js.map