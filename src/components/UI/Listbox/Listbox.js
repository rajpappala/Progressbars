import React from "react";
import styles from "./Listbox.css";
const listbox = props => {
  let options = null;
  if (props.keys)
    options = props.keys.map((val, index) => {
      return <option key={index}>{props.vals[index]}</option>;
    });

  return (
    <div>
      {props.keys.length > 0 ? (
        <select className={styles.listbox} onChange={props.handleOnselect}>
          {options}
        </select>
      ) : null}
    </div>
  );
};
export default listbox;
