#!/usr/bin/perl -w

use File::Copy;
use File::Spec;

mkdir "$0/../build";

copy("$0/../../js/PerlToJs.js", "$0/../build/PerlToJs.js") or die $!;
globCopy("$0/../assets", "$0/../build", "*");

`perl $0/../../bin/perl-to-js.pl --include $0/../lib --module Dummy::Simple --output $0/../build/bundle.js --debug`;
`perl $0/../../bin/perl-to-js.pl --include $0/../lib --module Dummy::Simple --output $0/../build/bundle.min.js`;


sub globCopy {
	my ($src, $dest, $glob) = @_;
	for my $fn (glob("$src/$glob")){
		my $rel_fn = File::Spec->abs2rel($fn, $src);
		copy("$src/$rel_fn", "$dest/$rel_fn") or die $!;
	}
}