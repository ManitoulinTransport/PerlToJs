# PerlToJs
Perl5-to-Javascript transpiler and interface

## purpose

To make possible the use of Perl5 modules in Javascript code.

This is desirable for three reasons:

1. Some functionality (e.g. validating forms, rendering templates) can be shared between the server and the browser, without the need to write and maintain it in two separate files in two separate languages
2. Legacy codebases in perl can be ported to work on platforms such as nodejs, iojs, and meteor, which are (a) more scalable and (b) more familiar to programmers
3. Complex functionality that would be longwinded to write and difficult to maintain in Javascript can be written in perl and run on any Javascript platform (browser- and or server-side)

This package is currently powered by [Perlito](https://github.com/fglock/Perlito), which transpiles perl to js (among other languages) but (a) lacks a practical interface for using your transpiled code in javascript, (b) lacks documentation, and (c) does not lack bugs.

## usage

#### bundling using the CLI

```
Usage: perl-to-js.pl [options]

Options:
  --include     specify an @INC directory (more than one is allowed)
  --module      specify a module to include in the bundle (at least one is required)
  --output      specify the file to write to [default: STDOUT]
  --help        show this screen
  --version     show the version
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

- add notes in readme about getting set up
- use Carp
- support for passing subs/functions
- support for passing complex data structures

- use CPAN standards for distribution packages
- use @INC for includes (rather than a separate @includes array) and implement @excludes and [additional] @includes
- cache the Perlito runtime & transpiled modules, for persistent consumers (i.e. web apps, as opposed to the one-off command-line interface)

- add PerlObject class
- give perl modules a way of knowing if its running in perl, node, or the browser ("isomorphic" ability)! 
- use node and or a headless browser for automated tests, use Travis CI
- add support for expanding `use` statements (either here or in Perlito)
- move Perlito runtime from each bundle to the singular PerlToJs runtime
- support commonj-esque (i.e. node & browserify) javascript module format

