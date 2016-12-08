import { SnabbdomVNode } from '../interfaces';
import is from '../is';
function addNS(data, children, selector) {
    data.ns = "http://www.w3.org/2000/svg";
    if (selector !== "foreignObject" && typeof children !== "undefined" && is.array(children)) {
        for (var i = 0; i < children.length; ++i) {
            addNS(children[i].data, children[i].children, children[i].tagName);
        }
    }
}
export var h = function (selector, b, c) {
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
//# sourceMappingURL=h.js.map