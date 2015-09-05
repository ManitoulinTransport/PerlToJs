#!/usr/bin/perl -w

use File::Copy;
use File::Spec;
use File::Basename;

-d "$0/../build" or mkdir "$0/../build" or die $!;
copy("$0/../../js/PerlToJs.js", "$0/../build/PerlToJs.js") or die $!;
globCopy("$0/../assets", "$0/../build", "* */*");

`perl $0/../../bin/perl-to-js.pl --include $0/../lib --module Dummy::Simple --output $0/../build/bundle.js`;

sub globCopy {
	my ($src, $dest, $glob) = @_;
	my $abs_glob = join(' ', map {"$src/$_"} split(' ', $glob));
	for my $abs_fn (glob($abs_glob)){
		if (-f $abs_fn){
			my $fn = File::Spec->abs2rel($abs_fn, $src);
			my (undef, $dir, undef) = fileparse("$dest/$fn");
			-d $dir or mkdir $dir or die $!;
			copy("$src/$fn", "$dest/$fn") or die $!;
		}
	}
}