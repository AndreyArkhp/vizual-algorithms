import {IArrayFromList, ILinkedList, Pointer} from "./types";
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
    if (index < 0 || index > this.size) {
      console.log("Укажите корректный индекс");
      return;
    } else {
      const node = new LinkedListNode(element);
      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        if (curr && typeof curr === "object") {
          while (currIndex < index - 1 && curr) {
            curr = curr.next;
            currIndex++;
          }
          node.next = curr ? curr.next : null;
          curr && (curr.next = node);
        }
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
    this.size++;
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.next;
    }
  }

  deleteTail() {
    if (this.head) {
      let curr = this.head;
      let prev = curr;
      while (curr.next) {
        prev = curr;
        curr = curr.next;
      }
      prev.next = null;
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

function moveStep() {
  let currentPosition = 0;

  return function (
    endIndex: string,
    fnSetStepPosition: React.Dispatch<React.SetStateAction<React.CSSProperties>>
  ) {
    let end = currentPosition === Number(endIndex) + 1 ? true : false;
    fnSetStepPosition({
      display: end ? Pointer.Hidden : Pointer.Visible,
      left: parseInt(Pointer.Start) + Pointer.Step * currentPosition,
      top: Pointer.Top,
    });
    currentPosition++;
    if (end) currentPosition = 0;
    return end;
  };
}

function changeStateEl() {
  let newArr: IArrayFromList[] = [{value: "", id: "", state: ElementStates.Default}];
  let step = 0;
  return function (
    prevElements: IArrayFromList[],
    nextElements: IArrayFromList[],
    endElement: number
  ) {
    if (!step) newArr = [...prevElements];

    if (step === endElement) {
      return nextElements.map((el, index) => {
        if (index < endElement) {
          el.state = ElementStates.Changing;
          return el;
        }
        if (index === endElement) {
          el.state = ElementStates.Modified;
          return el;
        }
        step = 0;
        return el;
      });
    }

    newArr[step].state = ElementStates.Changing;
    step++;
    return newArr;
  };
}

export const movePointer = moveStep();
export const changeStateShowElements = changeStateEl();
