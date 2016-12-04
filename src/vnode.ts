import { SnabbdomVNode, VNode, VNodeData } from './interfaces'

export default function vnode(selector: string | undefined, data: VNodeData | undefined,
                              children: Array<VNode | string | null> | undefined, text: string | undefined,
                              elm: HTMLElement | Text | undefined, key: string | number | undefined) {
  return new SnabbdomVNode(selector, data, children, text, elm, key)
}
