package Dummy::Simple;

use 5.010001;
use strict;
use warnings;

sub square {
	my ($a) = @_;
	$a * $a
}

sub doubleEach {
	# TODO: `map {"$_$_"} @_;` should be sufficient
	my @input = @_;
	my @output = map {"$_$_"} @input;
	@output;
}

1;