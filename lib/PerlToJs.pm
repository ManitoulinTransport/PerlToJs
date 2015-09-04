package PerlToJs;

use 5.010001;
use strict;
use warnings;

require Exporter;

our @ISA = qw(Exporter);

our %EXPORT_TAGS = ( 'all' => [ qw(
	bundle
) ] );

our @EXPORT_OK = ( @{ $EXPORT_TAGS{'all'} } );

our $VERSION = '0.0.1';

# Perl core modules
use Cwd;
use File::Slurp;

# CPAN modules
use JavaScript::Minifier::XS 0.05;

# Perlito modules
use lib "$0/../../Perlito/src5/lib";
use Perlito5::Javascript2::Runtime;
use Perlito5::Javascript2::Array;
use Perlito5::Javascript2::CORE;
use Perlito5::Javascript2::IO;
use Perlito5::Javascript2::Sprintf;

# PerlToJs modules
use PerlToJs::Helpers;

sub bundle {
	my %params = @_;
	my @includes = @{$params{includes}};
	my @modules = @{$params{modules}};
	my $debug = $params{debug};
	
	# Process input parameters
	die "No module(s) were specified" unless @modules;
	unshift(@includes, "$0/../../Perlito/src5/lib");
	for (my $i = 0; $i < scalar @includes; $i++){
		-d $includes[$i] or die "Include path '$includes[$i]' doesn't exist";
		$includes[$i] = Cwd::abs_path($includes[$i]);
	}
	
	# Compile each perl module to javascript
	my $base_command = "perl $0/../../Perlito/perlito5.pl -Cjs --noexpand_use " . join('', map {"-I$_ "} @includes);
	my $modules_js = join("\n", map {
		my $input_file = PerlToJs::Helpers::findModule($_, \@includes);
		`$base_command$input_file` . '; '
	} @modules);

	# Get runtime javascript
	my $runtime_js = join("\n", (
		Perlito5::Javascript2::Runtime::emit_javascript2(),
		Perlito5::Javascript2::Array::emit_javascript2(),
		Perlito5::Javascript2::CORE::emit_javascript2(),
		Perlito5::Javascript2::IO::emit_javascript2(),
		Perlito5::Javascript2::Sprintf::emit_javascript2(),
	));
	
	# Get link javascript
	my $link_js = read_file("$0/../../js/link.js");

	# Minify all javascript
	unless ($debug){
		$modules_js = JavaScript::Minifier::XS::minify($modules_js);
		$runtime_js = JavaScript::Minifier::XS::minify($runtime_js);
		$link_js = JavaScript::Minifier::XS::minify($link_js);
	}

	# Compose output
"/**
 * " . join(', ', @modules) ."
 * Bundled with PerlToJs v$VERSION
 * See https://github.com/zenflow/PerlToJs
 */

(function(){\n\"use strict\";\n$runtime_js\n$modules_js\n$link_js\n})();";

}

1;
