/**
 * Checks whether array is valid sudoku array, i.e. 9x9.
 *
 * @param  {array} arr
 * @throws Throws error if argument is not an array
 * @throws Throws error if argument is not 2d array of size 9x9
 */
function checkBoard(board) {
    if( board.constructor !== Array ) {
        throw "Board is not an array!";
    }

    if( board.length !== 9 ) {
        throw "Array must be 9x9!";
    }

    for( var i = 0; i < board.length; i++ ) {
        if( board[i].length !== 9 ) {
            throw "Array must be 9x9!";
        }
    }
}

/**
 *
 * @author Matej 'juffalow' Jellus <juffalow@juffalow.com>
 * @version 1.0.0
 */
export default class Sudoku {

    /**
     *
     *
     * @param  {array} board
     * @return {object}
     */
    constructor(board) {
        /**
         *
         */
        this._sudoku = [];
        /**
         *
         */
        this._emptyCells = [];
        /**
         *
         */
        this._rowRule = [];
        /**
         *
         */
        this._colRule = [];
        /**
         *
         */
        this._squareRule = [];
        /**
         *
         */
        this._sleep = 0;
        /**
         *
         *
         * @param  {number} row
         * @param  {number} col
         */
        var _onCellChange = function(row, col) {};
        /**
         *
         *
         * @param  {number} row
         * @param  {number} col
         * @param  {number} value
         */
        var _onValueChange = function(row, col, value) {};
        /**
         *
         *
         * @param  {array} result
         */
        var _onFinish = function(result) {};

        checkBoard(board);
        this._prepare();
        this._analyze(board);
    }

    solve() {
        this._backtrack(0);
        return this._sudoku;
    }

    /**
     *
     *
     * @param  {function} onCellChangeListener
     * @param  {function} onValueChangeListener
     * @param  {function} onFinishListener
     * @param  {number} delay
     */
    solveWithDelay(onCellChangeListener, onValueChangeListener, onFinishListener, delay) {
        if( typeof onCellChangeListener === "function" ) {
            this._onCellChange = onCellChangeListener;
        } else {
            throw "Argument onCellChangeListener must be function!";
        }

        if( typeof onValueChangeListener === "function" ) {
            this._onValueChange = onValueChangeListener;
        } else {
            throw "Argument onValueChangeListener must be function!";
        }

        if( typeof onFinishListener === "function" ) {
            this._onFinish = onFinishListener;
        } else {
            throw "Argument onFinishListener must be function!";
        }

        this._sleep = delay || 0;

        this._nonRecursiveBacktrack(0);
    }


    /**
     *
     */
    _prepare() {
        for( var i = 0; i < 9; i++ ) {
            this._rowRule[i] = [ false, false, false, false, false, false, false, false, false ];
            this._colRule[i] = [ false, false, false, false, false, false, false, false, false ];
            this._squareRule[i] = [ false, false, false, false, false, false, false, false, false ];
            this._sudoku[i] = [ null, null, null, null, null, null, null, null, null ];
        }
    }

    _analyze(input) {
        for( var i = 0; i < 9; i++ ) {
            for( var j = 0; j < 9; j++ ) {
                if( !this._set(i, j, input[i][j]) ) {
                    throw "Sudoku is not valid!";
                }
                if( input[i][j] === null ) {
                    this._emptyCells.push({
                        row: i,
                        col: j
                    });
                }
            }
        }
    }

    _backtrack(index) {
        if( index >= this._emptyCells.length ) {
            return true;
        }

        for( var i = 1; i <= 9; i++ ) {
            if( this._set(this._emptyCells[index].row, this._emptyCells[index].col, i) ) {
                if( this._backtrack(index + 1) ) {
                    return true;
                }
            }
        }
        this._set(this._emptyCells[index].row, this._emptyCells[index].col, null);
        return false;
    }

    _nonRecursiveBacktrack(step) {
        if( step >= this._emptyCells.length ) {
            this._onFinish(this._sudoku);
            return;
        }

        setTimeout(function() {
            this._onCellChange(this._emptyCells[step].row, this._emptyCells[step].col);
            for( var i = 0 + this._sudoku[this._emptyCells[step].row][this._emptyCells[step].col] + 1; i <= 9; i++ ) {
                if( this._set(this._emptyCells[step].row, this._emptyCells[step].col, i) ) {
                    this._onValueChange(this._emptyCells[step].row, this._emptyCells[step].col, i);
                    this._nonRecursiveBacktrack(step + 1);
                    return;
                }
            }
            if( step > 0 ) {
                this._set(this._emptyCells[step].row, this._emptyCells[step].col, null);
                this._onValueChange(this._emptyCells[step].row, this._emptyCells[step].col, null);
                this._nonRecursiveBacktrack(step - 1);
            }
        }.bind(this), this._sleep);
    }

    /**
     *
     *
     * @param  {number} row
     * @param  {number} col
     * @param  {number} value
     * @return {boolean}
     */
    _set(row, col, value) {
        if( value !== null && !this._canSetValue(row, col, value) ) {
            return false;
        }

        this._updateRules(row, col, this._sudoku[row][col], false);
        this._updateRules(row, col, value, true);
        this._sudoku[row][col] = value;

        return true;
    }

    /**
     *
     *
     * @param  {number} row
     * @param  {number} col
     * @param  {number} value
     * @param  {boolean} state
     */
    _updateRules(row, col, value, state) {
        if( value !== null ) {
            this._rowRule[row][value - 1] = state;
            this._colRule[col][value - 1] = state;
            this._squareRule[parseInt(row / 3) + (parseInt(col / 3) * 3)][value - 1] = state;
        }
    }

    /**
     *
     *
     * @param  {number} row
     * @param  {number} col
     * @param  {number} value
     * @return {boolean}
     */
    _canSetValue(row, col, value) {
        return !(this._rowRule[row][value - 1] || this._colRule[col][value - 1] || this._squareRule[parseInt(row / 3) + (parseInt(col / 3) * 3)][value - 1]);
    }
}
