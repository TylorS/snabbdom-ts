import { VNode, VNodeData } from './interfaces'
import is from './is'

function addNS(data: VNodeData, children: Array<VNode | string | null>, selector: string): void {
  data.ns = `http://www.w3.org/2000/svg`;
  if (selector !== `foreignObject` && typeof children !== `undefined` && is.array(children)) {
    for (let i = 0; i < children.length; ++i) {
        addNS((children[i] as VNode).data as VNodeData,
              (children[i] as VNode).children as Array<VNode | string>,
              (children[i] as VNode).sel as string)
    }
  }
}

export interface HyperscriptFn {
  (sel: string): VNode
  (sel: string, data: VNodeData): VNode
  (sel: string, children: string | number | Array<string | VNode | null>): VNode
  (sel: string, data: VNodeData, children: string | number | Array<string | VNode | null>): VNode
}

const h: HyperscriptFn = <HyperscriptFn>function (selector: string, b?: any, c?: any): VNode {
  let data: VNodeData = {}
  let children: Array<VNode | string | null> | undefined
  let text: string | undefined
  let i: number

  if (arguments.length === 3) {
    data = b
    if (is.array(c)) {
      children = c
    } else if (is.primitive(c)) {
      text = String(c)
    }
  } else if (arguments.length === 2) {
    if (is.array(b)) {
      children = b
    } else if (is.primitive(b)) {
      text = String(b)
    } else {
      data = b
    }
  }

  if (is.array(children)) {
    children = children.filter(Boolean)
    for (i = 0; i < children.length; ++i) {
      if (is.primitive(children[i])) {
        children[i] = VNode.createTextVNode(String(children[i]) as string)
      }
    }
  }

  if (selector[0] === 's' && selector[1] === 'v' && selector[2] === 'g') {
    addNS(data, children as Array<VNode | string | null>, selector)
  }

  return VNode.create(selector, data, children, text, undefined, data && data.key)
}

export default h
