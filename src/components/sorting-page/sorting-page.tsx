import React, {FormEvent, useState} from "react";

import {TITLE_PAGE} from "../../constants/string-page";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {RadioInput} from "../ui/radio-input/radio-input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import styles from "./sorting-page.module.css";
import {getRandomArr} from "./utils";

type TMethodSort = "bubble" | "selection";
interface IShowElement {
  value: number;
  state: ElementStates;
  id: string;
}

export const SortingPage: React.FC = () => {
  const [methodSort, setMethodSort] = useState<TMethodSort>("selection");
  const [checkedSelected, setCheckedSelected] = useState(true);
  const [checkedBubble, setCheckedBubble] = useState(false);
  const [showElements, setShowElements] = useState<IShowElement[]>([]);

  function handleSubbmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit", showElements);
  }

  function handleCheckedRadio(e: FormEvent<HTMLInputElement>) {
    setCheckedSelected(!checkedSelected);
    setCheckedBubble(!checkedBubble);
  }
  function handleClickNewArr() {
    setShowElements(getRandomArr());
  }

  return (
    <SolutionLayout title={TITLE_PAGE}>
      <Form handleSubmit={handleSubbmit} extraClass={styles.form}>
        <fieldset className={`${styles.form__field} ${styles.form__field_type_radio}`}>
          <RadioInput
            label="Выбор"
            name="selected"
            onChange={handleCheckedRadio}
            checked={checkedSelected}
          />
          <RadioInput
            label="Пузырек"
            name="bubble"
            onChange={handleCheckedRadio}
            checked={checkedBubble}
          />
        </fieldset>
        <fieldset className={`${styles.form__field} ${styles.form__field_type_button}`}>
          <Button
            type="submit"
            onClick={() => console.log(1)}
            sorting={Direction.Ascending}
            text="По возрастанию"
          />
          <Button
            type="submit"
            onClick={() => console.log(2)}
            sorting={Direction.Descending}
            text="По убыванию"
          />
        </fieldset>
        <Button type="button" text="Новый массив" onClick={handleClickNewArr} />
      </Form>
      <VizualAlgoContent extraClass={styles.sorting__content}>
        {showElements.map((el) => (
          <Column index={el.value} key={el.id} />
        ))}
      </VizualAlgoContent>
    </SolutionLayout>
  );
};
