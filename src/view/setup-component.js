var bind = require('../util/bind');
var each = require('../util/each');
var extend = require('../util/extend');

function createHook(lifecycle, scope) {
    var hooks = scope._hooks[lifecycle] = [];

    return function(fn) {
        hooks.push(fn);
    }
}

function callHook(scope) {
    var toPhase = scope._toPhase;
    scope._toPhase = function (name) {
        var hooks = scope._hooks[name];
        if (hooks && hooks.length > 0) {
            each(hooks, function (hook) {
                if (typeof hook === 'function') {
                    hook.call(scope);
                }
            });
        }

        toPhase.call(scope, name);
    }
}

function SetupComponent(scope) {
    this.reactive = function (data) {
        extend(scope.data.raw, data);
        return scope.data;
    }

    this.computed = function (computed) {
        return extend(scope.computed, computed);
    }

    this.watch = function (dataName, listener) {
        scope.watch(dataName, listener);
    }

    scope._hooks = {};

    this.onAttached = createHook('attached', scope);
    this.onCreated = createHook('created', scope);

    callHook(scope);
}

exports = module.exports = SetupComponent;
