(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('style', factory) :
    (global.style = factory());
}(this, (function () { 'use strict';

var raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout;
var nextFrame = function nextFrame(fn) { raf(function () { raf(fn); }); };
function setNextFrame(obj, prop, val) {
    nextFrame(function () { obj[prop] = val; });
}
function updateStyle(oldVnode, vnode) {
    if (!vnode.data && !oldVnode.data)
        return;
    var cur;
    var name;
    var elm = vnode.elm;
    var oldStyle = oldVnode.data && oldVnode.data.style || {};
    var style = vnode.data && vnode.data.style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            elm.style[name] = '';
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed') {
            for (name in style.delayed) {
                cur = style.delayed[name];
                if (!oldHasDel || cur !== oldStyle.delayed[name]) {
                    setNextFrame(elm.style, name, cur);
                }
            }
        }
        else if (name !== 'remove' && cur !== oldStyle[name]) {
            elm.style[name] = cur;
        }
    }
}
function applyDestroyStyle(vnode) {
    var style;
    var name;
    var elm = vnode.elm;
    var s = vnode.data && vnode.data.style;
    if (!s || !(style = s.destroy))
        return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode && vnode.data && vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name;
    var elm = vnode.elm;
    if (!elm)
        return;
    var i = 0;
    var compStyle;
    var style = s.remove;
    var amount = 0;
    var applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1)
            amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm)
            --amount;
        if (amount === 0)
            rm();
    });
}
var StyleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};

return StyleModule;

})));
//# sourceMappingURL=style.js.map
