export function isValid(board, row, col, k) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
    const n = 3 * Math.floor(col / 3) + (i % 3)
    if (
      (board[row][i] === k && i !== col) ||
      (board[i][col] === k && i !== row) ||
      (board[m][n] === k && m !== row && n !== col)
    ) {
      return false
    }
  }
  return true
}

export function solvePuzzle(data) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (data[i][j] === 0) {
        for (let k = 1; k <= 9; k++) {
          if (isValid(data, i, j, k)) {
            data[i][j] = k
            if (solvePuzzle(data)) {
              return true
            } else {
              data[i][j] = 0
            }
          }
        }
        return false
      }
    }
  }
  return true
}
