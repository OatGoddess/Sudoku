export function cloneGrid(grid) {
  const newGrid = [...grid]
  newGrid.forEach((row, rowIndex) => (newGrid[rowIndex] = [...row]))
  return newGrid
}
