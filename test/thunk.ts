import * as assert from 'assert'
import { init } from '../src/index'
import h from '../src/h'
import thunk from '../src/thunk'

let patch = init([])

describe('thunk', function() {
  let elm: HTMLElement, vnode0: HTMLElement;
  beforeEach(function() {
    elm = vnode0 = document.createElement('div');
  });
  it('returns vnode with data and render function', function() {
    function numberInSpan(n: number) {
      return h('span', 'Number is ' + n);
    }
    let vnode = thunk('span', 'num', numberInSpan, 22);
    assert.deepEqual(vnode.sel, 'span');
    assert.deepEqual(vnode.data.key, 'num');
    assert.deepEqual(vnode.data.args, [22]);
  });
  it('only calls render function on data change', function() {
    let called = 0;
    function numberInSpan(n: number) {
      called++;
      return h('span', {key: 'num'}, 'Number is ' + n);
    }
    let vnode1 = h('div', [
      thunk('span', 'num', numberInSpan, 1)
    ]);
    let vnode2 = h('div', [
      thunk('span', 'num', numberInSpan, 1)
    ]);
    let vnode3 = h('div', [
      thunk('span', 'num', numberInSpan, 2)
    ]);
    patch(vnode0, vnode1);
    patch(vnode1, vnode2);
    patch(vnode2, vnode3);
    assert.equal(called, 2);
  });
  it('renders correctly', function() {
    let called = 0;
    function numberInSpan(n: number) {
      called++;
      return h('span', {key: 'num'}, 'Number is ' + n);
    }
    let vnode1 = h('div', [
      thunk('span', 'num', numberInSpan, 1)
    ]);
    let vnode2 = h('div', [
      thunk('span', 'num', numberInSpan, 1)
    ]);
    let vnode3 = h('div', [
      thunk('span', 'num', numberInSpan, 2)
    ]);
    elm = patch(vnode0, vnode1).elm as HTMLElement;
    assert.equal((elm.firstChild as HTMLElement).tagName.toLowerCase(), 'span');
    assert.equal((elm.firstChild as HTMLElement).innerHTML, 'Number is 1');
    elm = patch(vnode1, vnode2).elm as HTMLElement;
    assert.equal((elm.firstChild as HTMLElement).tagName.toLowerCase(), 'span');
    assert.equal((elm.firstChild as HTMLElement).innerHTML, 'Number is 1');
    elm = patch(vnode2, vnode3).elm as HTMLElement;
    assert.equal((elm.firstChild as HTMLElement).tagName.toLowerCase(), 'span');
    assert.equal((elm.firstChild as HTMLElement).innerHTML, 'Number is 2');
    assert.equal(called, 2);
  });
  it('renders correctly when root', function() {
    let called = 0;
    function numberInSpan(n: string) {
      called++;
      return h('span', {key: 'num'}, 'Number is ' + n);
    }
    let vnode1 = thunk('span', 'num', numberInSpan, 1);
    let vnode2 = thunk('span', 'num', numberInSpan, 1);
    let vnode3 = thunk('span', 'num', numberInSpan, 2);

    elm = patch(vnode0, vnode1).elm as HTMLElement;
    assert.equal(elm.tagName.toLowerCase(), 'span');
    assert.equal(elm.innerHTML, 'Number is 1');

    elm = patch(vnode1, vnode2).elm as HTMLElement;
    assert.equal(elm.tagName.toLowerCase(), 'span');
    assert.equal(elm.innerHTML, 'Number is 1');

    elm = patch(vnode2, vnode3).elm as HTMLElement;
    assert.equal(elm.tagName.toLowerCase(), 'span');
    assert.equal(elm.innerHTML, 'Number is 2');
    assert.equal(called, 2);
  });
  it('can be replaced and removed', function() {
    function numberInSpan(n: number) {
      return h('span', {key: 'num'}, 'Number is ' + n);
    }
    function oddEven(n: number) {
      let prefix = (n % 2) === 0 ? 'Even' : 'Odd';
      return h('div', {key: n}, prefix + ': ' + n);
    }
    let vnode1 = h('div', [thunk('span', 'num', numberInSpan, 1)]);
    let vnode2 = h('div', [thunk('div', 'oddEven', oddEven, 4)]);

    elm = patch(vnode0, vnode1).elm as HTMLElement;
    assert.equal((elm.firstChild as HTMLElement).tagName.toLowerCase(), 'span');
    assert.equal((elm.firstChild as HTMLElement).innerHTML, 'Number is 1');

    elm = patch(vnode1, vnode2).elm as HTMLElement;
    assert.equal((elm.firstChild as HTMLElement).tagName.toLowerCase(), 'div');
    assert.equal((elm.firstChild as HTMLElement).innerHTML, 'Even: 4');
  });
  it('can be replaced and removed when root', function() {
    function numberInSpan(n: number) {
      return h('span', {key: 'num'}, 'Number is ' + n);
    }
    function oddEven(n: number) {
      let prefix = (n % 2) === 0 ? 'Even' : 'Odd';
      return h('div', { key: n }, prefix + ': ' + n);
    }
    let vnode1 = thunk('span', 'num', numberInSpan, 1);
    let vnode2 = thunk('div', 'oddEven', oddEven, 4);

    elm = patch(vnode0, vnode1).elm as HTMLElement;
    assert.equal(elm.tagName.toLowerCase(), 'span');
    assert.equal(elm.innerHTML, 'Number is 1');

    elm = patch(vnode1, vnode2).elm as HTMLElement;
    assert.equal(elm.tagName.toLowerCase(), 'div');
    assert.equal(elm.innerHTML, 'Even: 4');
  });
  it('invokes destroy hook on thunks', function() {
    let called = 0;
    function destroyHook() {
      called++;
    }
    function numberInSpan(n: number) {
      return h('span', {key: 'num', hook: {destroy: destroyHook}}, 'Number is ' + n);
    }
    let vnode1 = h('div', [
      h('div', 'Foo'),
      thunk('span', 'num', numberInSpan, 1),
      h('div', 'Foo')
    ]);
    let vnode2 = h('div', [
      h('div', 'Foo'),
      h('div', 'Foo')
    ]);
    patch(vnode0, vnode1);
    patch(vnode1, vnode2);
    assert.equal(called, 1);
  });
  it('invokes remove hook on thunks', function() {
    let called = 0;
    function hook() {
      called++;
    }
    function numberInSpan(n: number) {
      return h('span', {key: 'num', hook: {remove: hook}}, 'Number is ' + n);
    }
    let vnode1 = h('div', [
      h('div', 'Foo'),
      thunk('span', 'num', numberInSpan, 1),
      h('div', 'Foo')
    ]);
    let vnode2 = h('div', [
      h('div', 'Foo'),
      h('div', 'Foo')
    ]);
    patch(vnode0, vnode1);
    patch(vnode1, vnode2);
    assert.equal(called, 1);
  });
});
