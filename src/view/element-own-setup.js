var bind = require('../util/bind');
var each = require('../util/each');
var extend = require('../util/extend');

function createHook(lifecycle, scope) {
    var hooks = scope._hooks[lifecycle] = [];

    return function(fn) {
        hooks.push(fn);
    }
}

function elementOwnSetup() {
    var me = this;

    this._hooks = {};

    var toPhase = this._toPhase;
    this._toPhase = function (name) {
        var hooks = this._hooks[name];
        if (hooks && hooks.length > 0) {
            each(hooks, function (hook) {
                if (typeof hook === 'function') {
                    hook.call(me);
                }
            });
        }

        toPhase.call(me, name);
    }

    function reactive (data) {
        extend(me.data.raw, data);
        return me.data;
    }

    function computed (computed) {
        return extend(me.computed, computed);
    }

    function watch (dataName, listener) {
        me.watch(dataName, listener);
    }

    var context = {
        reactive: reactive,
        computed: computed,
        watch: watch,

        onAttached: createHook('attached', this),
        onCreated: createHook('created', this)
    };

    return context;
}

exports = module.exports = elementOwnSetup;
