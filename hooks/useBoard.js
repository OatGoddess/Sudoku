import { useState } from 'react'

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

export function useBoard() {
  const [board, setBoard] = useState(defaultBoard)

  function update(position, newElement) {
    let copy = [...board]
    copy[position.row][position.column] = newElement
    setBoard(copy)
  }

  function clear() {
    setBoard(defaultBoard)
  }

  function validate() {
    return true
  }

  return { board, set: setBoard, update, clear, validate }
}
