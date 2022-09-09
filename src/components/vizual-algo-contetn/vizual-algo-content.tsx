import {FC, ReactNode} from "react";
import styles from "./vizual-algo-content.module.css";

export const VizualAlgoContent: FC<{children: ReactNode; extraClass?: string}> = ({
  children,
  extraClass,
}) => {
  return <section className={`${styles.visualization} ${extraClass}`}>{children}</section>;
};
