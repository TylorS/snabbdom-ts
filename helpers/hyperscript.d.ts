import { VNodeData, VNodeChildren, VirtualNode } from '../interfaces';
export interface HyperscriptHelperFn<T extends Element> {
    (selector: string, data: VNodeData, children: VNodeChildren): VirtualNode<T>;
    (data: VNodeData, children: VNodeChildren): VirtualNode<T>;
}
export declare const a: HyperscriptHelperFn<HTMLAnchorElement>;
export declare const abbr: HyperscriptHelperFn<Element>;
export declare const acronym: HyperscriptHelperFn<Element>;
export declare const address: HyperscriptHelperFn<Element>;
export declare const applet: HyperscriptHelperFn<HTMLAppletElement>;
export declare const area: HyperscriptHelperFn<HTMLAreaElement>;
export declare const article: HyperscriptHelperFn<Element>;
export declare const aside: HyperscriptHelperFn<Element>;
export declare const audio: HyperscriptHelperFn<HTMLAudioElement>;
export declare const b: HyperscriptHelperFn<Element>;
export declare const base: HyperscriptHelperFn<HTMLBaseElement>;
export declare const basefont: HyperscriptHelperFn<HTMLBaseFontElement>;
export declare const bdi: HyperscriptHelperFn<Element>;
export declare const bdo: HyperscriptHelperFn<Element>;
export declare const bgsound: HyperscriptHelperFn<Element>;
export declare const big: HyperscriptHelperFn<Element>;
export declare const blink: HyperscriptHelperFn<Element>;
export declare const blockquote: HyperscriptHelperFn<Element>;
export declare const body: HyperscriptHelperFn<HTMLBodyElement>;
export declare const br: HyperscriptHelperFn<HTMLBRElement>;
export declare const button: HyperscriptHelperFn<HTMLButtonElement>;
export declare const canvas: HyperscriptHelperFn<HTMLCanvasElement>;
export declare const caption: HyperscriptHelperFn<Element>;
export declare const center: HyperscriptHelperFn<Element>;
export declare const cite: HyperscriptHelperFn<Element>;
export declare const code: HyperscriptHelperFn<Element>;
export declare const col: HyperscriptHelperFn<Element>;
export declare const colgroup: HyperscriptHelperFn<Element>;
export declare const command: HyperscriptHelperFn<Element>;
export declare const content: HyperscriptHelperFn<Element>;
export declare const data: HyperscriptHelperFn<Element>;
export declare const datalist: HyperscriptHelperFn<HTMLDataListElement>;
export declare const dd: HyperscriptHelperFn<Element>;
export declare const del: HyperscriptHelperFn<Element>;
export declare const details: HyperscriptHelperFn<Element>;
export declare const dfn: HyperscriptHelperFn<Element>;
export declare const dialog: HyperscriptHelperFn<Element>;
export declare const dir: HyperscriptHelperFn<HTMLDirectoryElement>;
export declare const div: HyperscriptHelperFn<HTMLDivElement>;
export declare const dl: HyperscriptHelperFn<Element>;
export declare const dt: HyperscriptHelperFn<Element>;
export declare const element: HyperscriptHelperFn<Element>;
export declare const em: HyperscriptHelperFn<Element>;
export declare const embed: HyperscriptHelperFn<Element>;
export declare const fieldset: HyperscriptHelperFn<HTMLFieldSetElement>;
export declare const figcaption: HyperscriptHelperFn<Element>;
export declare const figure: HyperscriptHelperFn<Element>;
export declare const font: HyperscriptHelperFn<HTMLFontElement>;
export declare const footer: HyperscriptHelperFn<Element>;
export declare const form: HyperscriptHelperFn<HTMLFormElement>;
export declare const frame: HyperscriptHelperFn<HTMLFrameElement>;
export declare const frameset: HyperscriptHelperFn<HTMLFrameSetElement>;
export declare const h1: HyperscriptHelperFn<HTMLHeadingElement>;
export declare const h2: HyperscriptHelperFn<HTMLHeadingElement>;
export declare const h3: HyperscriptHelperFn<HTMLHeadingElement>;
export declare const h4: HyperscriptHelperFn<HTMLHeadingElement>;
export declare const h5: HyperscriptHelperFn<HTMLHeadingElement>;
export declare const h6: HyperscriptHelperFn<HTMLHeadingElement>;
export declare const head: HyperscriptHelperFn<Element>;
export declare const header: HyperscriptHelperFn<Element>;
export declare const hgroup: HyperscriptHelperFn<Element>;
export declare const hr: HyperscriptHelperFn<HTMLHRElement>;
export declare const html: HyperscriptHelperFn<HTMLHtmlElement>;
export declare const ins: HyperscriptHelperFn<Element>;
export declare const isindex: HyperscriptHelperFn<Element>;
export declare const kbd: HyperscriptHelperFn<Element>;
export declare const keygen: HyperscriptHelperFn<Element>;
export declare const label: HyperscriptHelperFn<HTMLLabelElement>;
export declare const legend: HyperscriptHelperFn<Element>;
export declare const li: HyperscriptHelperFn<HTMLLIElement>;
export declare const link: HyperscriptHelperFn<HTMLLinkElement>;
export declare const listing: HyperscriptHelperFn<Element>;
export declare const main: HyperscriptHelperFn<Element>;
export declare const map: HyperscriptHelperFn<HTMLMapElement>;
export declare const mark: HyperscriptHelperFn<Element>;
export declare const marquee: HyperscriptHelperFn<HTMLMarqueeElement>;
export declare const math: HyperscriptHelperFn<Element>;
export declare const menu: HyperscriptHelperFn<HTMLMenuElement>;
export declare const menuitem: HyperscriptHelperFn<Element>;
export declare const meta: HyperscriptHelperFn<HTMLMetaElement>;
export declare const meter: HyperscriptHelperFn<Element>;
export declare const multicol: HyperscriptHelperFn<Element>;
export declare const nav: HyperscriptHelperFn<Element>;
export declare const nextid: HyperscriptHelperFn<Element>;
export declare const nobr: HyperscriptHelperFn<Element>;
export declare const noembed: HyperscriptHelperFn<Element>;
export declare const noframes: HyperscriptHelperFn<Element>;
export declare const noscript: HyperscriptHelperFn<Element>;
export declare const object: HyperscriptHelperFn<Element>;
export declare const ol: HyperscriptHelperFn<Element>;
export declare const optgroup: HyperscriptHelperFn<Element>;
export declare const option: HyperscriptHelperFn<HTMLOptionElement>;
export declare const output: HyperscriptHelperFn<Element>;
export declare const p: HyperscriptHelperFn<HTMLParagraphElement>;
export declare const param: HyperscriptHelperFn<HTMLParamElement>;
export declare const picture: HyperscriptHelperFn<HTMLPictureElement>;
export declare const plaintext: HyperscriptHelperFn<Element>;
export declare const pre: HyperscriptHelperFn<Element>;
export declare const progress: HyperscriptHelperFn<HTMLProgressElement>;
export declare const q: HyperscriptHelperFn<HTMLQuoteElement>;
export declare const rb: HyperscriptHelperFn<Element>;
export declare const rbc: HyperscriptHelperFn<Element>;
export declare const rp: HyperscriptHelperFn<Element>;
export declare const rt: HyperscriptHelperFn<Element>;
export declare const rtc: HyperscriptHelperFn<Element>;
export declare const ruby: HyperscriptHelperFn<Element>;
export declare const s: HyperscriptHelperFn<Element>;
export declare const samp: HyperscriptHelperFn<Element>;
export declare const script: HyperscriptHelperFn<HTMLScriptElement>;
export declare const section: HyperscriptHelperFn<Element>;
export declare const select: HyperscriptHelperFn<HTMLSelectElement>;
export declare const shadow: HyperscriptHelperFn<Element>;
export declare const small: HyperscriptHelperFn<Element>;
export declare const source: HyperscriptHelperFn<HTMLSourceElement>;
export declare const spacer: HyperscriptHelperFn<Element>;
export declare const span: HyperscriptHelperFn<HTMLSpanElement>;
export declare const strike: HyperscriptHelperFn<Element>;
export declare const strong: HyperscriptHelperFn<Element>;
export declare const style: HyperscriptHelperFn<Element>;
export declare const sub: HyperscriptHelperFn<Element>;
export declare const summary: HyperscriptHelperFn<Element>;
export declare const sup: HyperscriptHelperFn<Element>;
export declare const table: HyperscriptHelperFn<HTMLTableElement>;
export declare const tbody: HyperscriptHelperFn<Element>;
export declare const td: HyperscriptHelperFn<Element>;
export declare const template: HyperscriptHelperFn<Element>;
export declare const textarea: HyperscriptHelperFn<Element>;
export declare const tfoot: HyperscriptHelperFn<Element>;
export declare const th: HyperscriptHelperFn<Element>;
export declare const tr: HyperscriptHelperFn<HTMLTableRowElement>;
export declare const track: HyperscriptHelperFn<Element>;
export declare const tt: HyperscriptHelperFn<Element>;
export declare const u: HyperscriptHelperFn<Element>;
export declare const ul: HyperscriptHelperFn<HTMLUListElement>;
export declare const video: HyperscriptHelperFn<HTMLVideoElement>;
export declare const wbr: HyperscriptHelperFn<Element>;
export declare const xmp: HyperscriptHelperFn<Element>;
