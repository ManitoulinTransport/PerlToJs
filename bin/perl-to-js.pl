#!/usr/bin/perl -w

# Perl core modules
use Getopt::Long;
use File::Slurp;

# PerlToJs modules
use lib "$0/../../lib";
use PerlToJs;

# Get input parameters
my ($includes, $modules, $output_file, $show_help, $show_version) = ([], [], '', 0, 0);
GetOptions(
	'include=s' => $includes,
	'modules=s' => $modules,
	'output=s' => \$output_file,
	'help' => \$show_help,
	'version' => \$show_version,
);

if ($show_help){
	print "
Usage: perl-to-js.pl [options]

Options:
  --include	specify an \@INC directory (more than one is allowed)
  --module	specify a module to include in the bundle (at least one is required)
  --output	specify the file to write to [default: STDOUT]
  --help	show this screen
  --version	show the version
";
	exit;
}

if ($show_version){
	print "\nPerlToJs v$PerlToJs::VERSION\n\nCopyright (c) 2015 Matthew Francis Brunetti, Manitoulin Transport Inc., et al\n";
	exit;
}

# Do bundle
my $output = PerlToJs::bundle(
	includes => $includes,
	modules => $modules,
);

# Write output
if ($output_file){
	write_file($output_file, $output);
} else {
	print STDOUT $output;
}