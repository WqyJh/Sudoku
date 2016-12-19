var a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var randomComparator = function (a, b) {
  return 0.5 - Math.random();
};
var sudoku = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function checkColumn(col, x) {
  for (var i = 0; i < 9; i++) {
    if (sudoku[i][col] === x) {
      return false;
    }
  }
  // console.log("check column true");
  return true;
}

function checkRow(row, x) {
  for (var j = 0; j < 9; j++) {
    if (sudoku[row][j] === x) {
      return false;
    }
  }
  // console.log("check row true");
  return true;
}

function checkBlock(row, col, x) {
  var startRow = Math.floor(row / 3) * 3;
  var startCol = Math.floor(col / 3) * 3;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (sudoku[startRow + i][startCol + j] === x) {
        return false;
      }
    }
  }
  // console.log("check block true");
  return true;
}

function check(i, j, x) {
  return checkRow(i, x) && checkColumn(j, x) && checkBlock(i, j, x);
}

function columnOK(col) {
  var sum = 0;
  for (var i = 0; i < 9; i++) {
    sum += sudoku[i][col];
  }
  return sum === 45;
}

function columnsOK() {
  for (var j = 0; j < 9; j++) {
    if (!columnOK(j)) {
      return false;
    }
  }
  return true;
}

function rowOK(row) {
  var sum = 0;
  for (var j = 0; j < 9; j++) {
    sum += sudoku[row][j];
  }
  return sum === 45;
}

function rowsOK() {
  for (var i = 0; i < 9; i++) {
    if (!rowOK(i)) {
      return false;
    }
  }
  return true;
}

function blockOK(n) {
  var startRow = Math.floor((n - 1) / 3) * 3;
  var startCol = (n - 1) % 3 * 3;
  var sum = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      sum += sudoku[startRow + i][startCol + j];
    }
  }
  return sum === 45;
}

function blocksOK() {
  for (var i = 1; i <= 9; i++) {
    if (!blockOK(i)) {
      return false;
    }
  }
  return true;
}

function sudokuOK() {
  return columnsOK() && rowsOK() && blocksOK();
}

function tryit(i, j) {
  // console.log("i: " + i + " j: " + j);
  if (i >= 9) {
    return true;
  }
  var s = i;
  var t = j + 1;
  if (t >= 9) {
    t -= 9;
    s++;
  }
  if (sudoku[i][j] !== 0) {
    var success = tryit(s, t);
    if (success) {
      return true;
    }
  }
  // console.log("s: " + s + " t: " + t);
  for (var k = 0; k < 9; k++) {
    if (check(i, j, a[k])) {
      sudoku[i][j] = a[k];
      var success = tryit(s, t);
      if (success) {
        return true;
      }
      sudoku[i][j] = 0;
    }
  }
  return false;
}

function setBlockRandomly(n) {
  var startRow = Math.floor((n - 1) / 3) * 3;
  var startCol = (n - 1) % 3 * 3;
  a.sort(randomComparator);
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      sudoku[startRow + i][startCol + j] = a[i * 3 + j];
    }
  }
}

function fill() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      sudoku[i][j] = 0;
    }
  }
}

function createSudoku() {
  fill();
  setBlockRandomly(3);
  setBlockRandomly(5);
  setBlockRandomly(7);
  a.sort(randomComparator);
  var success = tryit(0, 0);
  return success;
}

(function test() {
  createSudoku();
  console.log(sudokuOK());
  console.log(sudoku);
})();