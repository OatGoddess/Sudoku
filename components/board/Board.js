import styles from './board.module.css'
import { Cell } from './Cell'

const defaultBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

function needBottomBorder(rowIndex) {
  return rowIndex === 2 || rowIndex === 5
}

export const Board = ({ board = defaultBoard }) => {
  return (
    <div class={styles.sudokuboard}>
      {board.map((row, rowIndex) => {
        return row.map((column, colIndex) => (
          <Cell
            value={column != 0 ? column : ''}
            position={{ rowIndex, colIndex }}
            className={needBottomBorder(rowIndex) ? styles.bottomborder : ''}
          />
        ))
      })}
    </div>
  )
}
