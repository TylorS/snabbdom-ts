var is = {
    array: Array.isArray,
    primitive: function (x) {
        return typeof x === 'string' || typeof x === 'number';
    }
};
export default is;
//# sourceMappingURL=is.js.map