package PerlToJs::Constants;

use 5.010001;
use strict;
use warnings;

# Perl core modules
use Cwd;

# Constants
use constant BASE_PATH => Cwd::abs_path("$INC{'PerlToJs/Constants.pm'}/../../..");
use constant PERLITO_PATH => BASE_PATH . '/Perlito';

1;
