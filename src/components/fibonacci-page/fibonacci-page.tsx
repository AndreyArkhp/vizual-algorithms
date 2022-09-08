import React, {FormEvent, useEffect, useState} from "react";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {
  BUTTON_TEXT,
  MAX__INPUT_NUMBER,
  MIN_INPUT_NUMBER,
  TITLE_PAGE,
} from "../../constants/fibonacci-page";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import {getNextFibonacciNumbers} from "./utils";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [btnLoader, setButtonLoader] = useState(false);
  const [showElements, setShowElements] = useState<number[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowElements([...getNextFibonacciNumbers(+inputValue)]);
    if (+inputValue > 0) {
      setButtonLoader(true);
      const timerId = setInterval(() => {
        const newArr = getNextFibonacciNumbers(+inputValue);
        if (newArr.length > +inputValue) {
          clearInterval(timerId);
          setButtonLoader(false);
        }
        setShowElements([...newArr]);
      }, SHORT_DELAY_IN_MS);
    }
  }

  useEffect(() => {
    if (+inputValue < 0 || +inputValue > 19) {
      !btnDisabled && setBtnDisabled(true);
    } else {
      btnDisabled && setBtnDisabled(false);
    }
  }, [inputValue, btnDisabled]);

  return (
    <SolutionLayout title={TITLE_PAGE}>
      <Form handleSubmit={handleSubmit}>
        <Input
          type="number"
          max={MAX__INPUT_NUMBER}
          min={MIN_INPUT_NUMBER}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <Button
          type="submit"
          text={BUTTON_TEXT}
          linkedList="small"
          isLoader={btnLoader}
          disabled={btnDisabled}
        />
      </Form>
      <VizualAlgoContent>
        {showElements.map((el, index) => (
          <Circle letter={String(el)} key={index} tail={String(index)} />
        ))}
      </VizualAlgoContent>
    </SolutionLayout>
  );
};
