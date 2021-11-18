import { useEffect, useState } from 'react'
import { isValid, solvePuzzle } from '../common/util/sudokusolver'
import { cloneGrid } from '../common/util/cloneGrid'
import { difficulties } from '../common/util/difficulty'

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

export function useBoard() {
  const [difficulty, setDifficulty] = useState('easy')
  const [board, setBoard] = useState(cloneGrid(defaultBoard))

  useEffect(() => {
    if (difficulty !== difficulties.none) {
      loadNewBoard()
    }
  }, [difficulty])

  const loadNewBoard = () => {
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

  const handleSetDifficulty = newDifficulty => {
    difficulty !== newDifficulty ? setDifficulty(newDifficulty) : loadNewBoard()
  }

  const update = (position, newElement) => {
    const newValue =
      newElement.length > 0 ? newElement.substr(newElement.length - 1) : 0
    let copy = cloneGrid(board)
    copy[position.row][position.column] = parseInt(newValue)
    setBoard(copy)
  }

  const clear = () => {
    setBoard(defaultBoard)
    setDifficulty(difficulties.none)
  }

  const validate = () => {
    let complete = true
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          complete = false
        }
        if (board[i][j] != 0 && !isValid(board, i, j, board[i][j])) {
          return 'broken'
        }
      }
    }

    return complete ? 'solved' : 'valid'
  }

  const solve = () => {
    const resultBoard = cloneGrid(board)
    solvePuzzle(resultBoard)
    setBoard(resultBoard)
  }

  return {
    board,
    update,
    clear,
    validate,
    solve,
    setDifficulty: handleSetDifficulty,
    difficulty,
  }
}
