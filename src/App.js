import React, { Component } from 'react';
import styles from './App.css';
import TambolaCounter from './components/TambolaCounter/TambolaCounter';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <TambolaCounter />
      </div>
    );
  }
}

export default App;
