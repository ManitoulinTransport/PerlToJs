package PerlToJs::Constants;

use 5.010001;
use strict;
use warnings;

require Exporter;

our @ISA = qw(Exporter);

our %EXPORT_TAGS = ( 'all' => [ qw(
	BASE_PATH
) ] );

our @EXPORT_OK = ( @{ $EXPORT_TAGS{'all'} } );

# Perl core modules
use Cwd;

# Constants
use constant BASE_PATH => Cwd::abs_path("$INC{'PerlToJs/Constants.pm'}../../../..");