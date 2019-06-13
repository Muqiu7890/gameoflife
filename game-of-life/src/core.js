//统计周围细胞数
// * * *
// * x *
// * * *
// 计算出x位置周围存活的细胞数

function findRoundCell(x, y, cellMatrix, rows, cols) {
    let num = 0;
    //左上
    if (x > 0 && y > 0) {
        num += cellMatrix[x - 1][y - 1];
    }
    //正上
    if (x > 0) {
        num += cellMatrix[x - 1][y];
    }
    //右上
    if (x > 0 && y + 1 < cols) {
        num += cellMatrix[x - 1][y + 1];
    }
    //左
    if (y > 0) {
        num += cellMatrix[x][y - 1];
    }
    //右
    if (y + 1 < cols) {
        num += cellMatrix[x][y + 1];
    }
    //左下
    if (x + 1 < rows && y > 0) {
        num += cellMatrix[x + 1][y - 1];
    }
    //下
    if (x + 1 < rows) {
        num += cellMatrix[x + 1][y];
    }
    //右下
    if (x + 1 < rows && y + 1 < cols) {
        num += cellMatrix[x + 1][y + 1];

    }
    return num;
}

/**
 * 上一个状态到下一个状态的转移
 * 根据规则总结出两条规则：
 * 1. 对于周围活着的细胞为3的情况， 下一个细胞总是为活。
 * 2. 对于周围活着的细胞为2的情况， 下一状态与上一状态一样。
 */
function transform(cellMatrix, rows, cols) {
    let nextMatrix = [];
    for (let x = 0; x < rows; x++) {
        nextMatrix[x] = [];
        for (let y = 0; y < cols; y++) {
            let currentNum = findRoundCell(x, y, cellMatrix, rows, cols)
            //若周围细胞数为3 存活
            if (currentNum === 3) {
                nextMatrix[x][y] = 1
            } else if (currentNum === 2) { // 为2 状态不变
                nextMatrix[x][y] = cellMatrix[x][y]
            } else { // 其他（小于2 大于3） 死亡
                nextMatrix[x][y] = 0
            }
        }
    }
    return nextMatrix
}

module.exports = {
    transform
}
