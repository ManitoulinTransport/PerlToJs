package PerlToJs;

use 5.010001;
use strict;
use warnings;

our $VERSION = '0.0.1';

# Perl core modules
use Carp;
use Cwd;

# PerlToJs modules
use PerlToJs::Helpers;
use PerlToJs::Constants;
use PerlToJs::Static;

sub bundle {
	my %params = @_;
	my @includes = @{$params{includes}};
	my @modules = @{$params{modules}};
	
	# Process input parameters
	croak "No module(s) were specified" unless @modules;
	unshift(@includes, PerlToJs::Constants::BASE_PATH . '/Perlito/src5/lib');
	for (my $i = 0; $i < scalar @includes; $i++){
		-d $includes[$i] or croak "Include path '$includes[$i]' doesn't exist";
		$includes[$i] = Cwd::abs_path($includes[$i]);
	}
	
	# Compile each perl module to javascript
	my $base_command = 'perl ' . PerlToJs::Constants::BASE_PATH . '/Perlito/perlito5.pl -Cjs --noexpand_use ' . join('', map {"-I$_ "} @includes);
	my $modules_js = join("\n", map {
		my $input_file = eval { PerlToJs::Helpers::findModule($_, \@includes) };
		croak $@ if $@;
		my $module_js =  `$base_command$input_file`;
		die "Command exited with error code $?" if $?;
		$module_js . '; ';
	} @modules);

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

1;
