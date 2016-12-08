var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
export { SnabbdomVNode };
var Thunk = (function (_super) {
    __extends(Thunk, _super);
    function Thunk(tagName, className, id, data, children, text, elm, key) {
        return _super.call(this, tagName, className, id, data, children, text, elm, key) || this;
    }
    return Thunk;
}(SnabbdomVNode));
export { Thunk };
/* tslint:enable:max-line-length */
//# sourceMappingURL=interfaces.js.map