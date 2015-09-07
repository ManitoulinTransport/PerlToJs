#!/usr/bin/perl -w

use Cwd;
use File::Path;
use File::Copy;
use File::Spec;
use File::Basename;

my $base_path = Cwd::abs_path("$0/../..");

File::Path::make_path("$base_path/test/build");
copy("$base_path/js/PerlToJs.js", "$base_path/test/build/PerlToJs.js") or die $!;
globCopy("$base_path/test/assets", "$base_path/test/build", "* */*");

`perl $base_path/bin/perl-to-js.pl --include $base_path/test/lib --module Dummy::Simple --output $base_path/test/build/bundle.js`;

sub globCopy {
	my ($src, $dest, $glob) = @_;
	my $abs_glob = join(' ', map {"$src/$_"} split(' ', $glob));
	for my $abs_fn (glob($abs_glob)){
		if (-f $abs_fn){
			my $fn = File::Spec->abs2rel($abs_fn, $src);
			my (undef, $dir, undef) = File::Basename::fileparse("$dest/$fn");
			File::Path::make_path($dir);
			copy("$src/$fn", "$dest/$fn") or die $!;
		}
	}
}