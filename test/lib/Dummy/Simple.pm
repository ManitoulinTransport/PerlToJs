package Dummy::Simple;

use 5.010001;
use strict;
use warnings;

sub sum {
	my $sum = 0;
	for (@_) {
		$sum += $_;
	}
	$sum;
}

sub encodeHash {
	my %hash = @_;
	join('&', map {"$_=$hash{$_}"} keys %hash);
}

sub doubleEach {
	map {"$_$_"} @_;
}

1;