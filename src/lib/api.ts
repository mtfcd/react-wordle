export const API_HOST = process.env.REACT_APP_API_HOST!

type ProblemResp = {
  code: number,
  msg: string,
  data: string,
}

export const createProblem = async (word: string) => {
  const res = await fetch(
    `${API_HOST}/create?word=${word}`, 
    {
      method: 'POST',
    }
  );
  const problem: ProblemResp = await res.json();
  return problem
}

type GuessesResp = {
  code: number,
  msg: string,
  data: {
    guesses: string[],
    res: number[][]
  }
}

export const getGuessesByGameId = async (id: number) => {
  const res = await fetch(
    `${API_HOST}/getGuesses?id=${id}`, 
    {
      method: 'GET',
    }
  );
  const body: GuessesResp = await res.json();
  return body.data
}

type CheckResp = {
  code: number,
  msg: string,
  data: number[],
}
export const checkGuess = async (id: string, guess: string, line: number) => {
  const res = await fetch(
    `${API_HOST}/check?id=${id}&guess=${guess}&line=${line}`, 
    {
      method: 'GET',
    }
  );
  const body: CheckResp = await res.json();
  return body
}

type ProblemLenResp = {
  code: number,
  msg: string,
  data: number,
}

export const getProblem = async (id: string) => {
  const res = await fetch(
    `${API_HOST}/getProblem?id=${id}`, 
    {
      method: 'GET',
    }
  );
  const body: ProblemLenResp = await res.json();
  return body
}
