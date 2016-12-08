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
export var DatasetModule = {
    create: updateDataset,
    update: updateDataset,
};
//# sourceMappingURL=dataset.js.map