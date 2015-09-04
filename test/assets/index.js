var perl = PerlToJs();

throws(function(){
	perl.pkg('Does::Not::Exist');
});

var Dummy_Simple = perl.pkg('Dummy::Simple');

throws(function(){
	Dummy_Simple.sub('doesntexist');
});

var square = Dummy_Simple.sub('square');

for (var i = 0; i < 10; i++){
	is(square([i]), i*i);
}

console.log('passed all tests!');
