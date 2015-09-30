var getIsBrowser = perl.pkg('Dummy::Isomorphic').sub('getIsBrowser');

ok(getIsBrowser());

console.log('all tests in isomorphic.js passed!');