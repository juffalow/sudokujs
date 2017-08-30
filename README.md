# Sudoku solver in JavaScript ( using backtracking )


## Install

```
$ yarn

# or if you use npm

$ npm install
```

## Test

```
$ yarn run test

# or if you use npm

$ npm test
```

## Build

```
$ yarn run build

# or if you use npm

$ npm build
```

## Usage

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Sudoku</title>
    </head>
    <body>
        <script src="./sudoku.min.js"></script>
        <script>
            var board = [
                [ null,    2, null, null, null, null, null, null, null ],
                [ null, null, null,    6, null, null, null, null,    3 ],
                [ null,    7,    4,    null, 8, null, null, null, null ],
                [ null, null, null, null, null,    3, null, null,    2 ],
                [ null,    8, null, null,    4, null, null,    1, null ],
                [    6, null, null,    5, null, null, null, null, null ],
                [ null, null, null, null,    1, null,    7,    8, null ],
                [    5, null, null, null, null,    9, null, null, null ],
                [ null, null, null, null, null, null, null,    4, null ],
            ];

            var sudoku = new Sudoku(board);

            var result = sudoku.solve();

            console.log(result);
        </script>
    </body>
</html>
```
