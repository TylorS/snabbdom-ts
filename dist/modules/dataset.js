(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('dataset', ['exports'], factory) :
    (factory((global.dataset = global.dataset || {})));
}(this, (function (exports) { 'use strict';

function updateDataset(oldVnode, vnode) {
    var elm = vnode.elm;
    var oldDataset = oldVnode.data && oldVnode.data.dataset || {};
    var dataset = vnode.data && vnode.data.dataset || {};
    var key;
    for (key in oldDataset) {
        if (!dataset[key]) {
            delete elm.dataset[key];
        }
    }
    for (key in dataset) {
        if (oldDataset[key] !== dataset[key]) {
            elm.dataset[key] = dataset[key];
        }
    }
}
var DatasetModule = {
    create: updateDataset,
    update: updateDataset,
};

exports.DatasetModule = DatasetModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=dataset.js.map
