import {FC, FormEvent, ReactNode} from "react";
import styles from "./form.module.css";

interface IFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  extraClass?: string;
}

export const Form: FC<IFormProps> = ({handleSubmit, children, extraClass = ""}) => {
  return (
    <form className={`${styles.form} ${extraClass}`} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
