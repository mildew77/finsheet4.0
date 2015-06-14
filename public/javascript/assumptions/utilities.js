app.service('utilities', ['$timeout',
    function($timeout) {
        this.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn) fn();
        } else {
            this.$apply(fn);
        }
    };


    }
]);