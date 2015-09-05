use Test::More 'no_plan';

BEGIN { use_ok('Dummy::Simple') }

my $square = \&Dummy::Simple::square;
is(&$square(-3), 9);
is(&$square(0), 0);
is(&$square('3'), 9);

my $doubleEach = \&Dummy::Simple::doubleEach;
is_deeply([&$doubleEach('a', 'bb', 333, 4444)], ['aa', 'bbbb', '333333', '44444444']);
is_deeply(scalar &$doubleEach('a', 'bb', 333, 4444), 4);
is_deeply({&$doubleEach('a', 'bb', 333, 4444)}, {'aa' => 'bbbb', '333333' => '44444444'});