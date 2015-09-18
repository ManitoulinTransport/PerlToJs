package Dummy::Module;

use 5.010001;
use strict;
use warnings;

use Dummy::Simple;
use Dummy::NotExplicitlyBundled;

sub sumAndDouble {
	2 * Dummy::Simple::sum(@_);
}

sub squareAndDouble {
	2 * Dummy::NotExplicitlyBundled::square(@_);
}

1;