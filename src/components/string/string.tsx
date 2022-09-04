import React, {FormEvent, useState} from "react";
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
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input maxLength={11} isLimitText onChange={(e) => setString(e.currentTarget.value)} />
        <Button type="submit" text="Развернуть" linkedList="small" />
      </form>
      {isShow && string.split("").map((el, index) => <Circle letter={el} key={index} />)}
      <Circle letter="A" head="Head" tail="tail" isSmall />
    </SolutionLayout>
  );
};
