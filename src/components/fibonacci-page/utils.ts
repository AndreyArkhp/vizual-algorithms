let x = 0;
let y = 1;
let reset = false;
let resArr: number[] = [];

export function getNextFibonacciNumbers(stop: number) {
  if (reset) {
    x = 0;
    y = 1;
    resArr = [];
    reset = false;
  }
  if (resArr.length === 0) {
    resArr.push(0);
    return resArr;
  }
  if (resArr.length === 1) {
    resArr.push(1);
    return resArr;
  }

  let temp = x + y;
  x = y;
  y = temp;
  resArr.push(y);
  if (resArr.length - 1 === stop) {
    reset = true;
  }
  return resArr;
}
