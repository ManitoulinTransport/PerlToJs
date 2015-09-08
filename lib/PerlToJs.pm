package PerlToJs;

use 5.010001;
use strict;
use warnings;

our $VERSION = '0.0.1';

# Perl core modules
use Carp;
use Cwd;

# PerlToJs modules
use PerlToJs::Constants;
use PerlToJs::Transpile;
use PerlToJs::Static;

sub getBundleJs {
	my %params = @_;
	my @includes = @{$params{includes}};
	my @modules = @{$params{modules}};
	
	# Process input parameters
	croak "No module(s) were specified" unless @modules;
	@includes = (@INC, PerlToJs::Constants::BASE_PATH . '/Perlito/src5/lib', @includes);
	for (my $i = 0; $i < scalar @includes; $i++){
		-d $includes[$i] or croak "Include path '$includes[$i]' doesn't exist";
		$includes[$i] = Cwd::abs_path($includes[$i]);
	}
	
	# Get transpiled modules	
	my $modules_js = eval { PerlToJs::Transpile::getModulesJs(\@modules, \@includes) };
	croak $@ if $@;

	# Get static javascript
	my $runtime_js = PerlToJs::Static::getRuntimeJs();
	my $link_js = PerlToJs::Static::getLinkJs();

	# Compose output
"/**
 * " . join(', ', @modules) . "
 * Bundled with PerlToJs v$VERSION
 * See https://github.com/zenflow/PerlToJs
 */

(function(){\n\"use strict\";\n$runtime_js\n$modules_js\n$link_js\n})();";

}

sub getInterfaceJs {
"/**
 * PerlToJs v$VERSION interface
 * See https://github.com/zenflow/PerlToJs
 */

" . PerlToJs::Static::getInterfaceJs();
}

1;
