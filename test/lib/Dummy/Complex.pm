package Dummy::Complex;

use 5.010001;
use strict;
use warnings;

sub sortArraysByLength {
	sort {@$a <=> @$b} @_;
}

1;