var sortArraysByLength = perl.pkg('Dummy::Complex').sub('sortArraysByLength', {want: 'array'});
isDeeply(sortArraysByLength([[1, 2, 3], [4], [5, 6]]), [[4], [5, 6], [1, 2, 3]]);

console.log('all tests in complex.js passed!');