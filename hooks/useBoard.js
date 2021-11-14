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
  /*TODO: we need this   const [ loading, error, value ] = useFetch(
    `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficulty}`,
    {},
    [difficulty]
  )*/
  const [board, setBoard] = useState(defaultBoard)

  function update(position, newElement) {
    const newValue = newElement.substr(newElement.length - 1)
    let copy = [...board]
    copy[position.row][position.column] = newValue
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
