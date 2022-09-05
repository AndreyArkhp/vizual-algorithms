import React, {FormEvent, useState} from "react";
import {DELAY_IN_MS} from "../../constants/delays";
import {BUTTON_TEXT, MAX_LENGTH_INPUT, TITLE_PAGE} from "../../constants/string-page";
import {ElementStates} from "../../types/element-states";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

type TArrForDisplay = [string, ElementStates];

export const StringComponent: React.FC = () => {
  const [string, setString] = useState("");
  const [arrForDisplay, setArrForDisplay] = useState<TArrForDisplay[]>([]);
  const [btnLoader, setBtnLoader] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBtnLoader(true);
    draw(string);
  }

  function draw(str: string) {
    if (string.length === 1) {
      setArrForDisplay([[str.toUpperCase(), ElementStates.Modified]]);
      return;
    }

    let start = 0;
    let end = string.length - 1;

    const arr: TArrForDisplay[] = Array.from(str).map((el, index) => {
      if (index === start || index === end) {
        return [el.toUpperCase(), ElementStates.Changing];
      }
      return [el.toUpperCase(), ElementStates.Default];
    });
    setArrForDisplay(arr);

    const timerId = setInterval(() => {
      if (start >= end - 2) {
        clearInterval(timerId);
        setBtnLoader(false);
      }
      step(arr, start++, end--);
    }, DELAY_IN_MS);
  }
  function step(arr: TArrForDisplay[], start: number, end: number): void {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    const newArr: TArrForDisplay[] = arr.map((el, index) => {
      if (index <= start || index >= end || (index === start + 1 && index === end - 1)) {
        return [el[0], ElementStates.Modified];
      }
      if ((index === start + 1 || index === end - 1) && index !== 0) {
        return [el[0], ElementStates.Changing];
      }
      return el;
    });
    setArrForDisplay(newArr);
  }

  return (
    <SolutionLayout title={TITLE_PAGE} extraClass={styles.layout}>
      <Form handleSubmit={handleSubmit}>
        <Input
          maxLength={MAX_LENGTH_INPUT}
          isLimitText
          value={string}
          onChange={(e) => setString(e.currentTarget.value)}
        />
        <Button type="submit" text={BUTTON_TEXT} linkedList="small" isLoader={btnLoader} />
      </Form>
      <section className={styles.visualization}>
        {arrForDisplay.map((el, index) => (
          <Circle letter={el[0]} key={index} state={el[1]} />
        ))}
      </section>
    </SolutionLayout>
  );
};
