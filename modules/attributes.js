var booleanAttrs = [
    'allowfullscreen', 'async', 'autofocus', 'autoplay', 'checked', 'compact', 'controls', 'declare',
    'default', 'defaultchecked', 'defaultmuted', 'defaultselected', 'defer', 'disabled', 'draggable',
    'enabled', 'formnovalidate', 'hidden', 'indeterminate', 'inert', 'ismap', 'itemscope', 'loop', 'multiple',
    'muted', 'nohref', 'noresize', 'noshade', 'novalidate', 'nowrap', 'open', 'pauseonexit', 'readonly',
    'required', 'reversed', 'scoped', 'seamless', 'selected', 'sortable', 'spellcheck', 'translate',
    'truespeed', 'typemustmatch', 'visible'
];
var booleanAttrsDict = {};
for (var i = 0, len = booleanAttrs.length; i < len; i++) {
    booleanAttrsDict[booleanAttrs[i]] = true;
}
function updateAttrs(oldVnode, vnode) {
    var key;
    var cur;
    var old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data && oldVnode.data.attrs || {};
    var attrs = vnode.data && vnode.data.attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        cur = attrs[key];
        old = oldAttrs[key];
        if (old !== cur) {
            // TODO: add support to namespaced attributes (setAttributeNS)
            if (!cur && booleanAttrsDict[key]) {
                elm.removeAttribute(key);
            }
            else {
                elm.setAttribute(key, cur);
            }
        }
    }
    //remove removed attributes
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
export var AttrsModule = {
    update: updateAttrs,
    create: updateAttrs,
};
//# sourceMappingURL=attributes.js.map