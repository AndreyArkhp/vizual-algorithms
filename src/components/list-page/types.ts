import {ElementStates} from "../../types/element-states";

export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
  print: () => void;
}

export interface IArrayFromList {
  value: string;
  id: string;
  state: ElementStates;
}
