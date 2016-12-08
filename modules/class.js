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
export var ClassModule = {
    create: updateClass,
    update: updateClass
};
//# sourceMappingURL=class.js.map