import React, {Component} from 'react';
import './App.css';

//入口
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cellMatrix: [],
            rows: 100,
            cols: 100,
            timerId: 0,
            pause: false,
            displayMatrix: false
        };

        this.initMatrix = this.initMatrix.bind(this);
        this.transform = this.transform.bind(this);
    }

    /**
     * 随机初始化矩阵信息
     */
    initMatrix() {
        let matrix = [];
        for (let i = 0; i < this.state.rows; i++) {
            matrix[i] = [];
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
        const {cellMatrix, cols, rows} = this.state
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
    transform() {
        let nextMatrix = [];
        const {rows, cols, cellMatrix} = this.state;
        for (let x = 0; x < rows; x++) {
            nextMatrix[x] = [];
            for (let y = 0; y < cols; y++) {
                let currentNum = this.findRoundCell(x, y)
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
        this.setState({cellMatrix: nextMatrix})
    }

    startGame() {
        this.initMatrix()
        this.setState({displayMatrix: true}, () => {
            this.updateInterval('low',this.transform)
        })
    }

    nextStatus() {
        this.transform()
    }

    pauseGame() {
        if (this.state.pause) {
            this.setState({pause: false}, () => {
                this.updateInterval('fast',this.transform)
            })
        } else {
            this.setState({pause: true}, () => {
                clearInterval(this.state.timerId);
            })
        }

    }

    updateInterval(status,callback) {
        switch(status){
            case 'low':
                clearInterval(this.state.timerId);
                this.setState({timerId: setInterval(function () {callback()}, 1000)});
                break;
            case 'middle':
                clearInterval(this.state.timerId);
                this.setState({timerId: setInterval(function () {callback()}, 500)});
                break;
            case 'fast':
                clearInterval(this.state.timerId);
                this.setState({timerId: setInterval(function () {callback()}, 300)});
                break;
        }
        // let timerId = setInterval(() => {
        //     callback()
        // }, status)
        // this.setState({timerId});
    }


    initRows(e) {
        this.setState({rows: e.target.value})
    }

    initCols(e) {
        this.setState({cols: e.target.value})
    }

    //渲染页面
    render() {
        const {pause, rows, cellMatrix, cols, displayMatrix} = this.state
        return (
            <div className='game-of-life'>
                <div className='game-title'>Game of Life</div>
                <button className='game-button' onClick={this.startGame.bind(this)}>start</button>
                <button className='game-button' onClick={this.pauseGame.bind(this)}>{pause ? 'continue' : 'pause'}</button>
                <button className='game-button' onClick={this.nextStatus.bind(this)}>next</button>
                <span className='list-item'>行数：</span><input value={rows} onChange={this.initRows.bind(this)}/>
                <span className='list-item'>列数：</span><input value={cols} onChange={this.initCols.bind(this)}/>
                <span className='list-item'>变化速度：</span><button className='game-button' onClick={this.updateInterval.bind(this,'low',this.transform)}>low</button>
                <button className='game-button' onClick={this.updateInterval.bind(this,'middle',this.transform)}>middle</button>
                <button className='game-button' onClick={this.updateInterval.bind(this,'fast',this.transform)}>fast</button>
                {
                    cellMatrix.map((row, i) =>
                        <div key={i} className="game-row">
                            {
                                row.map((col, j) =>
                                    <div key={j}
                                         className={'square ' + (cellMatrix[i][j] ? 'live' : 'dead')}
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
