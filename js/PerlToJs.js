(function(global){
	"use strict";
	
	// Global stuff
	global._perl_to_js = global._perl_to_js || {bundles: []};
	function getPackage(pkg_name){
		for (var i = 0; i < global._perl_to_js.bundles.length; i++){
			if (typeof global._perl_to_js.bundles[i].pkgs[pkg_name] !== 'undefined'){
				return global._perl_to_js.bundles[i].pkgs[pkg_name];
			}
		}
	}
	
	// Class/Object stuff
	var PerlToJs = global.PerlToJs = function(){
		if (!(this instanceof PerlToJs)){
			return new PerlToJs();
		}
		var self = this;
		// ...
	};
	PerlToJs.prototype.get = function(pkg_name, export_name){
		var pkg = getPackage(pkg_name);
		return function(args){
			return pkg[export_name].apply(null, args);
		}
	};
	
})(typeof window !== 'undefined' ? window : this);
