import {ElementStates} from "../../types/element-states";
import {IElement, IQueue} from "./types";

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length === 0) {
      this.head = 0;
      this.tail = 0;
    }
    if (this.length >= this.size) {
      throw new Error("Превышена максимальная длинна");
    }
    if (!item) {
      return;
    }
    this.container[this.tail] = item;
    this.length++;
    this.tail === this.size - 1 ? (this.tail = 0) : this.tail++;
  };

  dequeue = () => {
    if (this.length === 0) {
      throw new Error("В очереди нет элементов");
    }
    this.container[this.head] = null;
    this.head === this.size - 1 ? (this.head = 0) : this.head++;
    this.length--;
  };

  clear = () => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };

  get isEmpty() {
    return this.length === 0;
  }

  get isFull() {
    return this.length === this.size;
  }

  get getElements() {
    return this.container;
  }

  get getHead() {
    return this.head;
  }

  get getTail() {
    if (this.tail === 0) return this.length > 0 ? this.size - 1 : 0;
    return this.tail - 1;
  }
}

export function unionStates(prev: IElement[], next: (string | null)[]) {
  return prev.map((el, index) => {
    const element = next[index];
    el.state = ElementStates.Default;
    if (element && element !== el.value) {
      el.value = element;
      return el;
    } else if (element === el.value) {
      return el;
    }
    el.value = "";
    return el;
  });
}
