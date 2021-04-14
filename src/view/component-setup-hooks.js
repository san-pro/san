var kebab2camel = require('../util/kebab2camel');
var LifeCycle = require('./life-cycle');

var ctx;
var setupHooks;
function initSetupHooks() {
    ctx  = {};
    setupHooks = {};

    for (var name in LifeCycle) {
        var lifeName = kebab2camel('on-' + name);
        ctx[lifeName] = (function (name) {
            return function (fn) {
                setupHooks[name] = fn;
            };
        })(name);
    }
}

function componentSetupHooks() {
    if (!ctx) {
        initSetupHooks();
    }

    return {
        ctx: ctx,
        setupHooks: setupHooks
    };
}

exports = module.exports = componentSetupHooks;
