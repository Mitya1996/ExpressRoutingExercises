const operations = require('./operations');

test('paramStrToArr', () => {
    expect(operations.paramStrToArr('1,4,55')).toEqual([1,4,55]);
});

test('mean', () => {
    expect(operations.mean([1,4,55])).toBe(20);
});

test('median', () => {
    expect(operations.median([3, 5, 4, 4, 1, 1, 2, 3])).toBe(3);
});

test('mode', () => {
    expect(operations.mode([3, 5, 4, 4, 1, 1, 2, 3])).toEqual([1, 3, 4]);
});

test('integration paramStrToArr() with mean()', () => {
    expect(operations.mean(operations.paramStrToArr('1,4,55'))).toBe(20);
});