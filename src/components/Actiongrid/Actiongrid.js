import React, { Component } from "react";
import Button from "../UI/Button/Button";
import Listbox from "../UI/Listbox/Listbox";
import styles from "./Actiongrid.css";
class actiongrid extends Component {
  state = {
    selectindex: 0
  };

  render() {
    const handleOnselect = e => {
      this.setState({ selectindex: e.nativeEvent.target.selectedIndex });
    };

    let buttons = null;
    if (this.props.buttons.length > 0)
      buttons = this.props.buttons.map((val, index) => {
        return (
          <Button
            clickBtn={() => this.props.clickBtn(this.state.selectindex, val)}
            key={index}
          >
            {val}
          </Button>
        );
      });
    return (
      <div className={styles.actiongrid}>
        {buttons}
        <Listbox
          handleOnselect={e => handleOnselect(e)}
          keys={this.props.bars}
          vals={this.props.bars.map((val,index)=>'Bar '+(index+1))}
        />
      </div>
    );
  }
}
export default actiongrid;
