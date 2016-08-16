import * as assert from 'assert'
import * as snabbdom from '../src/index'
import attachTo from '../src/helpers/attachto'
import h from '../src/h'
let patch = snabbdom.init([]);

describe('attachTo', function() {
  let elm: HTMLElement, vnode0: HTMLElement;
  beforeEach(function() {
    elm = document.createElement('div');
    vnode0 = elm;
  });
  it('adds element to target', function() {
    let vnode1: snabbdom.VNode = h('div', [
       h('div#wrapper', [
         h('div', 'Some element'),
         attachTo(elm, h('div#attached', 'Test')),
       ]),
    ]);
    elm = patch(vnode0, vnode1).elm as HTMLElement;
    assert.equal(elm.children.length, 2);
  });
  it('updates element at target', function() {
    let vnode1: snabbdom.VNode = h('div', [
      h('div#wrapper', [
        h('div', 'Some element'),
        attachTo(elm, h('div#attached', 'First text')),
      ]),
    ]);
    let vnode2: snabbdom.VNode = h('div', [
      h('div#wrapper', [
        h('div', 'Some element'),
        attachTo(elm, h('div#attached', 'New text')),
      ]),
    ]);
    elm = patch(vnode0, vnode1).elm as HTMLElement;
    assert.equal(elm.children[0].innerHTML, 'First text');
    elm = patch(vnode1, vnode2).elm as HTMLElement;
    assert.equal(elm.children[0].innerHTML, 'New text');
  });
  it('element can be inserted before modal', function() {
    let vnode1: snabbdom.VNode = h('div', [
      h('div#wrapper', [
        h('div', 'Some element'),
        attachTo(elm, h('div#attached', 'Text')),
      ]),
    ]);
    let vnode2: snabbdom.VNode = h('div', [
      h('div#wrapper', [
        h('div', 'Some element'),
        h('div', 'A new element'),
        attachTo(elm, h('div#attached', 'Text')),
      ]),
    ]);
    elm = patch(vnode0, vnode1).elm as HTMLElement;
    assert.equal(elm.children[0].innerHTML, 'Text');
    elm = patch(vnode1, vnode2).elm as HTMLElement;
    assert.equal(elm.children[0].innerHTML, 'Text');
  });
  it('removes element at target', function() {
    let vnode1: snabbdom.VNode = h('div', [
      h('div#wrapper', [
        h('div', 'Some element'),
        attachTo(elm, h('div#attached', 'First text')),
      ]),
    ]);
    let vnode2: snabbdom.VNode = h('div', [
      h('div#wrapper', [
        h('div', 'Some element'),
      ]),
    ]);
    elm = patch(vnode0, vnode1).elm as HTMLElement;
    assert.equal(elm.children[0].innerHTML, 'First text');
    elm = patch(vnode1, vnode2).elm as HTMLElement;
    assert.equal(elm.children.length, 1);
  });
  it('remove hook recieves real element', function() {
    function rm(vnode: snabbdom.VNode, cb: any) {
      assert.equal((vnode.elm as HTMLElement).tagName, 'DIV');
      assert.equal((vnode.elm as HTMLElement).innerHTML, 'First text');
      cb();
    }
    let vnode1: snabbdom.VNode = h('div', [
      h('div#wrapper', [
        h('div', 'Some element'),
        attachTo(elm, h('div#attached', {hook: {remove: rm}}, 'First text')),
      ]),
    ]);
    let vnode2: snabbdom.VNode = h('div', [
      h('div#wrapper', [
        h('div', 'Some element'),
      ]),
    ]);
    elm = patch(vnode0, vnode1).elm as HTMLElement;
    elm = patch(vnode1, vnode2).elm as HTMLElement;
  });
});
