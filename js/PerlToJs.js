(function(){
	"use strict";
	
	// Global stuff
	var global = typeof window !== 'undefined' ? window : this;
	global._perlito = global._perlito || {bundles: []};
	
	function perlSubToJsFunc(bundle, sub){
		return function(args){
			return sub.apply(null, args);
		};
	}
	
	// PerlToJs class
	var PerlToJs = function(){
		if (!(this instanceof PerlToJs)){
			return new PerlToJs();
		}
		this._pkgs = {};
	};
	PerlToJs.prototype.pkg = function(pkg_name){
		return this._pkgs[pkg_name] = this._pkgs[pkg_name] || new PerlPackage(this, pkg_name);
	}
	
	// PerlPackage class
	var PerlPackage = function(parent, pkg_name){
		this._parent = parent;
		this.name = pkg_name;
		this._subs = {};
		
		// find the bundle this package is in
		for (var i = 0; i < global._perlito.bundles.length; i++){
			var bundle = global._perlito.bundles[i];
			if (pkg_name in bundle.pkgs){
				this._bundle = bundle;
				break;
			}
		}
		if (!this._bundle){
			throw new Error("Could not find package '" + pkg_name + "' in any of " + global._perlito.bundles.length + " loaded bundles");
		}
	};
	PerlPackage.prototype.sub = function(sub_name){
		if (!this._subs[sub_name]){
			var sub = this._bundle.pkgs[this.name][sub_name];
			if (typeof sub != 'function'){
				throw new Error("Could not find sub '" + sub_name + "' in package '" + this.name + "'");
			}
			this._subs[sub_name] = perlSubToJsFunc(this._bundle, sub);
		}
		return this._subs[sub_name];
	};
	
	// Export(s)
	global.PerlToJs = PerlToJs;
})();
