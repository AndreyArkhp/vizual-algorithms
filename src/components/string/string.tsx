import React, {useState} from "react";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import "./string.css";

export const StringComponent: React.FC = () => {
  const [string, setString] = useState("");
  return (
    <SolutionLayout title="Строка">
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input maxLength={11} isLimitText />
        <Button type="submit" extraClass="form__button" text="Развернуть" linkedList="small" />
        <p>{string}</p>
      </form>
    </SolutionLayout>
  );
};
