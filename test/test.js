import chai from 'chai';
const expect = chai.expect;
import Sudoku from '../sudoku.js';

describe('test sudoku', function() {

    it('constructor throws error if board argument is set and is not array', () => {
        expect(function() {
            new Sudoku('something');
        }).to.throw('Board is not an array!');
    });

    it('constructor throws error if board argument is set and is not array 9x9', () => {
        expect(function() {
            new Sudoku([]);
        }).to.throw('Array must be 9x9!');
    });

    it('constructor throws error if sudoku is not valid', () => {
        expect(function() {
            new Sudoku([
                [ 6, null, null, null, null, null, 6, 8, null ],
                [ null, null, null, null, 7, 3, null, null, 9 ],
                [ 3, null, 9, null, null, null, null, 4, 5 ],
                [ 4, 9, null, null, null, null, null, null, null ],
                [ 8, null, 3, null, 5, null, 9, null, 2 ],
                [ null, null, null, null, null, null, null, 3, 6 ],
                [ 9, 6, null, null, null, null, 3, null, 8 ],
                [ 7, null, null, 6, 8, null, null, null, null ],
                [ null, 2, 8, null, null, null, null, null, null ],
            ]);
        }).to.throw('Sudoku is not valid!');
    });

    it('should solve the sudoku', () => {
        const sudoku = new Sudoku([
            [ null, null, null, null, null, null, 6, 8, null ],
            [ null, null, null, null, 7, 3, null, null, 9 ],
            [ 3, null, 9, null, null, null, null, 4, 5 ],
            [ 4, 9, null, null, null, null, null, null, null ],
            [ 8, null, 3, null, 5, null, 9, null, 2 ],
            [ null, null, null, null, null, null, null, 3, 6 ],
            [ 9, 6, null, null, null, null, 3, null, 8 ],
            [ 7, null, null, 6, 8, null, null, null, null ],
            [ null, 2, 8, null, null, null, null, null, null ],
        ]);
        const result = sudoku.solve();
        expect(result).to.deep.equal([
            [ 1, 7, 2, 5, 4, 9, 6, 8, 3 ],
            [ 6, 4, 5, 8, 7, 3, 2, 1, 9 ],
            [ 3, 8, 9, 2, 6, 1, 7, 4, 5 ],
            [ 4, 9, 6, 3, 2, 7, 8, 5, 1 ],
            [ 8, 1, 3, 4, 5, 6, 9, 7, 2 ],
            [ 2, 5, 7, 1, 9, 8, 4, 3, 6 ],
            [ 9, 6, 4, 7, 1, 5, 3, 2, 8 ],
            [ 7, 3, 1, 6, 8, 2, 5, 9, 4 ],
            [ 5, 2, 8, 9, 3, 4, 1, 6, 7 ],
        ]);
    });

    it('should throw error if onCellChangeListener argument is not a function', () => {
        expect(function() {
            const sudoku = new Sudoku([
                [ null, null, null, null, null, null, 6, 8, null ],
                [ null, null, null, null, 7, 3, null, null, 9 ],
                [ 3, null, 9, null, null, null, null, 4, 5 ],
                [ 4, 9, null, null, null, null, null, null, null ],
                [ 8, null, 3, null, 5, null, 9, null, 2 ],
                [ null, null, null, null, null, null, null, 3, 6 ],
                [ 9, 6, null, null, null, null, 3, null, 8 ],
                [ 7, null, null, 6, 8, null, null, null, null ],
                [ null, 2, 8, null, null, null, null, null, null ],
            ]);
            sudoku.solveWithDelay('something');
        }).to.throw('Argument onCellChangeListener must be function!');
    });

    it('should throw error if onValueChangeListener argument is not a function', () => {
        expect(function() {
            const sudoku = new Sudoku([
                [ null, null, null, null, null, null, 6, 8, null ],
                [ null, null, null, null, 7, 3, null, null, 9 ],
                [ 3, null, 9, null, null, null, null, 4, 5 ],
                [ 4, 9, null, null, null, null, null, null, null ],
                [ 8, null, 3, null, 5, null, 9, null, 2 ],
                [ null, null, null, null, null, null, null, 3, 6 ],
                [ 9, 6, null, null, null, null, 3, null, 8 ],
                [ 7, null, null, 6, 8, null, null, null, null ],
                [ null, 2, 8, null, null, null, null, null, null ],
            ]);
            sudoku.solveWithDelay(function() {}, 'something');
        }).to.throw('Argument onValueChangeListener must be function!');
    });

    it('should throw error if onFinishListener argument is not a function', () => {
        expect(function() {
            const sudoku = new Sudoku([
                [ null, null, null, null, null, null, 6, 8, null ],
                [ null, null, null, null, 7, 3, null, null, 9 ],
                [ 3, null, 9, null, null, null, null, 4, 5 ],
                [ 4, 9, null, null, null, null, null, null, null ],
                [ 8, null, 3, null, 5, null, 9, null, 2 ],
                [ null, null, null, null, null, null, null, 3, 6 ],
                [ 9, 6, null, null, null, null, 3, null, 8 ],
                [ 7, null, null, 6, 8, null, null, null, null ],
                [ null, 2, 8, null, null, null, null, null, null ],
            ]);
            sudoku.solveWithDelay(function() {}, function() {}, 'something');
        }).to.throw('Argument onFinishListener must be function!');
    });

    it('should solve with delay', function(done) {
        this.timeout(60000);
        const sudoku = new Sudoku([
            [ 1, 7, 2, 5, 4, 9, 6, 8, 3 ],
            [ 6, 4, 5, 8, 7, 3, 2, 1, 9 ],
            [ 3, 8, 9, 2, 6, 1, 7, 4, 5 ],
            [ 4, 9, 6, 3, 2, 7, 8, 5, 1 ],
            [ 8, 1, 3, 4, 5, 6, 9, 7, 2 ],
            [ 2, 5, 7, 1, 9, 8, 4, 3, 6 ],
            [ 9, 6, 4, 7, 1, 5, 3, 2, 8 ],
            [ 7, 3, 1, 6, 8, 2, 5, 9, 4 ],
            [ null, 2, 8, null, null, null, null, null, null ],
        ]);
        sudoku.solveWithDelay(function() {}, function() {}, function(result) {
            expect(result).to.deep.equal([
                [ 1, 7, 2, 5, 4, 9, 6, 8, 3 ],
                [ 6, 4, 5, 8, 7, 3, 2, 1, 9 ],
                [ 3, 8, 9, 2, 6, 1, 7, 4, 5 ],
                [ 4, 9, 6, 3, 2, 7, 8, 5, 1 ],
                [ 8, 1, 3, 4, 5, 6, 9, 7, 2 ],
                [ 2, 5, 7, 1, 9, 8, 4, 3, 6 ],
                [ 9, 6, 4, 7, 1, 5, 3, 2, 8 ],
                [ 7, 3, 1, 6, 8, 2, 5, 9, 4 ],
                [ 5, 2, 8, 9, 3, 4, 1, 6, 7 ],
            ]);
            done();
        }, 1);
    });
});
