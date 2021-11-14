import styles from './board.module.css'
import { Cell } from './Cell'

function needBottomBorder(rowIndex) {
  return rowIndex === 2 || rowIndex === 5
}

export const Board = ({ board, updateCell }) => {
  return (
    <div class={styles.sudokuboard}>
      {board.map((row, rowIndex) => {
        return row.map((column, colIndex) => (
          <Cell
            value={column != 0 ? column : ''}
            position={{ row: rowIndex, column: colIndex }}
            className={needBottomBorder(rowIndex) ? styles.bottomborder : ''}
            handleOnChange={updateCell}
          />
        ))
      })}
    </div>
  )
}
