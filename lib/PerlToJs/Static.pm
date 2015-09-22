package PerlToJs::Static;

use 5.010001;
use strict;
use warnings;

# Perl core modules
use File::Slurp;

# PerlToJs modules
use PerlToJs::Constants;

# Perlito modules
use lib PerlToJs::Constants::PERLITO_PATH . '/src5/lib';
use Perlito5::Javascript2::Runtime;
use Perlito5::Javascript2::Array;
use Perlito5::Javascript2::CORE;
use Perlito5::Javascript2::IO;
use Perlito5::Javascript2::Sprintf;

my $runtime_js = undef;
sub getRuntimeJs {
	unless (defined $runtime_js){
		$runtime_js = join("\n", (
			Perlito5::Javascript2::Runtime::emit_javascript2(),
			Perlito5::Javascript2::Array::emit_javascript2(),
			Perlito5::Javascript2::CORE::emit_javascript2(),
			Perlito5::Javascript2::IO::emit_javascript2(),
			Perlito5::Javascript2::Sprintf::emit_javascript2(),
		));
	}
	$runtime_js;
}

my $link_js = undef;
sub getLinkJs {
	unless (defined $link_js){
		$link_js = read_file(PerlToJs::Constants::BASE_PATH . '/js/link.js');
	}
	$link_js;
}

my $interface_js = undef;
sub getInterfaceJs {
	unless (defined $interface_js){
		$interface_js = read_file(PerlToJs::Constants::BASE_PATH . '/js/interface.js');
	}
	$interface_js;
}

1;
