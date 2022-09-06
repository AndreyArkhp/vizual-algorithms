import {FC, ReactNode} from "react";
import styles from "./vizual-algo-content.module.css";

export const VizualAlgoContent: FC<{children: ReactNode}> = ({children}) => {
  return <section className={styles.visualization}>{children}</section>;
};
