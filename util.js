export function isDef(x) {
    return typeof x !== 'undefined';
}
export function isUndef(x) {
    return typeof x === 'undefined';
}
export function sameVNode(vNode1, vNode2) {
    return vNode1.key === vNode2.key && vNode1.tagName === vNode2.tagName;
}
export function createKeyToOldIdx(children, beginIdx, endIdx) {
    var map = {};
    var key;
    for (var i = beginIdx; i <= endIdx; ++i) {
        key = children[i].key;
        if (isDef(key))
            map[key] = i;
    }
    return map;
}
//# sourceMappingURL=util.js.map