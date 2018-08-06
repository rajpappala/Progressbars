import React from "react";
import styles from "./Button.css";
const button = props => {
  return (
    <div>
      <button className={styles.button} onClick={props.clickBtn}>
        {props.children}
      </button>
    </div>
  );
};
export default button;
