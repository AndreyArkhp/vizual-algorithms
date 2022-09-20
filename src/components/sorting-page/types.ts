import {ElementStates} from "../../types/element-states";

export type TMethodSort = "bubble" | "selection";

export interface IShowElement {
  value: number;
  state: ElementStates;
  id: string;
}
