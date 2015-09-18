package Dummy::NotExplicitlyBundled;

use 5.010001;
use strict;
use warnings;

sub square {
	my ($number) = @_;
	$number**2;
}

1;