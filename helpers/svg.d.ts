import { VNodeData, VNodeChildren, VirtualNode } from '../interfaces';
export interface SvgHyperscriptHelperFn<T extends Element> {
    (selector: string, data: VNodeData, children: VNodeChildren): VirtualNode<T>;
    (data: VNodeData, children: VNodeChildren): VirtualNode<T>;
}
export interface SVGHelperFn extends SvgHyperscriptHelperFn<SVGElement> {
    a: SvgHyperscriptHelperFn<SVGElement>;
    altGlyph: SvgHyperscriptHelperFn<SVGElement>;
    altGlyphDef: SvgHyperscriptHelperFn<SVGElement>;
    altGlyphItem: SvgHyperscriptHelperFn<SVGElement>;
    animate: SvgHyperscriptHelperFn<SVGElement>;
    animateColor: SvgHyperscriptHelperFn<SVGElement>;
    animateMotion: SvgHyperscriptHelperFn<SVGElement>;
    animateTransform: SvgHyperscriptHelperFn<SVGElement>;
    circle: SvgHyperscriptHelperFn<SVGElement>;
    clipPath: SvgHyperscriptHelperFn<SVGElement>;
    colorProfile: SvgHyperscriptHelperFn<SVGElement>;
    cursor: SvgHyperscriptHelperFn<SVGElement>;
    defs: SvgHyperscriptHelperFn<SVGElement>;
    desc: SvgHyperscriptHelperFn<SVGElement>;
    ellipse: SvgHyperscriptHelperFn<SVGElement>;
    feBlend: SvgHyperscriptHelperFn<SVGElement>;
    feColorMatrix: SvgHyperscriptHelperFn<SVGElement>;
    feComponentTransfer: SvgHyperscriptHelperFn<SVGElement>;
    feComposite: SvgHyperscriptHelperFn<SVGElement>;
    feConvolveMatrix: SvgHyperscriptHelperFn<SVGElement>;
    feDiffuseLighting: SvgHyperscriptHelperFn<SVGElement>;
    feDisplacementMap: SvgHyperscriptHelperFn<SVGElement>;
    feDistantLight: SvgHyperscriptHelperFn<SVGElement>;
    feFlood: SvgHyperscriptHelperFn<SVGElement>;
    feFuncA: SvgHyperscriptHelperFn<SVGElement>;
    feFuncB: SvgHyperscriptHelperFn<SVGElement>;
    feFuncG: SvgHyperscriptHelperFn<SVGElement>;
    feFuncR: SvgHyperscriptHelperFn<SVGElement>;
    feGaussianBlur: SvgHyperscriptHelperFn<SVGElement>;
    feImage: SvgHyperscriptHelperFn<SVGElement>;
    feMerge: SvgHyperscriptHelperFn<SVGElement>;
    feMergeNode: SvgHyperscriptHelperFn<SVGElement>;
    feMorphology: SvgHyperscriptHelperFn<SVGElement>;
    feOffset: SvgHyperscriptHelperFn<SVGElement>;
    fePointLight: SvgHyperscriptHelperFn<SVGElement>;
    feSpecularLighting: SvgHyperscriptHelperFn<SVGElement>;
    feSpotlight: SvgHyperscriptHelperFn<SVGElement>;
    feTile: SvgHyperscriptHelperFn<SVGElement>;
    feTurbulence: SvgHyperscriptHelperFn<SVGElement>;
    filter: SvgHyperscriptHelperFn<SVGElement>;
    font: SvgHyperscriptHelperFn<SVGElement>;
    fontFace: SvgHyperscriptHelperFn<SVGElement>;
    fontFaceFormat: SvgHyperscriptHelperFn<SVGElement>;
    fontFaceName: SvgHyperscriptHelperFn<SVGElement>;
    fontFaceSrc: SvgHyperscriptHelperFn<SVGElement>;
    fontFaceUri: SvgHyperscriptHelperFn<SVGElement>;
    foreignObject: SvgHyperscriptHelperFn<SVGElement>;
    g: SvgHyperscriptHelperFn<SVGElement>;
    glyph: SvgHyperscriptHelperFn<SVGElement>;
    glyphRef: SvgHyperscriptHelperFn<SVGElement>;
    hkern: SvgHyperscriptHelperFn<SVGElement>;
    image: SvgHyperscriptHelperFn<SVGElement>;
    line: SvgHyperscriptHelperFn<SVGElement>;
    linearGradient: SvgHyperscriptHelperFn<SVGElement>;
    marker: SvgHyperscriptHelperFn<SVGElement>;
    mask: SvgHyperscriptHelperFn<SVGElement>;
    metadata: SvgHyperscriptHelperFn<SVGElement>;
    missingGlyph: SvgHyperscriptHelperFn<SVGElement>;
    mpath: SvgHyperscriptHelperFn<SVGElement>;
    path: SvgHyperscriptHelperFn<SVGElement>;
    pattern: SvgHyperscriptHelperFn<SVGElement>;
    polygon: SvgHyperscriptHelperFn<SVGElement>;
    polyline: SvgHyperscriptHelperFn<SVGElement>;
    radialGradient: SvgHyperscriptHelperFn<SVGElement>;
    rect: SvgHyperscriptHelperFn<SVGElement>;
    script: SvgHyperscriptHelperFn<SVGElement>;
    set: SvgHyperscriptHelperFn<SVGElement>;
    stop: SvgHyperscriptHelperFn<SVGElement>;
    style: SvgHyperscriptHelperFn<SVGElement>;
    switch: SvgHyperscriptHelperFn<SVGElement>;
    symbol: SvgHyperscriptHelperFn<SVGElement>;
    text: SvgHyperscriptHelperFn<SVGElement>;
    textPath: SvgHyperscriptHelperFn<SVGElement>;
    title: SvgHyperscriptHelperFn<SVGElement>;
    tref: SvgHyperscriptHelperFn<SVGElement>;
    tspan: SvgHyperscriptHelperFn<SVGElement>;
    use: SvgHyperscriptHelperFn<SVGElement>;
    view: SvgHyperscriptHelperFn<SVGElement>;
    vkern: SvgHyperscriptHelperFn<SVGElement>;
}
export declare const svg: SVGHelperFn;
