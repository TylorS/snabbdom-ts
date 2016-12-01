(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('util', ['exports'], factory) :
    (factory((global.util = global.util || {})));
}(this, (function (exports) { 'use strict';

function isDef(x) {
    return typeof x !== 'undefined';
}
function isUndef(x) {
    return typeof x === 'undefined';
}
function sameVNode(vNode1, vNode2) {
    return vNode1.key === vNode2.key && vNode1.sel === vNode2.sel;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var map = {};
    var key;
    for (var i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key))
            map[key] = i;
    }
    return map;
}

exports.isDef = isDef;
exports.isUndef = isUndef;
exports.sameVNode = sameVNode;
exports.createKeyToOldIdx = createKeyToOldIdx;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=util.js.map
