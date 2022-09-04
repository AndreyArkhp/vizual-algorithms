import React, {FormEvent, useState} from "react";
import {BUTTON_TEXT, MAX_LENGTH_INPUT, TITLE_PAGE} from "../../constants/string-page";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState("");
  const [isShow, setIsShow] = useState(false);
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsShow(true);
  }
  return (
    <SolutionLayout title={TITLE_PAGE} extraClass={styles.layout}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          maxLength={MAX_LENGTH_INPUT}
          isLimitText
          value={string}
          onChange={(e) => setString(e.currentTarget.value)}
        />
        <Button type="submit" text={BUTTON_TEXT} linkedList="small" />
      </form>
      <section className={styles.visualization}>
        {isShow && string.split("").map((el, index) => <Circle letter={el} key={index} />)}
      </section>
    </SolutionLayout>
  );
};
