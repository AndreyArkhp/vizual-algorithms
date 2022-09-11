import React from "react";
import DocumentTitle from "react-document-title";
import {MAX_LENGTH_INPUT} from "../../constants/stack-page";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  return (
    <DocumentTitle title="Стек">
      <SolutionLayout title="Стек">
        <Form handleSubmit={() => {}} extraClass={styles.form}>
          <fieldset className={styles.form__stackControl}>
            <Input maxLength={MAX_LENGTH_INPUT} isLimitText />
            <Button text="Добавить" type="submit" extraClass={styles.form__button} />
            <Button text="Удалить" type="submit" extraClass={styles.form__button} />
          </fieldset>
          <Button text="Очистить" type="submit" extraClass={styles.form__button} />
        </Form>
      </SolutionLayout>
    </DocumentTitle>
  );
};
