var global = typeof window !== 'undefined' ? window : this;
global._perlito = global._perlito || {
    bundles: []
};

global._perlito.bundles.push({
    pkgs: p5pkg,
    runtime: {
        p5a_to_h: p5a_to_h,
        p5list_to_a: p5list_to_a,
        p5context: p5context,
        p5HashRef: p5HashRef,
        p5ArrayRef: p5ArrayRef,
        p5ScalarRef: p5ScalarRef,
        p5GlobRef: p5GlobRef,
        p5CodeRef: p5CodeRef,
    }
});

function write(str) {
    console.log(str);
}
