interface IStack<T> {
  push: (item: T, id: T) => void;
  pop: () => void;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: {value: T; id: T}[] = [];

  push = (item: T, id: T): void => {
    this.container.push({value: item, id});
  };

  pop = (): void => {
    this.container.pop();
  };

  clear = (): void => {
    this.container = [];
  };

  get getSize() {
    return this.container.length;
  }
  get getElements() {
    return this.container;
  }
}
