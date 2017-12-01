var sum = perl.pkg('Dummy::Simple').sub('sum');
is(sum(), 0);
is(sum(2), 2);
is(sum([3, 4]), 7);

var encodeHash = perl.pkg('Dummy::Simple').sub('encodeHash');
is(encodeHash({
    a: 1,
    b: 2
}), 'a=1&b=2');
is(encodeHash(['a', 1, 'b', 2]), 'a=1&b=2');

var doubleEach = perl.pkg('Dummy::Simple').sub('doubleEach', {
    want: 'array'
});
isDeeply(doubleEach(['a', 'b', 3, 4]), ['aa', 'bb', '33', '44']);
isDeeply(doubleEach(['a', 'b', 3, 4], {
    want: 'scalar'
}), 4);
isDeeply(doubleEach(['a', 'b', 3, 4], {
    want: 'hash'
}), {
    'aa': 'bb',
    '33': '44'
});

console.log('all tests in simple.js passed!');
