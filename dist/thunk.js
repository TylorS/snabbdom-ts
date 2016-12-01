(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('thunk', factory) :
    (global.thunk = factory());
}(this, (function () { 'use strict';

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

function copyToThunk(vNode, thunk) {
    thunk.elm = vNode.elm;
    if (!vNode.data) {
        vNode.data = {};
    }
    vNode.data.fn = thunk.data.fn;
    vNode.data.args = thunk.data.args;
    thunk.data = vNode.data;
    thunk.children = vNode.children;
    thunk.text = vNode.text;
    thunk.elm = vNode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vNode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vNode, thunk);
}
function prepatch(oldVnode, thunk) {
    var old = oldVnode.data;
    var cur = thunk.data;
    var oldArgs = old ? old.args : [];
    var args = cur.args;
    if (old && old.fn !== cur.fn || oldArgs && oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
    }
    for (var i = 0; i < args.length; ++i) {
        if (oldArgs && oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
var thunk = function thunk(selector, key, render) {
    var state = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        state[_i - 3] = arguments[_i];
    }
    return Thunk.create(selector, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: render,
        args: state
    }, undefined, undefined, undefined, key);
};

return thunk;

})));
//# sourceMappingURL=thunk.js.map
