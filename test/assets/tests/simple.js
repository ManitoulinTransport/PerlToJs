var square = perl.pkg('Dummy::Simple').sub('square');
is(square([2]), 4);
is(square(3), 9);
is(square('4'), 16);

var doubleEach = perl.pkg('Dummy::Simple').sub('doubleEach', {want: 'array'});
isDeeply(doubleEach(['a', 'bb', 333, 4444]), ['aa', 'bbbb', '333333', '44444444']);
isDeeply(doubleEach(['a', 'bb', 3333, 4444], {want: 'scalar'}), 4);
isDeeply(doubleEach(['a', 'bb', 333, 4444], {want: 'hash'}), {'aa': 'bbbb', '333333': '44444444'});


/* Use the test harness here? It kinda obscures the API though...
testPackage('Dummy::Simple', function(testSub){
	testSub('square', {}, function(testCase){
		testCase([-3], {}, 9);
		testCase([0], {}, 0);
		testCase(['3'], {}, 9);
	});
	testSub('doubleEach', {want: 'array'}, function(testCase){
		var args = ['a', 'bb', 333, 4444];
		testCase(args, {}, ['aa', 'bbbb', '333333', '44444444']);
		testCase(args, {want: 'scalar'}, 4);
		testCase(args, {want: 'hash'}, {aa: 'bbbb', '333333': '44444444'});
	});
});
*/
