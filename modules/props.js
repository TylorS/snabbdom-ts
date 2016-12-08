function updateProps(oldVnode, vnode) {
    if (!oldVnode.data && !vnode.data)
        return;
    var key;
    var cur;
    var old;
    var elm = vnode.elm;
    var oldProps = oldVnode.data && oldVnode.data.props || {};
    var props = vnode.data && vnode.data.props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
export var PropsModule = {
    create: updateProps,
    update: updateProps
};
//# sourceMappingURL=props.js.map