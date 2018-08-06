import React, { Component } from "react";
import styles from "./Progressbars.css";
import axios from "axios";
import Progressbar from "../components/Progressbar/Progressbar";
import Actiongrid from "../components/Actiongrid/Actiongrid";
class Progressbars extends Component {
  state = {
    bars: [],
    buttons: [],
    limit: 0,
    servicestatuscode: 0
  };

  componentDidMount = () => {
    axios
      .get("http://pb-api.herokuapp.com/bars")
      .then(response => {
        this.setState(response.data);
      })
      .catch(err => {
        alert("Service Failied!!");
      });
  };

  handleOnClick = (barindex, val) => {
    const bars = [...this.state.bars];
    if (bars[barindex] + val > 0) bars[barindex] = bars[barindex] + val;
    else bars[barindex] = 0;

    this.setState({ bars: bars });
  };
  render() {
    const bars = [...this.state.bars];
    const progressbars = bars.map((val, index) => {
      const progressval = ((val / this.state.limit) * 100).toFixed(0);
      return (
        <Progressbar progressval={progressval} key={index}>
          {val}
        </Progressbar>
      );
    });

    return (
      <div className={styles.progressbars}>
        {progressbars}
        <Actiongrid
          clickBtn={this.handleOnClick}
          buttons={this.state.buttons}
          bars={this.state.bars}
        />
      </div>
    );
  }
}

export default Progressbars;
