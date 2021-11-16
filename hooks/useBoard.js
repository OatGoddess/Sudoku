import { useEffect, useState } from 'react'
import { useAsync } from './useAsync'

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

const testData = {
  difficulty: 'easy',
  puzzle: {
    A2: '8',
    A3: '5',
    A5: '6',
    A6: '4',
    A8: '2',
    A9: '7',
    B3: '3',
    B4: '7',
    B5: '2',
    B6: '9',
    B8: '6',
    C2: '6',
    D4: '3',
    D5: '7',
    D6: '5',
    D7: '6',
    D8: '4',
    E3: '6',
    E6: '8',
    E8: '5',
    F4: '6',
    F6: '2',
    F9: '3',
    G1: '6',
    G3: '1',
    G4: '2',
    G5: '5',
    G7: '9',
    G8: '8',
    H5: '3',
    I1: '8',
    I2: '5',
    I5: '9',
    B9: '8',
    E5: '1',
  },
}

function convertBoard(board) {
  const result = [...defaultBoard]
  for (const key in board.puzzle) {
    const row = key.charCodeAt(0) - 65
    const column = key.substr(1) - 1
    result[row][column] = board.puzzle[key]
  }
  return result
}

export function useBoard(difficulty) {
  const [board, setBoard] = useState(defaultBoard)

  useEffect(() => {
    //updateBoard()
    setBoard(convertBoard(testData))
  }, [])

  /*const updateBoard = () => {
    fetch(
      `https://vast-chamber-17969.herokuapp.com/generate?difficulty=${difficulty}`
    )
      .then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then(board => {
        setBoard(convertBoard(board))
      })
  }*/

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

  function possible(board, y, x, n) {
    for (let i = 0; i < 9; i++) {
      if (board[y][i] === n || board[i][x] === n) {
        return false
      }
    }

    const xSquare = Math.floor(x / 3) * 3
    const ySquare = Math.floor(y / 3) * 3

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[ySquare + i][xSquare + j] === n) {
          return false
        }
      }
    }

    return true
  }

  function solve() {
    const resultBoard = [...board]
    setBoard(handleSolve(resultBoard))
  }

  function handleSolve(resultBoard) {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        if (resultBoard[y][x] === 0) {
          for (let n = 1; n <= 9; n++) {
            if (possible(resultBoard, y, x, n)) {
              resultBoard[y][x] = n

              if (handleSolve(resultBoard)) return resultBoard
            }
          }

          resultBoard[y][x] = 0
          return false
        }
      }
    }

    return resultBoard
  }

  return { board, set: setBoard, update, clear, validate, solve }
}
