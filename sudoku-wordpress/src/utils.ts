export function isSolved(board: Cell[][]) {
  for (let i = 0; i < 9; i++) {
    const rowSet = new Set()
    const colSet = new Set()
    const boxSet = new Set()

    for (let j = 0; j < 9; j++) {
      if (board[i][j].value !== '0') {
        if (rowSet.has(board[i][j].value)) return false
        rowSet.add(board[i][j].value)
      }

      if (board[j][i].value !== '0') {
        if (colSet.has(board[j][i].value)) return false
        colSet.add(board[j][i].value)
      }

      const boxRow = Math.floor(i / 3) * 3 + Math.floor(j / 3)
      const boxCol = (i % 3) * 3 + (j % 3)
      if (board[boxRow][boxCol].value !== '0') {
        if (boxSet.has(board[boxRow][boxCol].value)) return false
        boxSet.add(board[boxRow][boxCol].value)
      }
    }
  }
  return true
}

function isValid(board: number[][], row: number, col: number, num: number) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) {
      return false
    }
  }

  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) {
      return false
    }
  }

  const startRow = row - (row % 3)
  const startCol = col - (col % 3)
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) {
        return false
      }
    }
  }

  return true
}

function solveSudoku(board: number[][]): boolean {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
        for (const num of numbers) {
          if (isValid(board, i, j, num)) {
            board[i][j] = num // Try placing the number

            if (solveSudoku(board)) {
              return true // If it leads to a solution, return true
            }

            board[i][j] = 0 // Otherwise, backtrack
          }
        }
        return false // No valid number found for this cell
      }
    }
  }
  return true
}

// Fisher-Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function createPuzzle(board: number[][], holes: number): number[][] {
  const puzzle = board.map((row) => row.slice())
  let removed = 0
  const cells = shuffleArray(Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9]))

  for (const [r, c] of cells) {
    if (puzzle[r][c] !== 0) {
      puzzle[r][c] = 0
      removed++
      if (removed >= holes) {
        break
      }
    }
  }
  return puzzle
}

export function generateSudoku(holes = 1) {
  let board = Array.from({ length: 9 }, () => Array(9).fill(0))
  while (!solveSudoku(board)) {
    // should not happend ideally
    board = Array.from({ length: 9 }, () => Array(9).fill(0))
  }

  return createPuzzle(board, holes)
}
