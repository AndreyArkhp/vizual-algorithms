import React, {FormEvent} from "react";
import {TITLE_PAGE} from "../../constants/string-page";
import {Direction} from "../../types/direction";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {RadioInput} from "../ui/radio-input/radio-input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import styles from "./sorting-page.module.css";

export const SortingPage: React.FC = () => {
  function handleSubbmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");
  }
  return (
    <SolutionLayout title={TITLE_PAGE}>
      <Form handleSubmit={handleSubbmit} extraClass={styles.form}>
        <fieldset className={`${styles.form__field} ${styles.form__field_type_radio}`}>
          <RadioInput label="Выбор" />
          <RadioInput label="Пузырек" />
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
        <Button type="button" text="Новый массив" />
      </Form>
      <VizualAlgoContent extraClass={styles.sorting__content}>
        <Column index={1} />
        <Column index={10} />
        <Column index={100} />
      </VizualAlgoContent>
    </SolutionLayout>
  );
};
