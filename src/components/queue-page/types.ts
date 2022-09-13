import {ElementStates} from "../../types/element-states";

export interface IElement {
  value: string;
  id: string;
  state: ElementStates;
}

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
}
