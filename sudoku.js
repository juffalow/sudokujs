/**
 *
 */
var sudoku = [];
/**
 *
 */
var emptyCells = [];
/**
 *
 */
var rowRule = [];
/**
 *
 */
var colRule = [];
/**
 *
 */
var squareRule = [];
/**
 *
 *
 * @param  {number} row
 * @param  {number} col
 */
var onCellChange = function(row, col) {};
/**
 *
 *
 * @param  {number} row
 * @param  {number} col
 * @param  {number} value
 */
var onValueChange = function(row, col, value) {};

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
 */
function prepare() {
    for( var i = 0; i < 9; i++ ) {
        rowRule[i] = [ false, false, false, false, false, false, false, false, false ];
        colRule[i] = [ false, false, false, false, false, false, false, false, false ];
        squareRule[i] = [ false, false, false, false, false, false, false, false, false ];
        sudoku[i] = [ null, null, null, null, null, null, null, null, null ];
    }
}

function analyze(input) {
    for( var i = 0; i < 9; i++ ) {
        for( var j = 0; j < 9; j++ ) {
            if( !set(i, j, input[i][j]) ) {
                throw "Sudoku is not valid!";
            }
            if( input[i][j] == null ) {
                emptyCells.push({
                    row: i,
                    col: j
                });
            }
        }
    }
}

function backtrack(index) {
    if( index >= emptyCells.length ) {
        return true;
    }

    onCellChange(emptyCells[index].row, emptyCells[index].col);

    for( var i = 1; i <= 9; i++ ) {
        if( set(emptyCells[index].row, emptyCells[index].col, i) ) {
            onValueChange(emptyCells[index].row, emptyCells[index].col, i);
            if( backtrack(index + 1) ) {
                return true;
            }
        }
    }
    set(emptyCells[index].row, emptyCells[index].col, null);
    return false;
}


/**
 *
 *
 * @param  {number} row
 * @param  {number} col
 * @param  {number} value
 * @return {boolean}
 */
function set(row, col, value) {
    if( value !== null && !canSetValue(row, col, value) ) {
        return false;
    }

    updateRules(row, col, sudoku[row][col], false);
    updateRules(row, col, value, true);
    sudoku[row][col] = value;

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
function updateRules(row, col, value, state) {
    if( value !== null ) {
        rowRule[row][value - 1] = state;
        colRule[col][value - 1] = state;
        squareRule[parseInt(row / 3) + (parseInt(col / 3) * 3)][value - 1] = state;
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
function canSetValue(row, col, value) {
    return !(rowRule[row][value - 1] || colRule[col][value - 1] || squareRule[parseInt(row / 3) + (parseInt(col / 3) * 3)][value - 1]);
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
     * @param  {function} onCellChangeListener
     * @param  {function} onValueChangeListener
     * @return {object}
     */
    constructor(board, onCellChangeListener, onValueChangeListener) {
        checkBoard(board);

        if( typeof onCellChangeListener === "function" ) {
            onCellChange = onCellChangeListener;
        } else if( typeof onCellChangeListener !== "undefined" ) {
            throw "Argument onCellChangeListener must be function!";
        }

        if( typeof onValueChangeListener === "function" ) {
            onValueChange = onValueChangeListener;
        } else if( typeof onValueChangeListener !== "undefined" ) {
            throw "Argument onValueChangeListener must be function!";
        }

        prepare();
        analyze(board);
    }

    solve() {
        backtrack(0);
        return sudoku;
    }

    toString() {
        return sudokuToString();
    }
}
