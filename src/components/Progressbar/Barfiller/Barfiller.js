import React, { Component } from "react";
import styles from "./Barfiller.css";
class Barfiller extends Component {
  render() {
    let barstyle = {
      width: this.props.width + "%",
      backgroundColor: this.props.width > 100 ? "orangered" : "lightgreen"
      //backgroundColor:'rgb(140, X, 0)'.replace('X',140-this.props.width)
    };
    return (
      <div className={styles.filler} style={barstyle}>
        {this.props.width}%
      </div>
    );
  }
}

export default Barfiller;
