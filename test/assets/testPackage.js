function testPackage(pkg_name, next){
	var pkg = perl.pkg(pkg_name);
	next(function testSub(sub_name, options, next){
		var sub = pkg.sub(sub_name, options);
		next(function testCase(args, options, expected){
			var actual = sub(args, options);
			var message = 'package: ' + pkg_name + ', sub: ' + sub_name + ', args: ' + JSON.stringify(args) + ', options: ' + JSON.stringify(options);
			isDeeply(actual, expected, message);
		});
	});
}