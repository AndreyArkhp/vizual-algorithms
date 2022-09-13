import React, {FormEvent, useEffect, useMemo, useState} from "react";
import {v4 as uuidv4} from "uuid";
import DocumentTitle from "react-document-title";
import {MAX_LENGTH_INPUT, QUEUE_LENGTH} from "../../constants/stack-and-queue-page";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import {Queue, unionStates} from "./utils";
import styles from "./queue.module.css";
import {ElementStates} from "../../types/element-states";
import {IElement} from "./types";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const memoQueue = useMemo(() => new Queue<string>(QUEUE_LENGTH), []);
  const [newQueueElement, setNewQueueElement] = useState("");
  const [showElements, setShowElements] = useState<IElement[]>([]);
  const [isLoaderRemoveBtn, setIsLoaderRemoveBtn] = useState(false);

  useEffect(() => {
    const newArr: IElement[] = [];
    for (let i = 0; i < QUEUE_LENGTH; i++) {
      newArr.push({value: "", id: uuidv4(), state: ElementStates.Default});
    }
    setShowElements(newArr);
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    memoQueue.clear();
    setShowElements((prev) => unionStates(prev, memoQueue.getElements));
  }

  function handleClickAddBtn() {
    const value = newQueueElement;
    setNewQueueElement("");
    setShowElements((prev) => {
      const tail = memoQueue.getTail;
      if (tail === QUEUE_LENGTH - 1 || (tail === 0 && !prev[0].value) || !prev[tail].value) {
        prev[0].state = ElementStates.Changing;
        return [...prev];
      }
      prev[memoQueue.getTail + 1].state = ElementStates.Changing;
      return [...prev];
    });
    setTimeout(() => {
      memoQueue.enqueue(value);
      setShowElements((prev) => unionStates(prev, memoQueue.getElements));
    }, SHORT_DELAY_IN_MS);
  }

  function handleClickRemoveBtn() {
    setIsLoaderRemoveBtn(true);
    setShowElements((prev) => {
      prev[memoQueue.getHead].state = ElementStates.Changing;
      return [...prev];
    });
    setTimeout(() => {
      memoQueue.dequeue();
      setShowElements((prev) => unionStates(prev, memoQueue.getElements));
      setIsLoaderRemoveBtn(false);
    }, SHORT_DELAY_IN_MS);
  }

  return (
    <DocumentTitle title="Очередь">
      <SolutionLayout title="Очередь">
        <Form handleSubmit={handleSubmit} extraClass={styles.form}>
          <fieldset className={styles.form__stackControl}>
            <Input
              maxLength={MAX_LENGTH_INPUT}
              isLimitText
              onChange={(e) => setNewQueueElement(e.currentTarget.value)}
              value={newQueueElement}
            />
            <Button
              text="Добавить"
              type="button"
              extraClass={`${styles.form__button} ${styles.form__button_type_add}`}
              onClick={handleClickAddBtn}
              disabled={memoQueue.isFull || !newQueueElement}
            />
            <Button
              text="Удалить"
              type="button"
              extraClass={`${styles.form__button} ${styles.form__button_type_remove}`}
              onClick={handleClickRemoveBtn}
              disabled={memoQueue.isEmpty}
              isLoader={isLoaderRemoveBtn}
            />
          </fieldset>
          <Button
            text="Очистить"
            type="submit"
            extraClass={styles.form__button}
            disabled={memoQueue.isEmpty}
          />
        </Form>
        <VizualAlgoContent>
          {showElements.map((el, index) => (
            <Circle
              letter={el.value}
              key={el.id}
              head={index === memoQueue.getHead && !memoQueue.isEmpty ? "head" : ""}
              tail={index === memoQueue.getTail && !memoQueue.isEmpty ? "tail" : ""}
              index={index}
              state={el.state}
            />
          ))}
        </VizualAlgoContent>
      </SolutionLayout>
    </DocumentTitle>
  );
};
