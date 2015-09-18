package PerlToJs::Transpile;

use 5.010001;
use strict;
use warnings;

# Perl core modules
use Cwd;

# PerlToJs modules
use PerlToJs::Constants;

# Get a module's path, given it's name
sub findModule {
	my ($module_name, $includes) = @_;
	my $module_path = join('/', split('::', $module_name)) . '.pm';
	for my $include (@$includes){
		my $full_path = "$include/$module_path";
		if (-f $full_path){
			return Cwd::abs_path($full_path);
		}
	}
	die "Can't locate '$module_path' in includes (includes contains " . join(' ', @$includes) . ")\n";
}

# Get a transpiled module, given the module path
my %module_js = ();
my $base_command = 'perl ' . PerlToJs::Constants::BASE_PATH . '/Perlito/perlito5.pl -Cjs --noexpand_use ';
sub getModuleJs {
	my ($module_path, $includes) = @_;
	unless (defined $module_js{$module_path}){
		my $includes_switches = join '', map {"-I$_ "} @$includes;
		$module_js{$module_path} = `$base_command$includes_switches$module_path` . '; ';
		die "Perlito exited with error code $?\n" if $?;
	}
	$module_js{$module_path};
}

# Get transpiled modules, given module names and include paths
sub getModulesJs {
	my ($module_names, $includes) = @_;
	join("\n", map {
		my $module_path = eval { findModule($_, $includes) };
		die "Error finding '$_': $@" if $@;
		my $module_js = eval { getModuleJs($module_path, $includes) };
		die "Error transpiling '$_': $@" if $@;
		$module_js;
	} @$module_names);
}

1;
