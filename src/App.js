import React, { Component } from 'react';
import styles from './App.css';
import Progressbars from './containers/Progressbars'
class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        
        <Progressbars></Progressbars>
        
      </div>
    );
  }
}

export default App;
