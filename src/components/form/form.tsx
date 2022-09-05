import {FC, FormEvent, ReactNode} from "react";
import styles from "./form.module.css";

interface IFormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

export const Form: FC<IFormProps> = ({handleSubmit, children}) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {children}
    </form>
  );
};
