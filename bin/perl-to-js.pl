#!/usr/bin/perl -w

# Perl core modules
use Getopt::Long;
use File::Slurp;

# PerlToJs modules
use lib "$0/../../lib";
use PerlToJs;

# Get input parameters
my ($includes, $modules, $debug, $output_file) = ([], [], 0, '');
GetOptions(
	'include=s' => $includes,
	'modules=s' => $modules,
	'debug' => \$debug,
	'output=s' => \$output_file,
);

# Do bundle
my $output = PerlToJs::bundle(
	includes => $includes,
	modules => $modules,
	debug => $debug,
);

# Write output
if ($output_file){
	write_file($output_file, $output);
} else {
	print STDOUT $output;
}