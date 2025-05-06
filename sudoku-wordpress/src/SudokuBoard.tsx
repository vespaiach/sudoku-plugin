import { useEffect, useMemo, useState } from 'react'
import { NumberInput } from './NumberInput'
import { generateSudoku, isSolved } from './utils'
import { Table, Tbody, Td, Tr } from './styled-components'

export default function SudokuBoard() {
  const [solved, setSolved] = useState(false)
  const [board, setBoard] = useState<Cell[][]>([])

  useEffect(() => {
    const generatedBoard = generateSudoku()
    setBoard(
      generatedBoard.map((row) =>
        row.map((cell) => ({ value: cell === 0 ? '' : String(cell), prefilled: cell !== 0, editing: false }))
      )
    )
  }, [])

  const disabledSubmitButton = useMemo(() => {
    return board.some((row) => row.some((cell) => cell.value === ''))
  }, [board])

  const handleCellClick = (rowIndex: number, colIndex: number) => {
    if (board[rowIndex][colIndex].prefilled) {
      return
    }
    const newBoard = board.map((row, r) =>
      row.map((cell, c) => {
        return { ...cell, editing: r === rowIndex && c === colIndex }
      })
    )
    setBoard(newBoard)
  }

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the game?')) {
      const generatedBoard = generateSudoku()
      setBoard(
        generatedBoard.map((row) =>
          row.map((cell) => ({ value: cell === 0 ? '' : String(cell), prefilled: cell !== 0, editing: false }))
        )
      )
    }
  }

  const handleInputChange = () => {
    setBoard((board) => board.map((row) => row.slice()))
  }

  const handleDone = () => {
    if (isSolved(board)) {
      setSolved(true)
    }
  }

  return (
    <div className="flex flex-col items-start gap-8">
      <Table>
        <Tbody>
          {board.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {row.map((cell, colIndex) => {
                const cellClasses = cx(
                  'su-cell',
                  colIndex % 3 === 0 && 'border-l-2 border-l-stone-300',
                  rowIndex % 3 === 0 && 'border-t-2 border-t-stone-300',
                  colIndex === 8 && 'border-r-2 border-r-stone-300',
                  rowIndex === 8 && 'border-b-2 border-b-stone-300'
                )

                return (
                  <Td
                    key={colIndex}
                    className={cellClasses}
                    data-prefilled={cell.prefilled || undefined}
                    data-row={rowIndex}
                    data-col={colIndex}
                    onClick={cell.prefilled ? undefined : () => handleCellClick(rowIndex, colIndex)}>
                    {cell.prefilled ? (
                      cell.value
                    ) : cell.editing ? (
                      <NumberInput
                        cell={cell}
                        onChange={handleInputChange}
                      />
                    ) : (
                      cell.value
                    )}
                  </Td>
                )
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      {!solved && (
        <div className="flex gap-3">
          <button
            disabled={disabledSubmitButton}
            className="done"
            onClick={handleDone}>
            Done
          </button>
          <button
            className="text-stone-600"
            onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
      {solved && (
        <div>
          <h4>Want to try new challenges?</h4>
          <button
            className="done"
            onClick={handleReset}>
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}
