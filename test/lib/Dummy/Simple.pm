package Dummy::Simple;

use 5.010001;
use strict;
use warnings;

sub square {
	my ($a) = @_;
	$a * $a
}

sub doubleEach {
	my @input = @_;
	my @output = ();
	foreach my $item (@input){
		push(@output, "$item$item");
	}
	@output;
}

1;