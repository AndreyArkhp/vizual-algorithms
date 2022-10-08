import React, {FormEvent, useEffect, useState} from "react";
import DocumentTitle from "react-document-title";
import {DELAY_IN_MS} from "../../constants/delays";
import {TITLE_PAGE} from "../../constants/sorting-page";
import {Direction} from "../../types/direction";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {RadioInput} from "../ui/radio-input/radio-input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import styles from "./sorting-page.module.css";
import {IShowElement, TMethodSort} from "./types";
import {getNewShowElements, sortBubble, sortSelection} from "./utils";

export const SortingPage: React.FC = () => {
  const [methodSort, setMethodSort] = useState<TMethodSort>("selection");
  const [direction, setDirection] = useState(Direction.Ascending);
  const [showElements, setShowElements] = useState<IShowElement[]>([]);
  const [btnDisabled, setBtnDisabled] = useState(false);

  useEffect(() => {
    setShowElements(getNewShowElements());
  }, []);

  function handleSubbmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBtnDisabled(true);
    const sortFunc = methodSort === "selection" ? sortSelection : sortBubble;
    let result = sortFunc(direction, showElements);
    setShowElements(result.value);
    const timerId = setInterval(() => {
      result = sortFunc(direction, result.value);
      if (result.done) {
        clearInterval(timerId);
        setBtnDisabled(false);
      }
      setShowElements(result.value);
    }, DELAY_IN_MS);
  }

  function handleCheckedRadio(e: FormEvent<HTMLInputElement>) {
    if (e.currentTarget.name === "selection") {
      setMethodSort("selection");
    } else {
      setMethodSort("bubble");
    }
  }

  function handleClickNewArr() {
    setShowElements(getNewShowElements());
  }

  return (
    <DocumentTitle title={TITLE_PAGE}>
      <SolutionLayout title={TITLE_PAGE}>
        <Form handleSubmit={handleSubbmit} extraClass={styles.form}>
          <fieldset className={`${styles.form__field} ${styles.form__field_type_radio}`}>
            <RadioInput
              label="Выбор"
              name="selection"
              onChange={handleCheckedRadio}
              checked={methodSort === "selection"}
              disabled={btnDisabled}
            />
            <RadioInput
              label="Пузырек"
              name="bubble"
              onChange={handleCheckedRadio}
              checked={methodSort === "bubble"}
              disabled={btnDisabled}
            />
          </fieldset>
          <fieldset className={`${styles.form__field} ${styles.form__field_type_button}`}>
            <Button
              type="submit"
              onClick={() => setDirection(Direction.Ascending)}
              sorting={Direction.Ascending}
              text="По возрастанию"
              disabled={btnDisabled}
              isLoader={direction === Direction.Ascending && btnDisabled}
            />
            <Button
              type="submit"
              onClick={() => setDirection(Direction.Descending)}
              sorting={Direction.Descending}
              text="По убыванию"
              disabled={btnDisabled}
              isLoader={direction === Direction.Descending && btnDisabled}
            />
          </fieldset>
          <Button
            type="button"
            text="Новый массив"
            onClick={handleClickNewArr}
            disabled={btnDisabled}
          />
          <Button
            type="button"
            text="test"
            onClick={() => {
              console.log(sortBubble(Direction.Descending, showElements));
            }}
          />
        </Form>
        <VizualAlgoContent extraClass={styles.sorting__content}>
          {showElements.map((el) => (
            <Column index={el.value} key={el.id} state={el.state} />
          ))}
        </VizualAlgoContent>
      </SolutionLayout>
    </DocumentTitle>
  );
};
