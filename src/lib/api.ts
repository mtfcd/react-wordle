export const API_HOST = process.env.REACT_APP_API_HOST!

export const createProblem = async (word: string) => {
  const res = await fetch(
    `${API_HOST}/create?word=${word}`, 
    {
      method: 'POST',
    }
  );
  return res.json();
}