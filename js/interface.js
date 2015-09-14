(function() {
    "use strict";

    var global = typeof window !== 'undefined' ? window : this;
    global._perlito = global._perlito || {
        bundles: []
    };

    // conversion functions  ----------------------------------------

    var sub_default_options = {
        want: 'scalar'
    };

    function decodeSub(bundle, perlito_sub, options) {
        var sub_options = assign({}, sub_default_options, options || {});
        checkSubOptions(sub_options);
        var sub = function(args, options) {
            var sub_call_options = assign({}, sub_options, options || {});
            checkSubOptions(sub_call_options);
            args = (typeof args == 'function') && [encodeSub(bundle, args)] || (args instanceof Array) && encodeArray(bundle, args) || (args instanceof Object) && encodeHash(bundle, args) || [encodeScalar(bundle, args)];
            switch (sub_call_options.want) {
                case 'scalar':
                    return decodeScalar(bundle, bundle.runtime.p5context([perlito_sub(args, 0)], 0));
                case 'array':
                    return decodeArray(bundle, bundle.runtime.p5list_to_a(perlito_sub(args, 1)));
                case 'hash':
                    return decodeHash(bundle, bundle.runtime.p5a_to_h(bundle.runtime.p5list_to_a(perlito_sub(args, 1))));
            }
        };
        sub._bundle = bundle;
        sub._perlito_sub = perlito_sub;
        sub._options = sub_options;
        return sub;
    }

    function checkSubOptions(options) {
        if (['scalar', 'array', 'hash'].indexOf(options.want) == -1) {
            throw new Error("'" + options.want + "' is not a valid option for 'want'");
        }
    }

    function decodeScalar(bundle, input) {
        if (input instanceof bundle.runtime.p5HashRef) {
            return decodeHash(bundle, input._hash_);
        } else if (input instanceof bundle.runtime.p5ArrayRef) {
            return decodeArray(bundle, input._array_);
        } else if (input instanceof bundle.runtime.p5ScalarRef) {
            return decodeScalar(bundle, input._scalar_);
        } else if (input instanceof bundle.runtime.p5GlobRef) {
            throw new Error('globrefs are not yet supported');
        } else if (input instanceof bundle.runtime.p5CodeRef) {
            return decodeSub(bundle, input._code_);
        } else {
            return input;
        }
    }

    function decodeArray(bundle, input) {
        var output = [];
        for (var i = 0; i < input.length; i++) {
            output[i] = decodeScalar(bundle, input[i]);
        }
        return output;
    }

    function decodeHash(bundle, input) {
        var output = {};
        for (var key in input) {
            if (input.hasOwnProperty(key)) {
                output[key] = decodeScalar(bundle, input[key]);
            }
        }
        return output;
    }

    function encodeSub(bundle, input) {
        return input._perlito_sub || function(args, want_array) {
            throw new Error('passing javascript functions to perl is not yet supported');
        };
    }

    function encodeScalar(bundle, input) {
        if (typeof input == 'function') {
            return new bundle.runtime.p5CodeRef(encodeSub(bundle, input));
        } else if (input instanceof Array) {
            return new bundle.runtime.p5ArrayRef(encodeArray(bundle, input));
        } else if (input instanceof Object) {
            return new bundle.runtime.p5HashRef(encodeHash(bundle, input));
        } else {
            return input;
        }
    }

    function encodeArray(bundle, input) {
        var output = [];
        for (var i = 0; i < input.length; i++) {
            output[i] = encodeScalar(bundle, input[i]);
        }
        return output;
    }

    function encodeHash(bundle, input) {
        var output = {};
        for (var key in input) {
            if (input.hasOwnProperty(key)) {
                output[key] = encodeScalar(bundle, input[key]);
            }
        }
        return output;
    }

    // utilities ----------------------------------------

    function assign(to /*, ...from*/ ) {
        for (var i = 1; i < arguments.length; i++) {
            for (var key in arguments[i]) {
                if (arguments[i].hasOwnProperty(key)) {
                    to[key] = arguments[i][key];
                }
            }
        }
        return to;
    }

    // PerlPackage class ----------------------------------------

    var PerlPackage = function(pkg_name) {
        this.name = pkg_name;

        // find the bundle this package is in
        for (var i = 0; i < global._perlito.bundles.length; i++) {
            var bundle = global._perlito.bundles[i];
            if (pkg_name in bundle.pkgs) {
                this._bundle = bundle;
                // break; // uncomment if we decide to use the FIRST loaded package rather than the LAST
            }
        }
        if (!this._bundle) {
            throw new Error("Could not find package '" + pkg_name + "' in any of " + global._perlito.bundles.length + " loaded bundles");
        }

        // convenience reference(s)
        this._perlito_package = this._bundle.pkgs[this.name];
    };

    PerlPackage.prototype.sub = function(sub_name, options) {
        var perlito_sub = this._perlito_package[sub_name];
        if (typeof perlito_sub != 'function') {
            throw new Error("Could not find sub '" + sub_name + "' in package '" + this.name + "'");
        }
        return decodeSub(this._bundle, perlito_sub, options);
    };

    // `perl` object ----------------------------------------

    var pkgs = {};
    var perl = {
        pkg: function(pkg_name) {
            return pkgs[pkg_name] = pkgs[pkg_name] || new PerlPackage(pkg_name);
        }
    };

    // Export(s) ----------------------------------------

    global.perl = perl;

})();
