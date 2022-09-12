import React, {FormEvent, useState} from "react";
import {v4 as uuidv4} from "uuid";
import DocumentTitle from "react-document-title";
import {MAX_LENGTH_INPUT} from "../../constants/stack-page";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [newStackElement, setNewStackElement] = useState("");
  const [showElements, setShowElements] = useState<string[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewStackElement("");
  }
  function handleClickAddBtn() {
    setShowElements([...showElements, newStackElement]);
  }
  function handleClickRemoveBtn() {
    setShowElements((prevEl) => {
      const newArr = prevEl.pop();
      console.log(newArr);

      return [];
    });
  }
  return (
    <DocumentTitle title="Стек">
      <SolutionLayout title="Стек">
        <Form handleSubmit={handleSubmit} extraClass={styles.form}>
          <fieldset className={styles.form__stackControl}>
            <Input
              maxLength={MAX_LENGTH_INPUT}
              isLimitText
              onChange={(e) => setNewStackElement(e.currentTarget.value)}
              value={newStackElement}
            />
            <Button
              text="Добавить"
              type="submit"
              extraClass={styles.form__button}
              onClick={handleClickAddBtn}
            />
            <Button
              text="Удалить"
              type="submit"
              extraClass={styles.form__button}
              onClick={handleClickRemoveBtn}
            />
          </fieldset>
          <Button text="Очистить" type="submit" extraClass={styles.form__button} />
        </Form>
        <VizualAlgoContent>{showElements}</VizualAlgoContent>
      </SolutionLayout>
    </DocumentTitle>
  );
};
