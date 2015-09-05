throws(function(){
	perl.pkg('Does::Not::Exist');
}, 'throws error trying to get nonexistent package');

var Dummy_Simple = perl.pkg('Dummy::Simple');
throws(function(){
	Dummy_Simple.sub('doesntexist');
}, 'throws error trying to get nonexistent sub');

var cases = {
	'Dummy::Simple': {
		subs: {
			square: {
				cases: [
					{args: [-3], expected: 9},
					{args: [0], expected: 0},
					{args: [3], expected: 9}
				]
			},
			doubleEach: {
				options: {want: 'array'},
				cases: [
					{args: ['a', 'bb', 333, 4444], expected: ['aa', 'bbbb', '333333', '44444444']},
					{args: ['a', 'bb', 333, 4444], options: {want: 'scalar'}, expected: 4},
					{args: ['a', 'bb', 333, 4444], options: {want: 'hash'}, expected: {aa: 'bbbb', '333333': '44444444'}}
				]
			}
		}
	}
}

for (var pkg_name in cases){
	var pkg = perl.pkg(pkg_name);
	for (var sub_name in cases[pkg_name].subs){
		var sub_options = cases[pkg_name].subs[sub_name].options || {};
		var sub = pkg.sub(sub_name, sub_options);
		var sub_cases = cases[pkg_name].subs[sub_name].cases;
		for (var i = 0; i < sub_cases.length; i++){
			var args = sub_cases[i].args;
			var sub_call_options = sub_cases[i].options || {};
			var actual = sub(args, sub_call_options);
			var expected = sub_cases[i].expected;
			var message = pkg_name + ' ' + sub_name + ' ' + JSON.stringify(sub_options) + ' ' + JSON.stringify(args) + ' ' + JSON.stringify(sub_call_options);
			isDeeply(actual, expected, message);
		}
	}
}

console.log('passed all tests!');
