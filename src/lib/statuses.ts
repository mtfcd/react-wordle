import { unicodeSplit } from './words'

export type CharStatus = 'absent' | 'present' | 'correct'
const num2Status:  { [key: number]:  CharStatus} = {
  2: 'correct',
  1: 'present',
  0: 'absent'
}
export const getStatuses = (
  guesses: string[], guessRes: number[][]
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}

  guesses.forEach((word, j) => {
    unicodeSplit(word).forEach((letter, i) => {
      if (!charObj[letter]) {
        charObj[letter] = num2Status[guessRes[j][i]]
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (res: number[]): CharStatus[] => {
  const statuses: CharStatus[] = res.map(r => num2Status[r])
  return statuses
}
