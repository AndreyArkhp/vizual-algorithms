export function getRandomArr(minLengtArr: number, maxLengthArr: number, maxNumberInArr: number) {
  const newArr = [];
  for (
    let i = 0;
    i < Math.trunc(Math.random() * (maxLengthArr - minLengtArr + 1) + minLengtArr);
    i++
  ) {
    newArr.push(String(Math.floor(Math.random() * maxNumberInArr)));
  }
  return newArr;
}

export class NoErrorThrownError extends Error {}

export const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};