(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('index', ['exports'], factory) :
    (factory((global.index = global.index || {})));
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
var a = hh('a');
var abbr = hh('abbr');
var acronym = hh('acronym');
var address = hh('address');
var applet = hh('applet');
var area = hh('area');
var article = hh('article');
var aside = hh('aside');
var audio = hh('audio');
var b = hh('b');
var base = hh('base');
var basefont = hh('basefont');
var bdi = hh('bdi');
var bdo = hh('bdo');
var bgsound = hh('bgsound');
var big = hh('big');
var blink = hh('blink');
var blockquote = hh('blockquote');
var body = hh('body');
var br = hh('br');
var button = hh('button');
var canvas = hh('canvas');
var caption = hh('caption');
var center = hh('center');
var cite = hh('cite');
var code = hh('code');
var col = hh('col');
var colgroup = hh('colgroup');
var command = hh('command');
var content = hh('content');
var data = hh('data');
var datalist = hh('datalist');
var dd = hh('dd');
var del = hh('del');
var details = hh('details');
var dfn = hh('dfn');
var dialog = hh('dialog');
var dir = hh('dir');
var div = hh('div');
var dl = hh('dl');
var dt = hh('dt');
var element = hh('element');
var em = hh('em');
var embed = hh('embed');
var fieldset = hh('fieldset');
var figcaption = hh('figcaption');
var figure = hh('figure');
var font = hh('font');
var footer = hh('footer');
var form = hh('form');
var frame = hh('frame');
var frameset = hh('frameset');
var h1 = hh('h1');
var h2 = hh('h2');
var h3 = hh('h3');
var h4 = hh('h4');
var h5 = hh('h5');
var h6 = hh('h6');
var head = hh('head');
var header = hh('header');
var hgroup = hh('hgroup');
var hr = hh('hr');
var html = hh('html');
var ins = hh('ins');
var isindex = hh('isindex');
var kbd = hh('kbd');
var keygen = hh('keygen');
var label = hh('label');
var legend = hh('legend');
var li = hh('li');
var link = hh('link');
var listing = hh('listing');
var main = hh('main');
var map = hh('map');
var mark = hh('mark');
var marquee = hh('marquee');
var math = hh('math');
var menu = hh('menu');
var menuitem = hh('menuitem');
var meta = hh('meta');
var meter = hh('meter');
var multicol = hh('multicol');
var nav = hh('nav');
var nextid = hh('nextid');
var nobr = hh('nobr');
var noembed = hh('noembed');
var noframes = hh('noframes');
var noscript = hh('noscript');
var object = hh('object');
var ol = hh('ol');
var optgroup = hh('optgroup');
var option = hh('option');
var output = hh('output');
var p = hh('p');
var param = hh('param');
var picture = hh('picture');
var plaintext = hh('plaintext');
var pre = hh('pre');
var progress = hh('progress');
var q = hh('q');
var rb = hh('rb');
var rbc = hh('rbc');
var rp = hh('rp');
var rt = hh('rt');
var rtc = hh('rtc');
var ruby = hh('ruby');
var s = hh('s');
var samp = hh('samp');
var script = hh('script');
var section = hh('section');
var select = hh('select');
var shadow = hh('shadow');
var small = hh('small');
var source = hh('source');
var spacer = hh('spacer');
var span = hh('span');
var strike = hh('strike');
var strong = hh('strong');
var style = hh('style');
var sub = hh('sub');
var summary = hh('summary');
var sup = hh('sup');
var table = hh('table');
var tbody = hh('tbody');
var td = hh('td');
var template = hh('template');
var textarea = hh('textarea');
var tfoot = hh('tfoot');
var th = hh('th');
var tr = hh('tr');
var track = hh('track');
var tt = hh('tt');
var u = hh('u');
var ul = hh('ul');
var video = hh('video');
var wbr = hh('wbr');
var xmp = hh('xmp');

function hh$1(tagName) {
    return function helper(selector, data, children) {
        return isSelector$1(selector)
            ? h(tagName + selector, data, children)
            : h(tagName, selector, data);
    };
}
function isValidString$1(param) {
    return typeof param === 'string' && param.length > 0;
}
function isSelector$1(param) {
    return isValidString$1(param) && (param[0] === '.' || param[0] === '#');
}
function createSVGHelper() {
    var svg = hh$1('svg');
    svg.a = hh$1('a');
    svg.altGlyph = hh$1('altGlyph');
    svg.altGlyphDef = hh$1('altGlyphDef');
    svg.altGlyphItem = hh$1('altGlyphItem');
    svg.animate = hh$1('animate');
    svg.animateColor = hh$1('animateColor');
    svg.animateMotion = hh$1('animateMotion');
    svg.animateTransform = hh$1('animateTransform');
    svg.circle = hh$1('circle');
    svg.clipPath = hh$1('clipPath');
    svg.colorProfile = hh$1('colorProfile');
    svg.cursor = hh$1('cursor');
    svg.defs = hh$1('defs');
    svg.desc = hh$1('desc');
    svg.ellipse = hh$1('ellipse');
    svg.feBlend = hh$1('feBlend');
    svg.feColorMatrix = hh$1('feColorMatrix');
    svg.feComponentTransfer = hh$1('feComponentTransfer');
    svg.feComposite = hh$1('feComposite');
    svg.feConvolveMatrix = hh$1('feConvolveMatrix');
    svg.feDiffuseLighting = hh$1('feDiffuseLighting');
    svg.feDisplacementMap = hh$1('feDisplacementMap');
    svg.feDistantLight = hh$1('feDistantLight');
    svg.feFlood = hh$1('feFlood');
    svg.feFuncA = hh$1('feFuncA');
    svg.feFuncB = hh$1('feFuncB');
    svg.feFuncG = hh$1('feFuncG');
    svg.feFuncR = hh$1('feFuncR');
    svg.feGaussianBlur = hh$1('feGaussianBlur');
    svg.feImage = hh$1('feImage');
    svg.feMerge = hh$1('feMerge');
    svg.feMergeNode = hh$1('feMergeNode');
    svg.feMorphology = hh$1('feMorphology');
    svg.feOffset = hh$1('feOffset');
    svg.fePointLight = hh$1('fePointLight');
    svg.feSpecularLighting = hh$1('feSpecularLighting');
    svg.feSpotlight = hh$1('feSpotlight');
    svg.feTile = hh$1('feTile');
    svg.feTurbulence = hh$1('feTurbulence');
    svg.filter = hh$1('filter');
    svg.font = hh$1('font');
    svg.fontFace = hh$1('fontFace');
    svg.fontFaceFormat = hh$1('fontFaceFormat');
    svg.fontFaceName = hh$1('fontFaceName');
    svg.fontFaceSrc = hh$1('fontFaceSrc');
    svg.fontFaceUri = hh$1('fontFaceUri');
    svg.foreignObject = hh$1('foreignObject');
    svg.g = hh$1('g');
    svg.glyph = hh$1('glyph');
    svg.glyphRef = hh$1('glyphRef');
    svg.hkern = hh$1('hkern');
    svg.image = hh$1('image');
    svg.linearGradient = hh$1('linearGradient');
    svg.marker = hh$1('marker');
    svg.mask = hh$1('mask');
    svg.metadata = hh$1('metadata');
    svg.missingGlyph = hh$1('missingGlyph');
    svg.mpath = hh$1('mpath');
    svg.path = hh$1('path');
    svg.pattern = hh$1('pattern');
    svg.polygon = hh$1('polygon');
    svg.polyline = hh$1('polyline');
    svg.radialGradient = hh$1('radialGradient');
    svg.rect = hh$1('rect');
    svg.script = hh$1('script');
    svg.set = hh$1('set');
    svg.stop = hh$1('stop');
    svg.style = hh$1('style');
    svg.switch = hh$1('switch');
    svg.symbol = hh$1('symbol');
    svg.text = hh$1('text');
    svg.textPath = hh$1('textPath');
    svg.title = hh$1('title');
    svg.tref = hh$1('tref');
    svg.tspan = hh$1('tspan');
    svg.use = hh$1('use');
    svg.view = hh$1('view');
    svg.vkern = hh$1('vkern');
    return svg;
}
var svg = createSVGHelper();

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
    return vNode1.key === vNode2.key && vNode1.tagName === vNode2.tagName;
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
        return new SnabbdomVNode(api.tagName(elm).toLowerCase(), elm.className, elm.id, {}, [], undefined, elm, undefined);
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
        var tagName = vnode.tagName;
        if (isDef(tagName)) {
            elm = vnode.elm = isDef(data) && isDef(i = data.ns)
                ? api.createElementNS(i, tagName)
                : api.createElement(tagName);
            if (vnode.id)
                elm.id = vnode.id;
            if (vnode.className)
                elm.className = vnode.className;
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
                if (isDef(ch.tagName)) {
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
        if (isUndef(oldVNode.elm)) {
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

exports.SnabbdomVNode = SnabbdomVNode;
exports.Thunk = Thunk;
exports.h = h;
exports.a = a;
exports.abbr = abbr;
exports.acronym = acronym;
exports.address = address;
exports.applet = applet;
exports.area = area;
exports.article = article;
exports.aside = aside;
exports.audio = audio;
exports.b = b;
exports.base = base;
exports.basefont = basefont;
exports.bdi = bdi;
exports.bdo = bdo;
exports.bgsound = bgsound;
exports.big = big;
exports.blink = blink;
exports.blockquote = blockquote;
exports.body = body;
exports.br = br;
exports.button = button;
exports.canvas = canvas;
exports.caption = caption;
exports.center = center;
exports.cite = cite;
exports.code = code;
exports.col = col;
exports.colgroup = colgroup;
exports.command = command;
exports.content = content;
exports.data = data;
exports.datalist = datalist;
exports.dd = dd;
exports.del = del;
exports.details = details;
exports.dfn = dfn;
exports.dialog = dialog;
exports.dir = dir;
exports.div = div;
exports.dl = dl;
exports.dt = dt;
exports.element = element;
exports.em = em;
exports.embed = embed;
exports.fieldset = fieldset;
exports.figcaption = figcaption;
exports.figure = figure;
exports.font = font;
exports.footer = footer;
exports.form = form;
exports.frame = frame;
exports.frameset = frameset;
exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;
exports.head = head;
exports.header = header;
exports.hgroup = hgroup;
exports.hr = hr;
exports.html = html;
exports.ins = ins;
exports.isindex = isindex;
exports.kbd = kbd;
exports.keygen = keygen;
exports.label = label;
exports.legend = legend;
exports.li = li;
exports.link = link;
exports.listing = listing;
exports.main = main;
exports.map = map;
exports.mark = mark;
exports.marquee = marquee;
exports.math = math;
exports.menu = menu;
exports.menuitem = menuitem;
exports.meta = meta;
exports.meter = meter;
exports.multicol = multicol;
exports.nav = nav;
exports.nextid = nextid;
exports.nobr = nobr;
exports.noembed = noembed;
exports.noframes = noframes;
exports.noscript = noscript;
exports.object = object;
exports.ol = ol;
exports.optgroup = optgroup;
exports.option = option;
exports.output = output;
exports.p = p;
exports.param = param;
exports.picture = picture;
exports.plaintext = plaintext;
exports.pre = pre;
exports.progress = progress;
exports.q = q;
exports.rb = rb;
exports.rbc = rbc;
exports.rp = rp;
exports.rt = rt;
exports.rtc = rtc;
exports.ruby = ruby;
exports.s = s;
exports.samp = samp;
exports.script = script;
exports.section = section;
exports.select = select;
exports.shadow = shadow;
exports.small = small;
exports.source = source;
exports.spacer = spacer;
exports.span = span;
exports.strike = strike;
exports.strong = strong;
exports.style = style;
exports.sub = sub;
exports.summary = summary;
exports.sup = sup;
exports.table = table;
exports.tbody = tbody;
exports.td = td;
exports.template = template;
exports.textarea = textarea;
exports.tfoot = tfoot;
exports.th = th;
exports.tr = tr;
exports.track = track;
exports.tt = tt;
exports.u = u;
exports.ul = ul;
exports.video = video;
exports.wbr = wbr;
exports.xmp = xmp;
exports.svg = svg;
exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=snabbdom.js.map
