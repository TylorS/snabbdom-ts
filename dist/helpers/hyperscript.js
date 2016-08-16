(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('hyperscript', ['exports'], factory) :
    (factory((global.hyperscript = global.hyperscript || {})));
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

    function isValidString(param) {
        return typeof param === 'string' && param.length > 0;
    }
    function isSelector(param) {
        return isValidString(param) && (param[0] === '.' || param[0] === '#');
    }
    function hh(tagName) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var first = args[0], b = args[1], c = args[2];
            if (isSelector(first)) {
                if (b !== void 0 && c !== void 0) {
                    return h(tagName + first, b, c);
                }
                else if (b !== void 0) {
                    return h(tagName + first, b);
                }
                else {
                    return h(tagName + first, {});
                }
            }
            else if (!!b) {
                return h(tagName, first, b);
            }
            else if (!!first) {
                return h(tagName, first);
            }
            else {
                return h(tagName, {});
            }
        };
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
    var i = hh('i');
    var iframe = hh('iframe');
    var image = hh('image');
    var img = hh('img');
    var input = hh('input');
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
    var thead = hh('thead');
    var time = hh('time');
    var title = hh('title');
    var tr = hh('tr');
    var track = hh('track');
    var tt = hh('tt');
    var u = hh('u');
    var ul = hh('ul');
    var video = hh('video');
    var wbr = hh('wbr');
    var xmp = hh('xmp');
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

    exports.hh = hh;
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
    exports.i = i;
    exports.iframe = iframe;
    exports.image = image;
    exports.img = img;
    exports.input = input;
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
    exports.thead = thead;
    exports.time = time;
    exports.title = title;
    exports.tr = tr;
    exports.track = track;
    exports.tt = tt;
    exports.u = u;
    exports.ul = ul;
    exports.video = video;
    exports.wbr = wbr;
    exports.xmp = xmp;
    exports.svg = svg;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=hyperscript.js.map
