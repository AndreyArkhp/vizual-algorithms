import {ElementStates} from "../../types/element-states";

type TArrForDisplay = [string, ElementStates];
interface IResult {
  arr: TArrForDisplay[];
  done: boolean;
}

function turnString() {
  let start: number;
  let end: number;
  let step = 0;
  let done: boolean;
  let arr: TArrForDisplay[];
  let result: IResult;
  return function (str: string) {
    done = false;
    if (str.length === 0) {
      throw new Error("Пустая строка");
    }
    if (str.length === 1) {
      result = {arr: [[str.toUpperCase(), ElementStates.Modified]], done: true};
      return result;
    }
    if (step === 0) {
      start = 0;
      end = str.length - 1;
      arr = Array.from(str).map((el, index) => {
        if (index === start || index === end) {
          return [el.toUpperCase(), ElementStates.Changing];
        }
        return [el.toUpperCase(), ElementStates.Default];
      });
      result = {
        arr,
        done,
      };
      step++;
      return result;
    } else {
      done = start >= end - 2;
      [arr[start], arr[end]] = [arr[end], arr[start]];
      result = {
        arr: arr.map((el, index) => {
          if (index <= start || index >= end || (index === start + 1 && index === end - 1)) {
            return [el[0], ElementStates.Modified];
          }
          if ((index === start + 1 || index === end - 1) && index !== 0) {
            return [el[0], ElementStates.Changing];
          }
          return el;
        }),
        done,
      };
      done ? (step = 0) : step++;
      start++;
      end--;
      return result;
    }
  };
}

const getNextStepTurnString = turnString();
export default getNextStepTurnString;
