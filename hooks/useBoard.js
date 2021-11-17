import { useEffect, useState } from 'react'
import { isValid, solvePuzzle } from '../common/util/sudokusolver'
import { cloneGrid } from '../common/util/cloneGrid'

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

function convertBoard(board) {
  const result = cloneGrid(defaultBoard)
  for (const key in board.puzzle) {
    const row = key.charCodeAt(0) - 65
    const column = key.substr(1) - 1
    result[row][column] = parseInt(board.puzzle[key])
  }
  return result
}

export function useBoard(difficulty) {
  const [board, setBoard] = useState(cloneGrid(defaultBoard))

  useEffect(() => {
    updateBoard()
  }, [difficulty])

  const updateBoard = () => {
    fetch(
      `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficulty}`
    )
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(newBoard => {
        setBoard(convertBoard(newBoard))
      })
      .catch(error => {
        console.log(error)
      })
  }

  function update(position, newElement) {
    const newValue = newElement.substr(newElement.length - 1)
    let copy = cloneGrid(board)
    copy[position.row][position.column] = parseInt(newValue)
    setBoard(copy)
  }

  function clear() {
    setBoard(defaultBoard)
  }

  function validate() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] != 0 && !isValid(board, i, j, board[i][j])) {
          return false
        }
      }
    }
    return true
  }

  function solve() {
    const resultBoard = cloneGrid(board)
    solvePuzzle(resultBoard)
    setBoard(resultBoard)
  }

  return { board, set: setBoard, update, clear, validate, solve }
}
