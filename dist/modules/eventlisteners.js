(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('eventlisteners', ['exports'], factory) :
    (factory((global.eventlisteners = global.eventlisteners || {})));
}(this, (function (exports) { 'use strict';

var is = {
    array: Array.isArray,
    primitive: function (x) {
        return typeof x === 'string' || typeof x === 'number';
    }
};

function arrInvoker(arr) {
    return function () {
        if (!arr.length)
            return;
        // Special case when length is two, for performance
        arr.length === 2 ? arr[0](arr[1]) : arr[0].apply(undefined, arr.slice(1));
    };
}
function fnInvoker(o) {
    return function (ev) {
        if (o.fn === null)
            return;
        o.fn(ev);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var name;
    var cur;
    var old;
    var elm = vnode.elm;
    var oldOn = oldVnode.data && oldVnode.data.on;
    var on = vnode.data && vnode.data.on;
    if (!on && !oldOn)
        return;
    on = on || {};
    oldOn = oldOn || {};
    for (name in on) {
        cur = on[name];
        old = oldOn[name];
        if (old === undefined) {
            if (is.array(cur)) {
                elm.addEventListener(name, arrInvoker(cur));
            }
            else {
                cur = { fn: cur };
                on[name] = cur;
                elm.addEventListener(name, fnInvoker(cur));
            }
        }
        else if (is.array(old)) {
            // Deliberately modify old array since it's captured in closure created with `arrInvoker`
            old.length = cur.length;
            for (var i = 0; i < old.length; ++i)
                old[i] = cur[i];
            on[name] = old;
        }
        else {
            old.fn = cur;
            on[name] = old;
        }
    }
    if (oldOn) {
        for (name in oldOn) {
            if (on[name] === undefined) {
                old = oldOn[name];
                if (is.array(old)) {
                    old.length = 0;
                }
                else {
                    old.fn = null;
                }
            }
        }
    }
}
var EventListenerModule = {
    create: updateEventListeners,
    update: updateEventListeners
};

exports.EventListenerModule = EventListenerModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=eventlisteners.js.map
