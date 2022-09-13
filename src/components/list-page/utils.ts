import {IArrayFromList, ILinkedList} from "./types";
import {v4 as uuidv4} from "uuid";
import {ElementStates} from "../../types/element-states";

export class LinkedListNode<T> {
  value: T;
  id: string = uuidv4();
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor(arr?: T[]) {
    this.head = null;
    this.size = 0;
    if (arr) {
      arr.forEach((el) => this.append(el));
    }
  }

  toArray() {
    let curr = this.head;
    const arr: IArrayFromList[] = [];
    while (curr) {
      arr.push({value: String(curr.value), id: curr.id, state: ElementStates.Default});
      curr = curr.next;
    }
    return arr;
  }

  insertAt(element: T, index: number) {
    console.log(index, this.size);
    if (index < 0 || index > this.size) {
      console.log("Enter a valid index");
      return;
    } else {
      const node = new LinkedListNode(element);

      // добавить элемент в начало списка
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;

        // перебрать элементы в списке до нужной позиции
        //for (let i = 0; i < index; i++) {
        //  curr =curr && curr.next;
        // }
        while (currIndex < index - 1) {
          curr = curr && curr.next;
          currIndex++;
        }
        node.next = curr && curr.next;
        curr && (curr.next = node);
      }

      this.size++;
    }
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  prepend(element: T) {
    const node = new LinkedListNode(element);
    node.next = this.head;
    this.head = node;
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.next;
    }
  }

  getSize() {
    return this.size;
  }

  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
