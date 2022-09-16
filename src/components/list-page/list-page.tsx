import React, {Fragment, useRef, useState} from "react";
import DocumentTitle from "react-document-title";
import {DELAY_IN_MS} from "../../constants/delays";
import {
  MAX_LENGTH_ARR,
  MAX_LENGTH_INPUT,
  MAX_NUMBER_IN_ARR,
  MIN_LINGTH_ARR,
  pointerPosition,
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
import {Pointer, TPosition} from "./types";
import {changeStateShowElements, LinkedList, movePointer} from "./utils";

export const ListPage: React.FC = () => {
  const linkedList = useRef(
    new LinkedList<string>(getRandomArr(MIN_LINGTH_ARR, MAX_LENGTH_ARR, MAX_NUMBER_IN_ARR))
  );
  const [inputValue, setInputValue] = useState("");
  const [inputIndex, setInputIndex] = useState("");
  const [showElements, setShowElements] = useState(linkedList.current.toArray());
  const [stepValue, setStepValue] = useState("");
  const [stepPosition, setStepPosition] = useState(pointerPosition);
  const [btnActive, setBtnActive] = useState(currentBtnLoading.NoActive);

  function handleClickAddHeadOrTail(position: TPosition) {
    let index: number;
    setStepValue(inputValue);
    setInputValue("");
    if (position === "head") {
      index = 0;
      setBtnActive(currentBtnLoading.HeadAdd);
      setStepPosition({display: Pointer.Visible, top: Pointer.Top, left: Pointer.Start});
      linkedList.current.prepend(inputValue);
    } else {
      index = showElements.length;
      setBtnActive(currentBtnLoading.TailAdd);
      setStepPosition({
        display: Pointer.Visible,
        top: Pointer.Top,
        left: `${parseInt(Pointer.Start) + Pointer.Step * (index - 1)}px`,
      });
      linkedList.current.append(inputValue);
    }

    setTimeout(() => {
      setStepPosition((prev) => {
        return {...prev, display: Pointer.Hidden};
      });
      const newArr = linkedList.current.toArray();

      newArr[index].state = ElementStates.Modified;
      setShowElements(newArr);
      setTimeout(() => {
        setBtnActive(currentBtnLoading.NoActive);
        setStepValue("");
        newArr[index].state = ElementStates.Default;
        setShowElements([...newArr]);
      }, DELAY_IN_MS);
    }, DELAY_IN_MS);
  }

  function handleClickRemoveHeadOrTail(position: TPosition) {
    let index: number;
    if (position === "head") {
      index = 0;
      setBtnActive(currentBtnLoading.HeadRemove);
      setStepValue(showElements[index].value);
      setStepPosition({display: Pointer.Visible, top: Pointer.Bottom, left: Pointer.Start});
    } else {
      index = showElements.length - 1;
      setBtnActive(currentBtnLoading.TailRemove);
      setStepValue(showElements[index].value);
      setStepPosition({
        display: Pointer.Visible,
        top: Pointer.Bottom,
        left: `${parseInt(Pointer.Start) + Pointer.Step * index}px`,
      });
    }
    showElements[index].value = "";
    setShowElements([...showElements]);
    position === "head" ? linkedList.current.deleteHead() : linkedList.current.deleteTail();
    setTimeout(() => {
      setStepValue("");
      setStepPosition({top: Pointer.Top, left: Pointer.Start, display: Pointer.Hidden});
      const newArr = linkedList.current.toArray();
      setShowElements(newArr);
      setBtnActive(currentBtnLoading.NoActive);
    }, DELAY_IN_MS);
  }

  function handleClickAddByIndex(index: string) {
    setBtnActive(currentBtnLoading.IndexAdd);
    setStepValue(inputValue);
    movePointer(index, setStepPosition);
    linkedList.current.insertAt(inputValue, +index);
    const newArr = linkedList.current.toArray();
    const timerId = setInterval(() => {
      const position = movePointer(index, setStepPosition);
      setShowElements([...changeStateShowElements(showElements, newArr, +index)]);
      if (position) {
        clearInterval(timerId);
        setBtnActive(currentBtnLoading.NoActive);
        setTimeout(() => {
          setShowElements(
            newArr.map((el) => {
              el.state = ElementStates.Default;
              return el;
            })
          );
        }, DELAY_IN_MS);
      }
    }, DELAY_IN_MS);
    setInputValue("");
    setInputIndex("");
  }

  return (
    <DocumentTitle title="Связный список">
      <SolutionLayout title="Связный список">
        <Form handleSubmit={() => {}} extraClass={styles.form}>
          <p
            className={`${styles.form__error} ${styles.form__error_type_lengthList} ${
              showElements.length >= 7 && styles.form__error_visible
            }`}
          >
            Максимальная длинна списка
          </p>
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
            onClick={() => handleClickAddHeadOrTail("head")}
            disabled={!inputValue || showElements.length >= 7}
            isLoader={btnActive === currentBtnLoading.HeadAdd}
          />
          <Button
            text="Добавить в tail"
            type="button"
            isLoader={btnActive === currentBtnLoading.TailAdd}
            disabled={!inputValue || showElements.length >= 7}
            onClick={() => handleClickAddHeadOrTail("tail")}
          />
          <Button
            text="Удалить из head"
            type="button"
            onClick={() => handleClickRemoveHeadOrTail("head")}
            isLoader={btnActive === currentBtnLoading.HeadRemove}
            disabled={btnActive !== currentBtnLoading.NoActive}
          />
          <Button
            text="Удалить из tail"
            isLoader={btnActive === currentBtnLoading.TailRemove}
            disabled={btnActive !== currentBtnLoading.NoActive}
            onClick={() => handleClickRemoveHeadOrTail("tail")}
          />

          <Input
            placeholder="Введите индекс"
            type="number"
            value={inputIndex}
            onChange={(e) => setInputIndex(e.currentTarget.value)}
            max={showElements.length - 1}
          />
          <p
            className={`${styles.form__error} ${styles.form__error_type_maxIndex} ${
              +inputIndex > showElements.length - 1 && styles.form__error_visible
            }`}
          >
            Максимальный индекс равен {showElements.length - 1}
          </p>
          <Button
            text="Добавить по индексу"
            extraClass={styles.form__largeBtn}
            isLoader={btnActive === currentBtnLoading.IndexAdd}
            disabled={
              !inputValue ||
              !inputIndex ||
              btnActive !== currentBtnLoading.NoActive ||
              +inputIndex > showElements.length - 1
            }
            onClick={() => handleClickAddByIndex(inputIndex)}
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.form__largeBtn}
            isLoader={btnActive === currentBtnLoading.IndexRemove}
            disabled={btnActive !== currentBtnLoading.NoActive}
          />
        </Form>

        <VizualAlgoContent extraClass={styles.vizualContent}>
          <div className={styles.step} style={stepPosition}>
            <Circle letter={stepValue} isSmall state={ElementStates.Changing} />
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
