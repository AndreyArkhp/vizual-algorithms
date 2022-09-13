export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | number)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    for (let i = 0; i < this.size; i++) {
      this.container[i] = 0;
    }
  }

  enqueue = (item: T) => {
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
    this.container[this.head] = 0;
    this.head === this.size - 1 ? (this.head = 0) : this.head++;
    this.length--;
  };

  clear = () => {
    this.container = this.container.map((el) => (el = 0));
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
    if (this.tail === 0) return this.size - 1;
    return this.tail - 1;
  }
}
