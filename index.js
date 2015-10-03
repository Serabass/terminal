(function (deps, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(deps, factory);
    }
})(["require", "exports", './command-builder'], function (require, exports) {
    var command_builder_1 = require('./command-builder');
    console.log(command_builder_1.default.build('.NUL .ENQ'));
});
