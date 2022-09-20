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
