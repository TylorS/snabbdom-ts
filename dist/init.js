(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('init', ['exports'], factory) :
    (factory((global.init = global.init || {})));
}(this, (function (exports) { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var VNode = (function () {
    function VNode(selector, data, children, text, elm, key) {
        this.sel = selector;
        this.data = data;
        this.children = children;
        this.text = text;
        this.elm = elm;
        this.key = key;
    }
    VNode.create = function (selector, data, children, text, elm, key) {
        return new VNode(selector, data, children, text, elm, key);
    };
    VNode.createTextVNode = function (text) {
        return new VNode(undefined, undefined, undefined, text, undefined, undefined);
    };
    return VNode;
}());
var Thunk = (function (_super) {
    __extends(Thunk, _super);
    function Thunk(selector, data, children, text, elm, key) {
        return _super.call(this, selector, data, children, text, elm, key) || this;
    }
    Thunk.create = function (selector, data, children, text, elm, key) {
        return new Thunk(selector, data, children, text, elm, key);
    };
    return Thunk;
}(VNode));

var is = {
    array: Array.isArray,
    primitive: function (x) {
        return typeof x === 'string' || typeof x === 'number';
    }
};

function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    if (node === void 0) {
        return;
    }
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentElement;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(node) {
    return node.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
var HTMLDOMAPI = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent
};

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

var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
function init(modules, api) {
    var i;
    var j;
    var cbs = {};
    if (isUndef(api))
        api = HTMLDOMAPI;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (isDef(hook))
                cbs[hooks[i]].push(hook);
        }
    }
    function emptyNodeAt(elm) {
        return VNode.create(api.tagName(elm).toLowerCase(), {}, [], undefined, elm, undefined);
    }
    function createRmCb(childElm, listeners) {
        return function () {
            if (--listeners === 0) {
                var parent = api.parentNode(childElm);
                api.removeChild(parent, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i;
        var data = vnode.data;
        if (isDef(data)) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var elm;
        var children = vnode.children;
        var sel = vnode.sel;
        if (isDef(sel)) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            elm = vnode.elm = isDef(data) && isDef(i = data.ns)
                ? api.createElementNS(i, tag)
                : api.createElement(tag);
            if (hash < dot)
                elm.id = sel.slice(hash + 1, dot);
            if (dotIdx > 0)
                elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
            if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    api.appendChild(elm, createElm(children[i], insertedVnodeQueue));
                }
            }
            else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            for (i = 0; i < cbs.create.length; ++i)
                cbs.create[i](sameVNode, vnode);
            i = vnode.data && vnode.data.hook; // Reuse letiable
            if (isDef(i)) {
                if (i.create)
                    i.create(sameVNode, vnode);
                if (i.insert)
                    insertedVnodeQueue.push(vnode);
            }
        }
        else {
            elm = vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            api.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
        }
    }
    function invokeDestroyHook(vnode) {
        var i;
        var j;
        var data = vnode.data;
        if (isDef(data)) {
            if (isDef(i = data.hook) && isDef(i = i.destroy))
                i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i)
                cbs.destroy[i](vnode);
            if (isDef(i = vnode.children)) {
                for (j = 0; j < vnode.children.length; ++j) {
                    invokeDestroyHook(vnode.children[j]);
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var i_1 = void 0;
            var listeners = void 0;
            var rm = void 0;
            var ch = vnodes[startIdx];
            if (isDef(ch)) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
                        cbs.remove[i_1](ch, rm);
                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
                        i_1(ch, rm);
                    }
                    else {
                        rm();
                    }
                }
                else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0, newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx = undefined;
        var idxInOld;
        var elmToMove;
        var before;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (isUndef(oldStartVnode)) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
            }
            else if (isUndef(oldEndVnode)) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (sameVNode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (sameVNode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVNode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (sameVNode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                if (isUndef(oldKeyToIdx))
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    elmToMove = oldCh[idxInOld];
                    patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                    oldCh[idxInOld] = void 0;
                    var newNode = elmToMove.elm;
                    var referenceNode = oldStartVnode.elm;
                    if (newNode !== referenceNode)
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i;
        var hook;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm, oldCh = oldVnode.children, ch = vnode.children;
        if (oldVnode === vnode)
            return;
        if (!sameVNode(oldVnode, vnode)) {
            var parentElm = api.parentNode(oldVnode.elm);
            elm = createElm(vnode, insertedVnodeQueue);
            api.insertBefore(parentElm, elm, oldVnode.elm);
            removeVnodes(parentElm, [oldVnode], 0, 0);
            return;
        }
        if (isDef(vnode.data)) {
            for (i = 0; i < cbs.update.length; ++i)
                cbs.update[i](oldVnode, vnode);
            i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update))
                i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch)
                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            }
            else if (isDef(ch)) {
                if (isDef(oldVnode.text))
                    api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            }
            else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            }
            else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        }
        else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVNode, vNode) {
        var elm;
        var parent;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i)
            cbs.pre[i]();
        if (isUndef(oldVNode.sel)) {
            oldVNode = emptyNodeAt(oldVNode);
        }
        if (sameVNode(oldVNode, vNode)) {
            patchVnode(oldVNode, vNode, insertedVnodeQueue);
        }
        else {
            elm = oldVNode.elm;
            parent = api.parentNode(elm);
            createElm(vNode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vNode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVNode], 0, 0);
            }
        }
        for (var i_2 = 0; i_2 < insertedVnodeQueue.length; ++i_2) {
            insertedVnodeQueue[i_2].data.hook.insert(insertedVnodeQueue[i_2]);
        }
        for (var i_3 = 0; i_3 < cbs.post.length; ++i_3)
            cbs.post[i_3]();
        return vNode;
    };
}

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=init.js.map
