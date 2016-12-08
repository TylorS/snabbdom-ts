(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('h', ['exports'], factory) :
    (factory((global.h = global.h || {})));
}(this, (function (exports) { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var SnabbdomVNode = (function () {
    function SnabbdomVNode(tagName, className, id, data, children, text, elm, key) {
        this.tagName = tagName;
        this.className = className;
        this.id = id;
        this.data = data;
        this.children = children;
        this.text = text;
        this.elm = elm;
        this.key = key;
    }
    SnabbdomVNode.createTextVNode = function (text) {
        return new SnabbdomVNode(undefined, undefined, undefined, undefined, undefined, text, undefined, undefined);
    };
    return SnabbdomVNode;
}());
var Thunk = (function (_super) {
    __extends(Thunk, _super);
    function Thunk(tagName, className, id, data, children, text, elm, key) {
        return _super.call(this, tagName, className, id, data, children, text, elm, key) || this;
    }
    return Thunk;
}(SnabbdomVNode));

var is = {
    array: Array.isArray,
    primitive: function (x) {
        return typeof x === 'string' || typeof x === 'number';
    }
};

function addNS(data, children, selector) {
    data.ns = "http://www.w3.org/2000/svg";
    if (selector !== "foreignObject" && typeof children !== "undefined" && is.array(children)) {
        for (var i = 0; i < children.length; ++i) {
            addNS(children[i].data, children[i].children, children[i].tagName);
        }
    }
}
var h = function (selector, b, c) {
    var data = {};
    var children;
    var text;
    var i;
    if (arguments.length === 3) {
        data = b;
        if (is.array(c)) {
            children = c;
        }
        else if (is.primitive(c)) {
            text = String(c);
        }
    }
    else if (arguments.length === 2) {
        if (is.array(b)) {
            children = b;
        }
        else if (is.primitive(b)) {
            text = String(b);
        }
        else {
            data = b;
        }
    }
    if (is.array(children)) {
        children = children.filter(Boolean);
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i])) {
                children[i] = SnabbdomVNode.createTextVNode(String(children[i]));
            }
        }
    }
    var _a = parseSelector(selector), tagName = _a.tagName, id = _a.id, className = _a.className;
    if (tagName === 'svg') {
        addNS(data, children, tagName);
    }
    return new SnabbdomVNode(tagName, className, id, data, children, text, undefined, data && data.key);
};
function parseSelector(sel) {
    // Parse selector
    var hashIdx = sel.indexOf('#');
    var dotIdx = sel.indexOf('.', hashIdx);
    var hash = hashIdx > 0 ? hashIdx : sel.length;
    var dot = dotIdx > 0 ? dotIdx : sel.length;
    var tagName = hashIdx !== -1 || dotIdx !== -1
        ? sel.slice(0, Math.min(hash, dot))
        : sel;
    var id = sel.slice(hash + 1, dot) || void 0;
    var className = dotIdx < sel.length && dotIdx > 0
        ? sel.slice(dot + 1).replace(/\./g, ' ')
        : void 0;
    return {
        tagName: tagName,
        id: id,
        className: className,
    };
}

exports.h = h;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=h.js.map
