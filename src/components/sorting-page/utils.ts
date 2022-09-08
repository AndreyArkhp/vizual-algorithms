import {v4 as uuidv4} from "uuid";
import {ElementStates} from "../../types/element-states";

export function getRandomArr() {
  const newArr = [];
  for (let i = 0; i <= Math.trunc(Math.random() * (18 - 3) + 3); i++) {
    newArr.push({
      value: Math.floor(Math.random() * 100),
      state: ElementStates.Default,
      id: uuidv4(),
    });
  }
  return newArr;
}
