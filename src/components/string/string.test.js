import getNextStepTurnString from "./utils";

describe("getNextStepTurnString function", () => {
  let str;
  let turnedStr;

  afterEach(() => {
    try {
      let res = {arr: [], done: false};
      while (!res.done) {
        res = getNextStepTurnString(str);
      }
      expect(res.arr.map((el) => el[0]).join("")).toEqual(turnedStr);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test("should turn a string with an evev number of characters", () => {
    str = "abcd";
    turnedStr = "DCBA";
  });
  test("should turn a string with an odd number of characters", () => {
    str = "abcde";
    turnedStr = "EDCBA";
  });
  test("should turn a string with an single of character", () => {
    str = "a";
    turnedStr = "A";
  });
  test("should throw error without of character", () => {
    str = "";
  });
});
