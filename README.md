# PerlToJs
Perl5-to-Javascript transpiler and interface

## purpose

To make possible the use of Perl5 modules in Javascript code.

This is desirable for two reasons:

1. Some functionality (e.g. validating forms, rendering templates) can be shared between the server and the browser, without the need to write and maintain it in two separate files in two separate languages
2. Server-side functionality can be written in perl and run on any server-side js platform, such as nodejs, iojs, or meteor. This could be a legacy perl codebase, or complex functionality that would be longwinded to write and difficult to maintain in js.

This package is currently powered by [Perlito](https://github.com/fglock/Perlito), which transpiles perl to js (among other languages) but lacks a practical interface for using your transpiled code in javascript.

## usage

#### bundling using the CLI

```
$ perl-to-js.pl help

Usage:
  perl-to-js.pl bundle <module>... [--include <directory>]... [--output <file>]
  perl-to-js.pl interface [--output <file>]
  perl-to-js.pl help [--output <file>]
  perl-to-js.pl version [--output <file>]

Options:
  --include <directory>         an @INC directory (any number allowed)
  --output <file>               the file to write to [default: STDOUT]
```

#### bundling using perl

... See [the CLI script](https://github.com/zenflow/PerlToJs/blob/master/bin/perl-to-js.pl) for now

#### the perl-js interface

... See [the perl dummy module](https://github.com/zenflow/PerlToJs/blob/master/test/lib/Dummy/Simple.pm) and [the javascript test](https://github.com/zenflow/PerlToJs/blob/master/test/assets/tests/simple.js) for now


## requirements

* Perl5 v5.10.1 or higher

## changelog

#### v0.0.1

- Initial alpha release

## todo

- use CPAN standards for distribution packages
- add notes in readme about getting set up
- Dummy::ComplexData and Dummy::Subs

- add PerlObject class
- give perl modules a way of knowing if its running in perl, node, or the browser ("isomorphic" ability)! 
- use node and or a headless browser for automated tests, use Travis CI
- add support for expanding `use` statements (either here or in Perlito)
- move Perlito runtime from each bundle to the singular PerlToJs runtime
- support commonj-esque (i.e. node & browserify) javascript module format

