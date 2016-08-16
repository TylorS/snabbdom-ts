(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('h', factory) :
    (global.h = factory());
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
            _super.call(this, selector, data, children, text, elm, key);
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

    function addNS(data, children, selector) {
        data.ns = "http://www.w3.org/2000/svg";
        if (selector !== "foreignObject" && typeof children !== "undefined" && is.array(children)) {
            for (var i = 0; i < children.length; ++i) {
                addNS(children[i].data, children[i].children, children[i].sel);
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
                    children[i] = VNode.createTextVNode(String(children[i]));
                }
            }
        }
        if (selector[0] === 's' && selector[1] === 'v' && selector[2] === 'g') {
            addNS(data, children, selector);
        }
        return VNode.create(selector, data, children, text, undefined, data && data.key);
    };

    return h;

})));
//# sourceMappingURL=h.js.map
