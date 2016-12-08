export declare type PreHook = () => any;
export declare type InitHook = (vNode: VNode) => any;
export declare type CreateHook = (emptyVNode: VNode, vNode: VNode) => any;
export declare type InsertHook = (vNode: VNode) => any;
export declare type PrePatchHook = (oldVNode: VNode, vNode: VNode) => any;
export declare type UpdateHook = (oldVNode: VNode, vNode: VNode) => any;
export declare type PostPatchHook = (oldVNode: VNode, vNode: VNode) => any;
export declare type DestroyHook = (vNode: VNode) => any;
export declare type RemoveHook = (vNode: VNode, removeCallback: () => void) => any;
export declare type PostHook = () => any;
export interface Hooks {
    pre?: PreHook;
    init?: InitHook;
    create?: CreateHook;
    insert?: InsertHook;
    prepatch?: PrePatchHook;
    update?: UpdateHook;
    postpatch?: PostPatchHook;
    destroy?: DestroyHook;
    remove?: RemoveHook;
    post?: PostHook;
}
export interface Module {
    pre?: PreHook;
    create?: CreateHook;
    update?: UpdateHook;
    destroy?: DestroyHook;
    remove?: RemoveHook;
    post?: PostHook;
}
export interface SnabbdomAPI<A, B, C> {
    createElement(tagName: string): A;
    createElementNS(namespaceURI: string, qualifiedName: string): A;
    createTextNode(text: string): B;
    insertBefore(parentNode: A | B, newNode: A | B, referenceNode: A | B): void;
    removeChild(node: A | B, child: A | B): void;
    appendChild(node: A, child: A | B): void;
    parentNode(node: A | B): A | B;
    nextSibling(node: A | B): A | C;
    tagName(node: A): string;
    setTextContent(node: A | B, text: string): void;
}
export interface VNodeData {
    props?: any;
    attrs?: any;
    class?: any;
    style?: any;
    dataset?: any;
    on?: any;
    hero?: any;
    hook?: Hooks;
    key?: string | number;
    ns?: string;
    fn?: () => VNode;
    args?: Array<any>;
    attachData?: any;
    isolate?: string;
    static?: boolean;
}
export interface VirtualNode<T extends Node> {
    tagName: string | undefined;
    className: string | undefined;
    id: string | undefined;
    data: VNodeData | undefined;
    children: VNodeChildren | undefined;
    elm: T | undefined;
    text: string | undefined;
    key: string | number | undefined;
}
export declare type VNode = VirtualNode<any>;
export declare type VNodeChildren = Array<VNode | string | null>;
export declare class SnabbdomVNode implements VNode {
    tagName: string | undefined;
    className: string | undefined;
    id: string | undefined;
    data: VNodeData | undefined;
    children: Array<VNode | string | null> | undefined;
    text: string | undefined;
    elm: HTMLElement | Text | undefined;
    key: string | number | undefined;
    constructor(tagName: string | undefined, className: string | undefined, id: string | undefined, data: VNodeData | undefined, children: Array<VNode | string | null> | undefined, text: string | undefined, elm: HTMLElement | Text | undefined, key: string | number | undefined);
    static createTextVNode(text: string): SnabbdomVNode;
}
export interface ThunkData extends VNodeData {
    fn: () => VNode;
    args: any[];
}
export declare class Thunk extends SnabbdomVNode {
    data: ThunkData;
    constructor(tagName: string | undefined, className: string | undefined, id: string | undefined, data: ThunkData, children: Array<VNode | string | null> | undefined, text: string | undefined, elm: HTMLElement | Text | undefined, key: string | number | undefined);
}
export interface ThunkFn {
    <A>(selector: string, key: string | number, render: (state1?: A) => VNode, state: A): Thunk;
    <A, B>(selector: string, key: string | number, render: (state1?: A, state2?: B) => VNode, state: A, state2: B): Thunk;
    <A, B, C>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C) => VNode, state: A, state2: B, state3: C): Thunk;
    <A, B, C, D>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D) => VNode, state: A, state2: B, state3: C, state4: D): Thunk;
    <A, B, C, D, E>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E) => VNode, state: A, state2: B, state3: C, state4: D, state5?: E): Thunk;
    <A, B, C, D, E, F>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F): Thunk;
    <A, B, C, D, E, F, G>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F, state7?: G) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F, state7: G): Thunk;
    <A, B, C, D, E, F, G, H>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F, state7?: G, state8?: H) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F, state7: G, state8: H): Thunk;
    <A, B, C, D, E, F, G, H, I>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F, state7?: G, state8?: H, state9?: I) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F, state7: G, state8: H, state9: I): Thunk;
    <A, B, C, D, E, F, G, H, I, J>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F, state7?: G, state8?: H, state9?: I, state10?: J) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F, state7: G, state8: H, state9: I, state10: J): Thunk;
    (selector: string, key: string | number, render: (...state: any[]) => VNode, ...state: any[]): Thunk;
}
