import { VNode, Module} from '../interfaces'

const raf = (typeof window !== 'undefined' && window.requestAnimationFrame) || setTimeout
const nextFrame = function nextFrame(fn: any) { raf(function() { raf(fn) }) }

function setNextFrame(obj: any, prop: string, val: any) {
  nextFrame(function() { obj[prop] = val })
}

function updateStyle(oldVnode: VNode, vnode: VNode) {
  if (!vnode.data && !oldVnode.data) return
  let cur: any
  let name: any
  let elm = vnode.elm as HTMLElement
  let oldStyle = oldVnode.data && oldVnode.data.style || {}
  let style = vnode.data && vnode.data.style || {}
  let oldHasDel = 'delayed' in oldStyle

  for (name in oldStyle) {
    if (!style[name]) {
      (<HTMLElement> elm).style[name] = ''
    }
  }
  for (name in style) {
    cur = style[name]
    if (name === 'delayed') {
      for (name in (<any> style).delayed) {
        cur = (<any> style).delayed[name]
        if (!oldHasDel || cur !== (<any> oldStyle).delayed[name]) {
          setNextFrame((<HTMLElement> elm).style, name, cur)
        }
      }
    } else if (name !== 'remove' && cur !== oldStyle[name]) {
      (<HTMLElement> elm).style[name] = cur
    }
  }
}

function applyDestroyStyle(vnode: VNode) {
  let style: any
  let name: any
  let elm = vnode.elm
  let s = vnode.data && vnode.data.style

  if (!s || !(style = (<any> s).destroy)) return
  for (name in style) {
    (<HTMLElement> elm).style[name] = style[name]
  }
}

function applyRemoveStyle(vnode: VNode, rm: () => void) {
  let s = vnode && vnode.data && vnode.data.style
  if (!s || !(<any> s).remove) {
    rm()
    return
  }
  let name: any
  let elm = vnode.elm
  if (!elm) return
  let i = 0
  let compStyle: any
  let style = (<any> s).remove
  let amount = 0
  let applied: any[] = []
  for (name in style) {
    applied.push(name);
    (<HTMLElement> elm).style[name] = style[name]
  }
  compStyle = getComputedStyle((<HTMLElement> elm))
  let props = compStyle['transition-property'].split(', ')
  for (; i < props.length; ++i) {
    if (applied.indexOf(props[i]) !== -1) amount++
  }
  elm.addEventListener('transitionend', function(ev) {
    if (ev.target === elm) --amount
    if (amount === 0) rm()
  })
}

const StyleModule: Module = {
  create: updateStyle,
  update: updateStyle,
  destroy: applyDestroyStyle,
  remove: applyRemoveStyle
}

export default StyleModule
