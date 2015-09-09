var global = typeof window !== 'undefined' ? window : this;
global._perlito = global._perlito || {bundles: []};

global._perlito.bundles.push({
	pkgs: p5pkg,
	runtime: {
		p5a_to_h: p5a_to_h,
		p5list_to_a: p5list_to_a,
		p5context: p5context,
	}
});

function write(str){
	console.log(str);
}