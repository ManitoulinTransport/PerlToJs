throws(function(){
	perl.pkg('Does::Not::Exist');
}, 'throws error trying to get nonexistent package');

var Dummy_Simple = perl.pkg('Dummy::Simple');
throws(function(){
	Dummy_Simple.sub('doesntexist');
}, 'throws error trying to get nonexistent sub');

console.log('all tests in extra.js passed!');