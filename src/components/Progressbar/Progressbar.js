import React, { Component } from "react";
import Barfiller from "./Barfiller/Barfiller";
import styles from "./Progressbar.css";
class Progressbar extends Component {
  render() {
    const getProgressVal = val => {
      return val <= 0 ? 0 : val;
    };
    return (
      <div className={styles.progressbar}>
        <Barfiller width={getProgressVal(this.props.progressval)}/>
      </div>
    );
  }
}

export default Progressbar;
