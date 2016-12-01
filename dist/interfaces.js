(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('interfaces', ['exports'], factory) :
    (factory((global.interfaces = global.interfaces || {})));
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

exports.VNode = VNode;
exports.Thunk = Thunk;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=interfaces.js.map
