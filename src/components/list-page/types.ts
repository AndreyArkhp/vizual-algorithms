import {ElementStates} from "../../types/element-states";

export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteHead: () => void;
  insertAt: (element: T, position: number) => void;
  getSize: () => number;
}

export interface IArrayFromList {
  value: string;
  id: string;
  state: ElementStates;
}

export enum Pointer {
  Step = 136,
  Top = "-65px",
  Bottom = "118px",
  Start = "12px",
  Visible = "block",
  Hidden = "none",
}

export type TPosition = "head" | "tail";

