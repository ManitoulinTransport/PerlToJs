package PerlToJs::Helpers;

use 5.010001;
use strict;
use warnings;

require Exporter;

our @ISA = qw(Exporter);

our %EXPORT_TAGS = ( 'all' => [ qw(
	findModule
) ] );

our @EXPORT_OK = ( @{ $EXPORT_TAGS{'all'} } );


sub findModule {
	my ($module, $includes) = @_;
	
	my $module_path = join('/', split('::', $module)) . '.pm';
	
	for my $include (@$includes){
		my $full_path = "$include/$module_path";
		if (-f $full_path){
			return $full_path;
		}
	}
	
	die "Can't locate '$module_path' in includes (includes contains " . join(' ', @$includes) . ")";
}

1;
