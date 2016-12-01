(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('dataset', factory) :
    (global.dataset = factory());
}(this, (function () { 'use strict';

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

return DatasetModule;

})));
//# sourceMappingURL=dataset.js.map
