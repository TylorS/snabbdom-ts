import { VNode, Thunk, VNodeData, ThunkData, ThunkFn } from './interfaces'

function copyToThunk (vNode: VNode, thunk: Thunk): void {
  thunk.elm = vNode.elm
  if (!vNode.data) {
    vNode.data = {}
  }
  vNode.data.fn = (thunk.data as VNodeData).fn
  vNode.data.args = thunk.data.args
  thunk.data = vNode.data as ThunkData
  thunk.children = vNode.children
  thunk.text = vNode.text
  thunk.elm = vNode.elm
}

function init (thunk: Thunk) {
  const cur = thunk.data;
  const vNode = cur.fn.apply(undefined, cur.args);
  copyToThunk(vNode, thunk);
}

function prepatch (oldVnode: VNode, thunk: Thunk): void {
  let old = oldVnode.data
  let cur = thunk.data
  let oldArgs = old ? old.args : []
  let args = cur.args
  if (old && old.fn !== cur.fn || oldArgs && oldArgs.length !== args.length) {
    copyToThunk(cur.fn.apply(undefined, args), thunk)
  }
  for (let i = 0; i < args.length; ++i) {
    if (oldArgs && oldArgs[i] !== args[i]) {
      copyToThunk(cur.fn.apply(undefined, args), thunk)
      return;
    }
  }
  copyToThunk(oldVnode, thunk);
}

const thunk: ThunkFn = <ThunkFn>function thunk(selector: string,
                                               key: string | number,
                                               render: (...state: any[]) => VNode,
                                               ...state: any[]): Thunk {
  return Thunk.create(selector,
    {
      key,
      hook: { init, prepatch },
      fn: render,
      args: state
    },
    undefined,
    undefined,
    undefined,
    key
  )
}

export default thunk
