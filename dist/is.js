(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('is', factory) :
    (global.is = factory());
}(this, (function () { 'use strict';

var is = {
    array: Array.isArray,
    primitive: function (x) {
        return typeof x === 'string' || typeof x === 'number';
    }
};

return is;

})));
//# sourceMappingURL=is.js.map
