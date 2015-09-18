var sumAndDouble = perl.pkg('Dummy::Module').sub('sumAndDouble');
ok(sumAndDouble([2, 3]), 10);

var squareAndDouble = perl.pkg('Dummy::NotExplicitlyBundled').sub('squareAndDouble');
ok(squareAndDouble(3), 18);

console.log('all tests in modules.js passed!');