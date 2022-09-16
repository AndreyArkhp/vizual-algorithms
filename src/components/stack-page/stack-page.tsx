import React, {FormEvent, useRef, useState} from "react";
import {v4 as uuidv4} from "uuid";
import DocumentTitle from "react-document-title";
import {MAX_LENGTH_INPUT} from "../../constants/stack-and-queue-page";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import styles from "./stack-page.module.css";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Stack} from "./utils";

export const StackPage: React.FC = () => {
  const stack = useRef(new Stack<string>());
  const [newStackElement, setNewStackElement] = useState("");
  const [showElements, setShowElements] = useState<{value: string; id: string}[]>([]);
  const [headState, setHeadState] = useState(ElementStates.Default);
  const [isLoaderRemoveBtn, setIsLoaderRemoveBtn] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setShowElements([]);
  }
  function handleClickAddBtn() {
    stack.current.push(newStackElement, uuidv4());
    setShowElements([...stack.current.getElements]);
    setHeadState(ElementStates.Changing);
    setNewStackElement("");
    setTimeout(() => setHeadState(ElementStates.Default), SHORT_DELAY_IN_MS);
  }
  function handleClickRemoveBtn() {
    stack.current.pop();
    setIsLoaderRemoveBtn(true);
    setHeadState(ElementStates.Changing);
    setTimeout(() => {
      setShowElements(stack.current.getElements);
      setHeadState(ElementStates.Default);
      setIsLoaderRemoveBtn(false);
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
              extraClass={`${styles.form__button} ${styles.form__button_type_add}`}
              onClick={handleClickAddBtn}
              disabled={showElements.length > 9 || !newStackElement}
              isLoader={headState === ElementStates.Changing && !isLoaderRemoveBtn}
            />
            <Button
              text="Удалить"
              type="button"
              extraClass={`${styles.form__button} ${styles.form__button_type_remove}`}
              onClick={handleClickRemoveBtn}
              disabled={!showElements.length}
              isLoader={isLoaderRemoveBtn}
            />
          </fieldset>
          <Button
            text="Очистить"
            type="submit"
            extraClass={styles.form__button}
            disabled={!showElements.length}
          />
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
