export function getRandomArr(minLengtArr: number, maxLengthArr: number, maxNumberInArr: number) {
  const newArr = [];
  for (let i = 0; i <= Math.trunc(Math.random() * (maxLengthArr - 2) + minLengtArr); i++) {
    newArr.push(Math.floor(Math.random() * maxNumberInArr));
  }
  return newArr;
}
