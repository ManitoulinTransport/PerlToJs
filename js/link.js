(function(global){
	"use strict";
	global._perl_to_js = global._perl_to_js || {bundles: []};
	global._perl_to_js.bundles.push({pkgs: p5pkg});
})(typeof window !== 'undefined' ? window : this);
