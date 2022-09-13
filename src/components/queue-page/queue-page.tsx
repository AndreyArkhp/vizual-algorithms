import React, {FormEvent, useMemo, useState} from "react";
import DocumentTitle from "react-document-title";
import {MAX_LENGTH_INPUT} from "../../constants/stack-and-queue-page";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import {Queue} from "./queue";
import styles from "./queue.module.css";

// const queue = new Queue<string>(10);

export const QueuePage: React.FC = () => {
  const memoQueue = useMemo(() => new Queue<string>(10), []);
  const [newQueueElement, setNewQueueElement] = useState("");
  const [showElements, setShowElements] = useState(memoQueue.getElements);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNewQueueElement("");
    setShowElements([...memoQueue.getElements]);
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
              type="submit"
              extraClass={`${styles.form__button} ${styles.form__button_type_add}`}
              onClick={() => memoQueue.enqueue(newQueueElement)}
              disabled={memoQueue.isFull || !newQueueElement}
              // isLoader={headState === ElementStates.Changing && !isLoaderRemoveBtn}
            />
            <Button
              text="Удалить"
              type="submit"
              extraClass={`${styles.form__button} ${styles.form__button_type_remove}`}
              onClick={() => memoQueue.dequeue()}
              disabled={memoQueue.isEmpty}
              // isLoader={isLoaderRemoveBtn}
            />
          </fieldset>
          <Button
            text="Очистить"
            type="submit"
            extraClass={styles.form__button}
            onClick={() => memoQueue.clear()}
            disabled={memoQueue.isEmpty}
          />
        </Form>
        <VizualAlgoContent>
          {showElements.map((el, index) => (
            <Circle
              letter={typeof el === "string" ? el : ""}
              key={index}
              head={index === memoQueue.getHead && !memoQueue.isEmpty ? "head" : ""}
              tail={index === memoQueue.getTail && !memoQueue.isEmpty ? "tail" : ""}
            />
          ))}
        </VizualAlgoContent>
      </SolutionLayout>
    </DocumentTitle>
  );
};
