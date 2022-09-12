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
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [newStackElement, setNewStackElement] = useState("");
  const [showElements, setShowElements] = useState<{value: string; id: string}[]>([]);
  const [headState, setHeadState] = useState(ElementStates.Changing);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowElements([]);
  }
  function handleClickAddBtn() {
    setShowElements([...showElements, {value: newStackElement, id: uuidv4()}]);
    setHeadState(ElementStates.Changing);
    setNewStackElement("");
    setTimeout(() => setHeadState(ElementStates.Default), SHORT_DELAY_IN_MS);
  }
  function handleClickRemoveBtn() {
    setHeadState(ElementStates.Changing);
    setTimeout(() => {
      setShowElements(showElements.slice(0, -1));
      setHeadState(ElementStates.Default);
    }, SHORT_DELAY_IN_MS);
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
              type="button"
              extraClass={styles.form__button}
              onClick={handleClickAddBtn}
            />
            <Button
              text="Удалить"
              type="button"
              extraClass={styles.form__button}
              onClick={handleClickRemoveBtn}
            />
          </fieldset>
          <Button text="Очистить" type="submit" extraClass={styles.form__button} />
        </Form>
        <VizualAlgoContent>
          {showElements.map((el, index, arr) => {
            return (
              <Circle
                letter={el.value}
                head={el === arr.at(-1) ? "Top" : ""}
                key={el.id}
                index={index}
                state={el === arr.at(-1) ? headState : ElementStates.Default}
              />
            );
          })}
        </VizualAlgoContent>
      </SolutionLayout>
    </DocumentTitle>
  );
};
