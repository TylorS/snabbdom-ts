export type PreHook = () => any
export type InitHook = (vNode: VNode) => any
export type CreateHook = (emptyVNode: VNode, vNode: VNode) => any
export type InsertHook = (vNode: VNode) => any
export type PrePatchHook = (oldVNode: VNode, vNode: VNode) => any
export type UpdateHook = (oldVNode: VNode, vNode: VNode) => any
export type PostPatchHook = (oldVNode: VNode, vNode: VNode) => any
export type DestroyHook = (vNode: VNode) => any
export type RemoveHook = (vNode: VNode, removeCallback: () => void) => any
export type PostHook = () => any

export interface Hooks {
  pre?: PreHook
  init?: InitHook
  create?: CreateHook
  insert?: InsertHook
  prepatch?: PrePatchHook
  update?: UpdateHook
  postpatch?: PostPatchHook
  destroy?: DestroyHook
  remove?: RemoveHook
  post?: PostHook
}

export interface Module {
  pre?: PreHook
  create?: CreateHook
  update?: UpdateHook
  destroy?: DestroyHook
  remove?: RemoveHook
  post?: PostHook
}

export interface SnabbdomAPI<A, B, C> {
  createElement(tagName: string): A
  createElementNS(namespaceURI: string, qualifiedName: string): A
  createTextNode(text: string): B
  insertBefore(parentNode: A | B, newNode: A | B, referenceNode: A | B): void
  removeChild(node: A | B, child: A | B): void
  appendChild(node: A, child: A | B): void
  parentNode(node: A | B): A | B
  nextSibling(node: A | B): A | C
  tagName(node: A): string
  setTextContent(node: A | B, text: string): void
}

export interface VNodeData {
  // modules - use any because Object type is useless
  props?: any
  attrs?: any
  class?: any
  style?: any
  dataset?: any
  on?: any
  hero?: any
  // end of modules
  hook?: Hooks
  key?: string | number
  ns?: string; // for SVGs
  fn?: () => VNode // for thunks
  args?: Array<any> // for thunks
  attachData?: any // for attachTo()
  // Cycle.js only
  isolate?: string
  static?: boolean
}

export interface VirtualNode<T extends Node> {
  sel: string | undefined
  data: VNodeData | undefined
  children: Array<VNode | string | null> | undefined
  elm: T | undefined
  text: string | undefined
  key: string | number | undefined
}

export type VNode = VirtualNode<any>;

export class SnabbdomVNode implements VNode {
  public sel: string | undefined
  public data: VNodeData | undefined
  public children: Array<VNode | string | null> | undefined
  public elm: HTMLElement | Text | undefined
  public text: string | undefined
  public key: string | number | undefined
  constructor(selector: string | undefined, data: VNodeData | undefined,
              children: Array<VNode | string | null> | undefined, text: string | undefined,
              elm: HTMLElement | Text | undefined, key: string | number | undefined) {
    this.sel = selector
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.key = key
  }

  static create(selector: string | undefined, data: VNodeData | undefined,
                children: Array<VNode | string | null> | undefined, text: string | undefined,
                elm: HTMLElement | Text | undefined, key: string | number | undefined) {
    return new SnabbdomVNode(selector, data, children, text, elm, key)
  }

  static createTextVNode(text: string) {
    return new SnabbdomVNode(undefined, undefined, undefined, text, undefined, undefined)
  }
}

export interface ThunkData extends VNodeData {
  fn: () => VNode
  args: any[]
}

export class Thunk extends SnabbdomVNode {
  public data: ThunkData
  constructor(selector: string | undefined, data: ThunkData,
              children: Array<VNode | string | null> | undefined, text: string | undefined,
              elm: HTMLElement | Text | undefined, key: string | number | undefined) {
    super(selector, data, children, text, elm, key)
  }

  static create(selector: string | undefined, data: ThunkData,
                children: Array<VNode | string | null> | undefined, text: string | undefined,
                elm: HTMLElement | Text | undefined, key: string | number | undefined) {
    return new Thunk(selector, data, children, text, elm, key)
  }
}

/* tslint:disable:max-line-length */
export interface ThunkFn {
  <A>(selector: string, key: string | number, render: (state1?: A) => VNode, state: A): Thunk
  <A, B>(selector: string, key: string | number, render: (state1?: A, state2?: B) => VNode, state: A, state2: B): Thunk
  <A, B, C>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C) => VNode, state: A, state2: B, state3: C): Thunk
  <A, B, C, D>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D) => VNode, state: A, state2: B, state3: C, state4: D): Thunk
  <A, B, C, D, E>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E) => VNode, state: A, state2: B, state3: C, state4: D, state5?: E): Thunk
  <A, B, C, D, E, F>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F): Thunk
  <A, B, C, D, E, F, G>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F, state7?: G) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F, state7: G): Thunk
  <A, B, C, D, E, F, G, H>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F, state7?: G, state8?: H) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F, state7: G, state8: H): Thunk
  <A, B, C, D, E, F, G, H, I>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F, state7?: G, state8?: H, state9?: I) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F, state7: G, state8: H, state9: I): Thunk
  <A, B, C, D, E, F, G, H, I, J>(selector: string, key: string | number, render: (state1?: A, state2?: B, state3?: C, state4?: D, state5?: E, state6?: F, state7?: G, state8?: H, state9?: I, state10?: J) => VNode, state: A, state2: B, state3: C, state4: D, state5: E, state6: F, state7: G, state8: H, state9: I, state10: J): Thunk
  (selector: string, key: string | number, render: (...state: any[]) => VNode, ...state: any[]): Thunk
}
/* tslint:enable:max-line-length */
