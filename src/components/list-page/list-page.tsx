import React, {Fragment, useRef, useState} from "react";
import DocumentTitle from "react-document-title";
import {DELAY_IN_MS} from "../../constants/delays";
import {
  MAX_LENGTH_ARR,
  MAX_LENGTH_INPUT,
  MAX_NUMBER_IN_ARR,
  MIN_LINGTH_ARR,
} from "../../constants/list";
import {currentBtnLoading} from "../../types/current-btn-loading";
import {ElementStates} from "../../types/element-states";
import {getRandomArr} from "../../utils/function";
import {Form} from "../form/form";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {Input} from "../ui/input/input";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {VizualAlgoContent} from "../vizual-algo-contetn/vizual-algo-content";
import styles from "./list.module.css";
import {LinkedList} from "./utils";

export const ListPage: React.FC = () => {
  const linkedList = useRef(
    new LinkedList<string>(getRandomArr(MIN_LINGTH_ARR, MAX_LENGTH_ARR, MAX_NUMBER_IN_ARR))
  );
  const [inputValue, setInputValue] = useState("");
  const [showElements, setShowElements] = useState(linkedList.current.toArray());
  const [stepState, setStepState] = useState(ElementStates.Default);
  const [stepValue, setStepValue] = useState("");
  const [styleStep, setStyleStep] = useState({top: "-65px", left: "12px", display: "none"});
  const [btnActive, setBtnActive] = useState(currentBtnLoading.NoActive);
  function handleClickAddHead() {
    setStepValue(inputValue);
    setInputValue("");
    setBtnActive(currentBtnLoading.HeadAdd);
    setStyleStep((prev) => {
      return {...prev, display: "block"};
    });
    setStepState(ElementStates.Changing);
    linkedList.current.prepend(inputValue);
    setTimeout(() => {
      setStyleStep((prev) => {
        return {...prev, display: "none"};
      });
      const newArr = linkedList.current.toArray();
      newArr[0].state = ElementStates.Modified;
      setShowElements(newArr);
      setStepState(ElementStates.Default);
      setTimeout(() => {
        setBtnActive(currentBtnLoading.NoActive);
        setStepValue("");
        newArr[0].state = ElementStates.Default;
        setShowElements([...newArr]);
      }, DELAY_IN_MS);
    }, DELAY_IN_MS);
  }

  function handleClickRemoveHead() {
    setBtnActive(currentBtnLoading.HeadRemove);
    setStepValue(showElements[0].value);
    setStyleStep({display: "block", top: "118px", left: "12px"});
    setStepState(ElementStates.Changing);
    showElements[0].value = "";
    setShowElements([...showElements]);
    linkedList.current.deleteHead();
    setTimeout(() => {
      setStepValue("");
      setStyleStep({top: "-65px", left: "12px", display: "none"});
      setStepState(ElementStates.Default);
      const newArr = linkedList.current.toArray();
      setShowElements(newArr);
      setBtnActive(currentBtnLoading.NoActive);
    }, DELAY_IN_MS);
  }
  console.log("render", linkedList.current.toArray());

  return (
    <DocumentTitle title="Связный список">
      <SolutionLayout title="Связный список">
        <Form handleSubmit={() => {}} extraClass={styles.form}>
          <Input
            placeholder="Введите значение"
            maxLength={MAX_LENGTH_INPUT}
            isLimitText
            value={inputValue}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
          <Button
            text="Добавить в head"
            type="button"
            onClick={handleClickAddHead}
            disabled={!inputValue}
            isLoader={btnActive === currentBtnLoading.HeadAdd}
          />
          <Button
            text="Добавить в tail"
            type="button"
            isLoader={btnActive === currentBtnLoading.TailAdd}
            disabled={!inputValue}
          />
          <Button
            text="Удалить из head"
            type="button"
            onClick={handleClickRemoveHead}
            isLoader={btnActive === currentBtnLoading.HeadRemove}
            disabled={btnActive !== currentBtnLoading.NoActive}
          />
          <Button
            text="Удалить из tail"
            isLoader={btnActive === currentBtnLoading.TailRemove}
            disabled={btnActive !== currentBtnLoading.NoActive}
          />

          <Input placeholder="Введите индекс" type="number" />
          <Button
            text="Добавить по индексу"
            extraClass={styles.form__largeBtn}
            isLoader={btnActive === currentBtnLoading.IndexAdd}
            disabled={btnActive !== currentBtnLoading.NoActive}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.form__largeBtn}
            isLoader={btnActive === currentBtnLoading.IndexRemove}
            disabled={btnActive !== currentBtnLoading.NoActive}
          />
        </Form>

        <VizualAlgoContent extraClass={styles.vizualContent}>
          <div className={styles.step} style={styleStep}>
            <Circle letter={stepValue} isSmall state={stepState} />
          </div>
          {showElements.map((el, index, arr) => (
            <Fragment key={index}>
              <Circle
                letter={el.value}
                key={el.id}
                index={index}
                head={index === 0 ? "head" : ""}
                tail={el === arr.at(-1) ? "tail" : ""}
                state={el.state}
              />
              {index < arr.length - 1 && <ArrowIcon key={index} />}
            </Fragment>
          ))}
        </VizualAlgoContent>
      </SolutionLayout>
    </DocumentTitle>
  );
};
