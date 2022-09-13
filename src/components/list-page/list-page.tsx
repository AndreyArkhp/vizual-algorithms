import React from "react";
import DocumentTitle from "react-document-title";
import {MAX_LENGTH_INPUT} from "../../constants/list";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./list.module.css";
import {LinkedList} from "./utils";

export const ListPage: React.FC = () => {
  console.log(new LinkedList(["a", "b"]));
  return (
    <DocumentTitle title="Связный список">
      <SolutionLayout title="Связный список">
        <Form handleSubmit={() => {}} extraClass={styles.form}>
          <Input placeholder="Введите значение" maxLength={MAX_LENGTH_INPUT} isLimitText />
          <Button text="Добавить в head" />
          <Button text="Добавить в tail" />
          <Button text="Удалить из head" />
          <Button text="Удалить из tail" />

          <Input placeholder="Введите индекс" />
          <Button text="Добавить по индексу" extraClass={styles.form__largeBtn} />
          <Button text="Удалить по индексу" extraClass={styles.form__largeBtn} />
        </Form>
      </SolutionLayout>
    </DocumentTitle>
  );
};
