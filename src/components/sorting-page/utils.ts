import {v4 as uuidv4} from "uuid";
import {MAX_LENGTH_ARR, MAX_NUMBER_IN_ARR, MIN_LENGTH_ARR} from "../../constants/sorting-page";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {getRandomArr} from "../../utils/function";
import {IShowElement} from "./types";

function getMinOrMaxIndex(a: number, b: number, arr: IShowElement[], direction: Direction) {
  if (direction === Direction.Ascending) {
    return arr[a].value > arr[b].value ? b : a;
  } else {
    return arr[a].value > arr[b].value ? a : b;
  }
}

function swapElDependingDirection(a: number, b: number, direction: Direction, arr: IShowElement[]) {
  if (direction === Direction.Ascending) {
    arr[a].value > arr[b].value && ([arr[a], arr[b]] = [arr[b], arr[a]]);
  } else {
    arr[a].value < arr[b].value && ([arr[a], arr[b]] = [arr[b], arr[a]]);
  }
  return arr;
}

function sortArrSelect() {
  let start = 0;
  let nextElement = 1;
  let length = 0;
  let maxOrMinIndex: number = 0;
  return function innerFunc(direction: Direction, arr: IShowElement[]) {
    let newArr: IShowElement[] = [];

    if (start === 0 && nextElement === 1) {
      newArr = arr.map((el) =>
        el.state === ElementStates.Default ? el : {...el, state: ElementStates.Default}
      );
      length = newArr.length - 1;
    } else {
      newArr = [...arr];
    }

    if (nextElement - start > 1) {
      newArr[nextElement - 1].state = ElementStates.Default;
    } else {
      newArr[start].state = ElementStates.Changing;
    }

    if (nextElement > length) {
      [newArr[start], newArr[maxOrMinIndex]] = [newArr[maxOrMinIndex], newArr[start]];
      newArr[maxOrMinIndex].state = ElementStates.Default;
      newArr[length].state = ElementStates.Default;
      newArr[start].state = ElementStates.Modified;
      start++;
      nextElement = start + 1;
      maxOrMinIndex = start;
      newArr[start].state = ElementStates.Changing;
      newArr[nextElement].state = ElementStates.Changing;
    }

    newArr[nextElement].state = ElementStates.Changing;
    maxOrMinIndex = getMinOrMaxIndex(nextElement, maxOrMinIndex, newArr, direction);

    if (start === length - 1 && nextElement === length) {
      [newArr[start], newArr[maxOrMinIndex]] = [newArr[maxOrMinIndex], newArr[start]];
      newArr[start].state = ElementStates.Modified;
      newArr[nextElement].state = ElementStates.Modified;
      start = 0;
      nextElement = 1;
      maxOrMinIndex = 0;
      return {value: newArr, done: true};
    }

    nextElement++;

    return {value: newArr, done: false};
  };
}

function sortArrBubble() {
  let start = 0;
  let nextElement = 1;
  let end = 0;
  return function innerFunc(direction: Direction, arr: IShowElement[]) {
    let newArr: IShowElement[] = [];

    if (!end) {
      end = arr.length - 1;
      newArr = arr.map((el) =>
        el.state === ElementStates.Default ? el : {...el, state: ElementStates.Default}
      );
    } else {
      newArr = [...arr];
      newArr[start - 1].state = ElementStates.Default;
    }

    if (nextElement > end) {
      newArr[end].state = ElementStates.Modified;
      end--;
      start = 0;
      nextElement = start + 1;
    }

    if (end < 2) {
      newArr = swapElDependingDirection(start, nextElement, direction, newArr);
      newArr[start].state = ElementStates.Modified;
      newArr[nextElement].state = ElementStates.Modified;
      start = 0;
      nextElement = start + 1;
      end = 0;
      return {value: newArr, done: true};
    }

    newArr[start].state = ElementStates.Changing;
    newArr[nextElement].state = ElementStates.Changing;
    newArr = swapElDependingDirection(start, nextElement, direction, newArr);
    start++;
    nextElement = start + 1;

    return {value: newArr, done: false};
  };
}

export function getNewShowElements() {
  const newArr = getRandomArr(MIN_LENGTH_ARR, MAX_LENGTH_ARR, MAX_NUMBER_IN_ARR);
  return newArr.map((el) => {
    return {value: +el, state: ElementStates.Default, id: uuidv4()};
  });
}

export const sortSelection = sortArrSelect();
export const sortBubble = sortArrBubble();
