import { h } from './h';
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
export var svg = createSVGHelper();
//# sourceMappingURL=svg.js.map