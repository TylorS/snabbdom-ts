(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('class', factory) :
    (global.class = factory());
}(this, (function () { 'use strict';

function updateClass(oldVnode, vnode) {
    var cur;
    var name;
    var elm = vnode.elm;
    var oldClass = oldVnode.data && oldVnode.data.class || {};
    var klass = vnode.data && vnode.data.class || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            if (cur) {
                elm.classList.add(name);
            }
            else {
                elm.classList.remove(name);
            }
        }
    }
}
var ClassModule = {
    create: updateClass,
    update: updateClass
};

return ClassModule;

})));
//# sourceMappingURL=class.js.map
