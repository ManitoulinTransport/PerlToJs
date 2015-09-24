# PerlToJs
Perl5 modules in javascript

## purpose

To make possible the use of Perl5 modules in Javascript code.

This is desirable for at least two reasons (in context of web development):

1. Some functionality (e.g. validating forms, rendering templates) can be shared between the server and the browser/client, without the need to write and maintain it in two separate files in two separate languages
2. Server-side functionality can be written in perl and run on any server-side javascript platform, such as nodejs, iojs, or meteor. This could be a legacy perl codebase, or complex functionality that would be longwinded to write and difficult to maintain in javascript.

This package is currently powered by [Perlito](https://github.com/fglock/Perlito), which transpiles perl to js (among other languages) but lacks a practical interface for using your transpiled code in javascript.

## usage

#### bundling using the CLI

```
$ perltojs.pl help

Usage:
  perltojs.pl bundle <module>... [--include <directory>]... [--output <file>]
  perltojs.pl interface [--output <file>]
  perltojs.pl help [--output <file>]
  perltojs.pl version [--output <file>]

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

- support for expanding `use` statements
- support `use parent`, `use constant`
- support `require`

- expose packages on `perl`, no need for `pkg` function
- expose `sub` AND `method` methods on PerlPackage
- require `sub` (or `method`) args to be in the form of a list (array or hash)
- add PerlReference class

- implement singular runtime+interface, include perlito compiler
- bundle implicit dependencies (except for those in @external)

- use CPAN standards for distribution packages
- documentation
- give perl modules a way of knowing if its running in perl, node, or the browser ("isomorphic" ability)! 
- use node and or a headless browser for automated tests, use Travis CI
- support commonj-esque (i.e. node & browserify) javascript module format

