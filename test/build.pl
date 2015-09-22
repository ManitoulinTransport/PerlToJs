#!/usr/bin/perl -w

use Cwd;
use File::Path;
use File::Copy;
use File::Spec;
use File::Basename;

my $base_path = Cwd::abs_path("$0/../..");

File::Path::make_path("$base_path/test/build");
`perl $base_path/bin/perltojs.pl bundle Dummy::Simple Dummy::Complex Dummy::Module --include $base_path/test/lib --output $base_path/test/build/bundle.js`;
`perl $base_path/bin/perltojs.pl interface --output $base_path/test/build/interface.js`;
globCopy("$base_path/test/assets", "$base_path/test/build", "* */*");

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