import {Direction} from "../../types/direction";
import {getMinOrMaxIndex, sortBubble, sortSelection, swapElDependingDirection} from "./utils";
import {ElementStates} from "../../types/element-states";
import {getError, NoErrorThrownError} from "../../utils/function";

let arrOne;
let arrTwo;

const options = {
  arrOne: [
    {value: 1, state: ElementStates.Default, id: "1"},
    {value: 2, state: ElementStates.Default, id: "2"},
  ],
  arrTwo: [
    {value: 2, state: ElementStates.Default, id: "2"},
    {value: 1, state: ElementStates.Default, id: "1"},
  ],
  initialArr: [
    {value: 5, state: ElementStates.Default, id: 5},
    {value: 2, state: ElementStates.Default, id: 2},
    {value: 4, state: ElementStates.Default, id: 4},
  ],
  oneElementArr: [{value: 1, state: ElementStates.Default, id: "1"}],
  get resultOneElementArr() {
    return {done: true, value: this.oneElementArr};
  },
  resultAscending: {
    done: true,
    value: [
      {value: 2, state: ElementStates.Modified, id: 2},
      {value: 4, state: ElementStates.Modified, id: 4},
      {value: 5, state: ElementStates.Modified, id: 5},
    ],
  },
  resultDescending: {
    done: true,
    value: [
      {value: 5, state: ElementStates.Modified, id: 5},
      {value: 4, state: ElementStates.Modified, id: 4},
      {value: 2, state: ElementStates.Modified, id: 2},
    ],
  },
  getResultSorting: (fn, direction, initialArr) => {
    let stop = false;
    let res;
    res = fn(direction, initialArr);
    while (!res.done && !stop) {
      res = fn(direction, res.value);
      stop = res.done;
    }
    return res;
  },
  indexFirst: 0,
  indexSecond: 1,
};

describe("getMinOrMaxIndex function", () => {
  beforeEach(() => {
    arrOne = [...options.arrOne];
    arrTwo = [...options.arrTwo];
  });
  test("should return first index when direction ascending and first value less than second value", () => {
    expect(
      getMinOrMaxIndex(options.indexFirst, options.indexSecond, arrOne, Direction.Ascending)
    ).toBe(options.indexFirst);
  });
  test("should return second index when direction ascending and first value greater then second value", () => {
    expect(
      getMinOrMaxIndex(options.indexFirst, options.indexSecond, arrTwo, Direction.Ascending)
    ).toBe(options.indexSecond);
  });
  test("should return first index when direction descending and first value greater then second value", () => {
    expect(
      getMinOrMaxIndex(options.indexFirst, options.indexSecond, arrTwo, Direction.Descending)
    ).toBe(options.indexFirst);
  });
  test("should return second index when direction descending and first value less then second value", () => {
    expect(
      getMinOrMaxIndex(options.indexFirst, options.indexSecond, arrOne, Direction.Descending)
    ).toBe(options.indexSecond);
  });
  test("should throw error if an empty array is passed", async () => {
    const error = await getError(() =>
      getMinOrMaxIndex(options.indexFirst, options.indexSecond, [], Direction.Ascending)
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Пустой массив");
  });
});

describe("swapElDependingDirection function", () => {
  beforeEach(() => {
    arrOne = [...options.arrOne];
    arrTwo = [...options.arrTwo];
  });
  test("showld throw error if empty array is passed", async () => {
    const error = await getError(() =>
      swapElDependingDirection(options.indexFirst, options.indexSecond, Direction.Ascending, [])
    );
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Пустой массив");
  });
  test("showld swap elements when direction ascending and the value of the object at index 0 greater than the value of the object at index 1", () =>
    expect(
      swapElDependingDirection(options.indexFirst, options.indexSecond, Direction.Ascending, arrTwo)
    ).toEqual(arrOne));
  test("showld not swap elements when direction ascending and the value of the object at index 0 less than the value of the object at index 1", () =>
    expect(
      swapElDependingDirection(options.indexFirst, options.indexSecond, Direction.Ascending, arrOne)
    ).toEqual(arrOne));
  test("showld swap elements when direction descending and the value of the object at index 0 less than the value of the object at index 1", () =>
    expect(
      swapElDependingDirection(
        options.indexFirst,
        options.indexSecond,
        Direction.Descending,
        arrOne
      )
    ).toEqual(arrTwo));
  test("showld  not swap elements when direction descending and the value of the object at index 0 greater than the value of the object at index 1", () =>
    expect(
      swapElDependingDirection(
        options.indexFirst,
        options.indexSecond,
        Direction.Descending,
        arrTwo
      )
    ).toEqual(arrTwo));
});

describe("sortSelection function", () => {
  test("showld throw error if empty array is passed", async () => {
    const error = await getError(() => sortSelection(Direction.Ascending, []));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Пустой массив");
  });
  test("should return object with execution status and the value of the original array", () => {
    expect(sortSelection(Direction.Ascending, options.oneElementArr)).toEqual(
      options.resultOneElementArr
    );
    expect(sortSelection(Direction.Descending, options.oneElementArr)).toEqual(
      options.resultOneElementArr
    );
  });
  test("should return object with execution status and the value of the sorted array in ascending", () => {
    expect(
      options.getResultSorting(sortSelection, Direction.Ascending, options.initialArr)
    ).toEqual(options.resultAscending);
  });
  test("should return object with execution status and the value of the sorted array in descending", () => {
    expect(
      options.getResultSorting(sortSelection, Direction.Descending, options.initialArr)
    ).toEqual(options.resultDescending);
  });
});

describe("sortBubble function", () => {
  test("showld throw error if empty array is passed", async () => {
    const error = await getError(() => sortBubble(Direction.Ascending, []));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("Пустой массив");
  });
  test("should return object with execution status and the value of the original array", () => {
    expect(sortBubble(Direction.Ascending, options.oneElementArr)).toEqual(
      options.resultOneElementArr
    );
    expect(sortBubble(Direction.Descending, options.oneElementArr)).toEqual(
      options.resultOneElementArr
    );
  });
  test("should return object with execution status and the value of the sorted array in ascending", () => {
    expect(options.getResultSorting(sortBubble, Direction.Ascending, options.initialArr)).toEqual(
      options.resultAscending
    );
  });
  test("should return object with execution status and the value of the sorted array in descending", () => {
    expect(options.getResultSorting(sortBubble, Direction.Descending, options.initialArr)).toEqual(
      options.resultDescending
    );
  });
});
