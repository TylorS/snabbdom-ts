import { VNode, VNodeData } from '../interfaces'

interface AttachData extends VNodeData {
  attachData: any
}

interface AttachVNode extends VNode {
  elm: HTMLElement
  data: AttachData
}

function pre(vnode: AttachVNode, newVnode: AttachVNode) {
  const attachData = vnode.data.attachData
  // Copy created placeholder and real element from old vnode
  newVnode.data.attachData.placeholder = attachData.placeholder
  newVnode.data.attachData.real = attachData.real
  // Mount real element in vnode so the patch process operates on it
  vnode.elm = vnode.data.attachData.real
}

function post(_: any, vnode: AttachVNode) {
  // Mount dummy placeholder in vnode so potential reorders use it
  vnode.elm = vnode.data.attachData.placeholder
}

function destroy(vnode: AttachVNode) {
  // Remove placeholder
  vnode.elm.parentElement.removeChild(vnode.elm)
  // Remove real element from where it was inserted
  vnode.elm = vnode.data.attachData.real
}

function create(_: any, vnode: AttachVNode) {
  const real = vnode.elm, attachData = vnode.data.attachData
  const placeholder = document.createElement('span')
  // Replace actual element with dummy placeholder
  // Snabbdom will then insert placeholder instead
  vnode.elm = placeholder
  attachData.target.appendChild(real)
  attachData.real = real
  attachData.placeholder = placeholder
}

export default function attachTo(target: Element, vNode: VNode) {
  if (vNode.data === undefined) vNode.data = {}
  if (vNode.data.hook === undefined) vNode.data.hook = {}
  const data = vNode.data
  const hook = vNode.data.hook
  data.attachData = {target: target, placeholder: undefined, real: undefined}
  hook.create = create
  hook.prepatch = pre
  hook.postpatch = post
  hook.destroy = destroy
  return vNode
}
