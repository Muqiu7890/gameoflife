import React, {Component} from 'react';
import './App.css';

//入口
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cellMatrix: [],
            rows: 3,
            cols: 3,
            displayMatrix: false,
            timerId: 0,
            pause: false
        };

        this.initMatrix = this.initMatrix.bind(this);
        this.transform = this.transform.bind(this);
    }

    /**
     * 随机初始化矩阵信息
     */
    initMatrix() {
        let matrix = new Array(this.state.rows);
        for (let i = 0; i < this.state.rows; i++) {
            matrix[i] = new Array(this.state.cols);
            for (let j = 0; j < this.state.cols; j++) {
                matrix[i][j] = this.random();
            }
        }
        this.setState({cellMatrix: matrix});
    }

    // 随机函数 0，1
    random() {
        let num = Math.random();
        if (num > 0.5)
            return 1;
        return 0;
    }


    //统计周围细胞数
    findRoundCell(x, y) {
        let num = 0;
        //左上
        if (x > 0 && y > 0) {
            num += this.state.cellMatrix[x - 1][y - 1];
        }
        //正上
        if (x > 0) {
            num += this.state.cellMatrix[x - 1][y];
        }
        //右上
        if (x > 0 && y + 1 < this.state.cols) {
            num += this.state.cellMatrix[x - 1][y + 1];
        }
        //左
        if (y > 0) {
            num += this.state.cellMatrix[x][y - 1];
        }
        //右
        if (y + 1 < this.state.cols) {
            num += this.state.cellMatrix[x][y + 1];
        }
        //左下
        if (x + 1 < this.state.rows && y > 0) {
            num += this.state.cellMatrix[x + 1][y - 1];
        }
        //下
        if (x + 1 < this.state.rows) {
            num += this.state.cellMatrix[x + 1][y];
        }
        //右下
        if (x + 1 < this.state.rows && y + 1 < this.state.cols) {
            num += this.state.cellMatrix[x + 1][y + 1];

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
        let nextMatrix = new Array(this.state.rows);
        for (let x = 0; x < this.state.rows; x++) {
            nextMatrix[x] = new Array(this.state.cols);
            for (let y = 0; y < this.state.cols; y++) {
                let currentNum = this.findRoundCell(x, y)
                //若周围细胞数为3 存活
                if (currentNum === 3) {
                    nextMatrix[x][y] = 1
                } else if (currentNum === 2) { // 为2 状态不变
                    nextMatrix[x][y] = this.state.cellMatrix[x][y]
                } else { // 其他（小于2 大于3） 死亡
                    nextMatrix[x][y] = 0
                }
            }
        }
        this.setState({cellMatrix: nextMatrix})
    }

    startGame() {
        this.initMatrix()
        this.setState({displayMatrix: true}, () => {
            this.updateInterval(this.transform)
        })

    }

    nextStatus() {
        this.transform()
    }

    pauseGame() {
        if (this.state.pause) {
            this.setState({pause: false}, () => {
                this.updateInterval(this.transform)
            })
        } else {
            this.setState({pause: true}, () => {
                clearInterval(this.state.timerId);
            })
        }

    }

    updateInterval(callback) {
        let timerId = setInterval(() => {
            callback()
        }, 1000)
        this.setState({timerId});
    }


    initRows(e) {
        this.setState({rows: e.target.value})
    }

    initCols(e) {
        this.setState({cols: e.target.value})
    }


    //渲染页面
    render() {
        return (
            <div>
                <button onClick={this.startGame.bind(this)}>start</button>
                <button onClick={this.pauseGame.bind(this)}>{this.state.pause ? 'continue' : 'pause'}</button>
                <button onClick={this.nextStatus.bind(this)}>next</button>
                行数：<input value={this.state.rows} onChange={this.initRows.bind(this)}/>
                列数：<input value={this.state.cols} onChange={this.initCols.bind(this)}/>

                {
                    this.state.displayMatrix && this.state.cellMatrix.map((row, i) =>
                        <div key={i} className="game-row">
                            {
                                row.map((col, j) =>
                                    <div key={j}
                                         className={'square ' + (this.state.cellMatrix[i][j] ? 'live' : 'dead')}
                                         id={i * this.state.cols + j}/>
                                )}
                        </div>
                    )
                }

            </div>
        );
    }

}

export default App;
