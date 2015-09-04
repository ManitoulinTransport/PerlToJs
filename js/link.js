var global = typeof window !== 'undefined' ? window : this;
global._perlito = global._perlito || {bundles: []};

global._perlito.bundles.push({
	pkgs: p5pkg
});

function write(str){
	console.log(str);
}