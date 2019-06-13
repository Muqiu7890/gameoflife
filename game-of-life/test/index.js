const core = require('../src/core')
const assert = require('assert');

let cellMatrix = [[0, 0, 1, 0], [1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 1]]
let cellMatrix2 = [[0, 0, 1], [1, 0, 0], [1, 1, 0]]
let cellMatrix3 = [[0, 0, 1], [1, 0, 0], [1, 1, 0], [1, 1, 0]]
const result = JSON.stringify(core.transform(cellMatrix, 4, 4))
const result2 = JSON.stringify(core.transform(cellMatrix2, 3, 3))
const result3 = JSON.stringify(core.transform(cellMatrix3, 4, 3))
describe('#core.js', () => {
    describe('#transform', () => {
        it('transform() test1', () => {
            assert.strictEqual(result, JSON.stringify([[0, 0, 0, 0], [1, 0, 1, 0], [0, 0, 0, 0], [1, 1, 0, 0]]));
        });
        it('transform() test2', () => {
            assert.strictEqual(result2, JSON.stringify([[0, 0, 0], [1, 0, 0], [1, 1, 0]]));
        });
        it('transform() test3', () => {
            assert.strictEqual(result3, JSON.stringify([[0,0,0],[1,0,0],[0,0,0], [1,1,0]]));
        });
    });
});

