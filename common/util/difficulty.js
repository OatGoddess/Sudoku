export const difficulties = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
  none: 'none',
}

export function randomDifficulty() {
  const randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return difficulties.easy
    case 1:
      return difficulties.medium
    case 2:
      return difficulties.hard
    default:
      return difficulties.easy
  }
}
