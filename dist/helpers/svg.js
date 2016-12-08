(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('svg', ['exports'], factory) :
    (factory((global.svg = global.svg || {})));
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

function hh(tagName) {
    return function helper(selector, data, children) {
        return isSelector(selector)
            ? h(tagName + selector, data, children)
            : h(tagName, selector, data);
    };
}
function isValidString(param) {
    return typeof param === 'string' && param.length > 0;
}
function isSelector(param) {
    return isValidString(param) && (param[0] === '.' || param[0] === '#');
}
function createSVGHelper() {
    var svg = hh('svg');
    svg.a = hh('a');
    svg.altGlyph = hh('altGlyph');
    svg.altGlyphDef = hh('altGlyphDef');
    svg.altGlyphItem = hh('altGlyphItem');
    svg.animate = hh('animate');
    svg.animateColor = hh('animateColor');
    svg.animateMotion = hh('animateMotion');
    svg.animateTransform = hh('animateTransform');
    svg.circle = hh('circle');
    svg.clipPath = hh('clipPath');
    svg.colorProfile = hh('colorProfile');
    svg.cursor = hh('cursor');
    svg.defs = hh('defs');
    svg.desc = hh('desc');
    svg.ellipse = hh('ellipse');
    svg.feBlend = hh('feBlend');
    svg.feColorMatrix = hh('feColorMatrix');
    svg.feComponentTransfer = hh('feComponentTransfer');
    svg.feComposite = hh('feComposite');
    svg.feConvolveMatrix = hh('feConvolveMatrix');
    svg.feDiffuseLighting = hh('feDiffuseLighting');
    svg.feDisplacementMap = hh('feDisplacementMap');
    svg.feDistantLight = hh('feDistantLight');
    svg.feFlood = hh('feFlood');
    svg.feFuncA = hh('feFuncA');
    svg.feFuncB = hh('feFuncB');
    svg.feFuncG = hh('feFuncG');
    svg.feFuncR = hh('feFuncR');
    svg.feGaussianBlur = hh('feGaussianBlur');
    svg.feImage = hh('feImage');
    svg.feMerge = hh('feMerge');
    svg.feMergeNode = hh('feMergeNode');
    svg.feMorphology = hh('feMorphology');
    svg.feOffset = hh('feOffset');
    svg.fePointLight = hh('fePointLight');
    svg.feSpecularLighting = hh('feSpecularLighting');
    svg.feSpotlight = hh('feSpotlight');
    svg.feTile = hh('feTile');
    svg.feTurbulence = hh('feTurbulence');
    svg.filter = hh('filter');
    svg.font = hh('font');
    svg.fontFace = hh('fontFace');
    svg.fontFaceFormat = hh('fontFaceFormat');
    svg.fontFaceName = hh('fontFaceName');
    svg.fontFaceSrc = hh('fontFaceSrc');
    svg.fontFaceUri = hh('fontFaceUri');
    svg.foreignObject = hh('foreignObject');
    svg.g = hh('g');
    svg.glyph = hh('glyph');
    svg.glyphRef = hh('glyphRef');
    svg.hkern = hh('hkern');
    svg.image = hh('image');
    svg.linearGradient = hh('linearGradient');
    svg.marker = hh('marker');
    svg.mask = hh('mask');
    svg.metadata = hh('metadata');
    svg.missingGlyph = hh('missingGlyph');
    svg.mpath = hh('mpath');
    svg.path = hh('path');
    svg.pattern = hh('pattern');
    svg.polygon = hh('polygon');
    svg.polyline = hh('polyline');
    svg.radialGradient = hh('radialGradient');
    svg.rect = hh('rect');
    svg.script = hh('script');
    svg.set = hh('set');
    svg.stop = hh('stop');
    svg.style = hh('style');
    svg.switch = hh('switch');
    svg.symbol = hh('symbol');
    svg.text = hh('text');
    svg.textPath = hh('textPath');
    svg.title = hh('title');
    svg.tref = hh('tref');
    svg.tspan = hh('tspan');
    svg.use = hh('use');
    svg.view = hh('view');
    svg.vkern = hh('vkern');
    return svg;
}
var svg = createSVGHelper();

exports.svg = svg;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=svg.js.map
