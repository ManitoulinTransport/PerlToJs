(function(){
	"use strict";
	
	// Global stuff ----------------------------------------
	
	var global = typeof window !== 'undefined' ? window : this;
	global._perlito = global._perlito || {bundles: []};
	
	var sub_default_options = {want: 'scalar'};
	function perlSubToJsFunc(bundle, sub, options){
		var sub_options = assign({}, sub_default_options, options || {});
		checkSubOptions(sub_options);
		return function(args, options){
			var sub_call_options = assign({}, sub_options, options || {});
			checkSubOptions(sub_call_options);
			var result = sub.call(null, args, sub_call_options.want == 'array' || sub_call_options.want == 'hash');
			return sub_call_options.want == 'hash' ? arrayToHash(result) : result;
		};
	}
	
	function checkSubOptions(options){
		if (['scalar', 'array', 'hash'].indexOf(options.want) == -1){
			throw new Error("'" + options.want + "' is not a valid option for 'want'");
		}
	}
	
	function arrayToHash(array){
		// TODO: what should this function ACTUALLY be doing? check out some perlito transpiled code doing it
		// my %hash = (1,2,3,4,5,6,7,8); print join(' ', %hash); # prints "1 2 3 4 7 8 5 6" ???
		// and dont forget when you throw `undef` values in the mix...
		if (array.length % 2 != 0){
			throw new Error('cannot convert uneven-numbered array to hash... yet...');
		}
		var hash = {};
		for (var i = 0; i < array.length / 2; i++){
			hash[i*2] = hash[i*2+1];
		}
		return hash;
	}
	
	// utilities ----------------------------------------
	
	function assign(to/*, ...from*/){
		for (var i = 1; i < arguments.length; i++){
			for (var key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					to[key] = arguments[i][key];
				}
			}
		}
		return to;
	}
	
	// PerlToJs class ----------------------------------------
	
	var PerlToJs = function(){
		if (!(this instanceof PerlToJs)){
			return new PerlToJs();
		}
		this._pkgs = {};
	};
	
	PerlToJs.prototype.pkg = function(pkg_name){
		return this._pkgs[pkg_name] = this._pkgs[pkg_name] || new PerlPackage(this, pkg_name);
	}
	
	// PerlPackage class ----------------------------------------
	
	var PerlPackage = function(parent, pkg_name){
		this._parent = parent;
		this.name = pkg_name;
		
		// find the bundle this package is in
		for (var i = 0; i < global._perlito.bundles.length; i++){
			var bundle = global._perlito.bundles[i];
			if (pkg_name in bundle.pkgs){
				this._bundle = bundle;
				// break; // uncomment if we decide to use the FIRST loaded package rather than the LAST
			}
		}
		if (!this._bundle){
			throw new Error("Could not find package '" + pkg_name + "' in any of " + global._perlito.bundles.length + " loaded bundles");
		}
		
		// convenience reference to the Perlito package
		this._package = this._bundle.pkgs[this.name];
	};
	
	PerlPackage.prototype.sub = function(sub_name, options){
		if (typeof this._package[sub_name] != 'function'){
			throw new Error("Could not find sub '" + sub_name + "' in package '" + this.name + "'");
		}
		return perlSubToJsFunc(this._bundle, this._package[sub_name], options);
	};
	
	// Export(s) ----------------------------------------
	
	global.PerlToJs = PerlToJs;
	
})();
