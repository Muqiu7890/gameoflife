import React, {Component} from 'react';
import './App.css';

//入口
// 矩阵行数
let rows = 4
// 矩阵列数
let cols = 4

let cellMatrix = [[0, 0, 1, 0], [1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 1]]

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        console.log('cellMatrix', cellMatrix)
        this.transform()
        console.log('cellMatrix2', cellMatrix)

    }


    //统计周围细胞数
    findRoundCell(x, y) {
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
        if (x > 0 && y < cols - 1) {
            num += cellMatrix[x - 1][y + 1];
        }
        //左
        if (y > 0) {
            num += cellMatrix[x][y - 1];
        }
        //右
        if (y < cols - 1) {
            num += cellMatrix[x][y + 1];
        }
        //左下
        if (x < rows - 1 && y > 0) {
            num += cellMatrix[x + 1][y - 1];
        }
        //下
        if (x < rows - 1) {
            num += cellMatrix[x + 1][y];
        }
        //右下
        if (x < rows - 1 && y < cols - 1) {
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
    transform() {
        let nextMatrix = [[0,0,0,0], [0,0,0,0], [0,0,0,0] ,[0,0,0,0]]

        for (let x = 0; x < rows; x++) {
            for (let y = 0; y < cols; y++) {
                let currentNum = this.findRoundCell(x,y)
                //若周围细胞数为3 存活
                if(currentNum === 3) {
                    nextMatrix[x][y] = 1
                } else if(currentNum === 2) { // 为2 状态不变
                    nextMatrix[x][y] = cellMatrix[x][y]
                } else { // 其他（小于2 大于3） 死亡
                    nextMatrix[x][y] = 0
                }
            }
        }
        cellMatrix = nextMatrix;
        return nextMatrix;

    }


    //渲染页面
    render() {
        return (
            <div>fff</div>
        );
    }

}

export default App;
