#!/usr/bin/perl -w

use File::Copy;

mkdir "$0/../build";

copy("$0/../../js/PerlToJs.js", "$0/../build/PerlToJs.js");
copy("$0/../assets/index.js", "$0/../build/index.js");
copy("$0/../assets/index.html", "$0/../build/index.html");

`perl $0/../../bin/perl-to-js.pl --include $0/../lib --module Dummy::Simple --output $0/../build/bundle.js --debug`;
`perl $0/../../bin/perl-to-js.pl --include $0/../lib --module Dummy::Simple --output $0/../build/bundle.min.js`;