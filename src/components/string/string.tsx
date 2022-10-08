import React, {FormEvent, useState} from "react";
import DocumentTitle from "react-document-title";
import {DELAY_IN_MS} from "../../constants/delays";
import {
  BUTTON_TEXT_STRING,
  MAX_LENGTH_INPUT_STRING,
  TITLE_PAGE_STRING,
} from "../../constants/string-page";
import {ElementStates} from "../../types/element-states";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import styles from "./string.module.css";
import getNextStepTurnString from "./utils";

type TArrForDisplay = [string, ElementStates];

export const StringComponent: React.FC = () => {
  const [string, setString] = useState("");
  const [arrForDisplay, setArrForDisplay] = useState<TArrForDisplay[]>([]);
  const [btnLoader, setBtnLoader] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (string.length === 1) {
      setArrForDisplay(getNextStepTurnString(string).arr);
    } else {
      setBtnLoader(true);
      setArrForDisplay(getNextStepTurnString(string).arr);
      const timerId = setInterval(() => {
        const res = getNextStepTurnString(string);
        if (res.done) {
          clearInterval(timerId);
          setBtnLoader(false);
        }
        setArrForDisplay(res.arr);
      }, DELAY_IN_MS);
    }
  }

  return (
    <DocumentTitle title={TITLE_PAGE_STRING}>
      <SolutionLayout title={TITLE_PAGE_STRING}>
        <Form handleSubmit={handleSubmit}>
          <Input
            maxLength={MAX_LENGTH_INPUT_STRING}
            isLimitText
            value={string}
            onChange={(e) => setString(e.currentTarget.value)}
          />
          <Button
            type="submit"
            text={BUTTON_TEXT_STRING}
            linkedList="small"
            isLoader={btnLoader}
            disabled={!string.length}
          />
        </Form>
        <VizualAlgoContent extraClass={styles.string__content}>
          {arrForDisplay.map((el, index) => (
            <Circle letter={el[0]} key={index} state={el[1]} />
          ))}
        </VizualAlgoContent>
      </SolutionLayout>
    </DocumentTitle>
  );
};
