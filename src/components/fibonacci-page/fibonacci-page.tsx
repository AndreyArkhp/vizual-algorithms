import React, {useState} from "react";
import {
  BUTTON_TEXT,
  MAX__INPUT_NUMBER,
  MIN_INPUT_NUMBER,
  TITLE_PAGE,
} from "../../constants/fibonacci-page";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number>();
  // function x(n) {
  //   let x = 0;
  //   let y = 1;
  //   let step = 0;
  //   const t = setInterval(() => {
  //     if (step === n) clearInterval(t);
  //     if (step === 0) {
  //       console.log(0, step);
  //       step++;
  //       return;
  //     }
  //     if (step === 1) {
  //       console.log(1, step);
  //       step++;
  //       return;
  //     }
  //     const res = x + y;
  //     x = y;
  //     y = res;
  //     console.log(res, step);
  //     step++;
  //   }, 1000);
  // }
  return (
    <SolutionLayout title={TITLE_PAGE}>
      <Form handleSubmit={() => {}}>
        <Input
          type="number"
          max={MAX__INPUT_NUMBER}
          min={MIN_INPUT_NUMBER}
          value={inputValue}
          onChange={(e) => setInputValue(Number(e.currentTarget.value))}
        />
        <Button type="submit" text={BUTTON_TEXT} linkedList="small" isLoader={false} />
      </Form>
    </SolutionLayout>
  );
};
