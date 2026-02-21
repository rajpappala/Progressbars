import React, { Component } from 'react';
import styles from './TambolaCounter.css';

class TambolaCounter extends Component {
  state = {
    called: new Array(91).fill(false),   // index 1-90
    history: [],
    lastCalled: null,
    gameOver: false,
    autoDrawing: false,
    autoInterval: null,
  };

  componentWillUnmount() {
    if (this.state.autoInterval) clearInterval(this.state.autoInterval);
  }

  drawNumber = () => {
    const { called, history } = this.state;
    const remaining = [];
    for (let i = 1; i <= 90; i++) {
      if (!called[i]) remaining.push(i);
    }
    if (remaining.length === 0) {
      this.setState({ gameOver: true });
      return;
    }
    const pick = remaining[Math.floor(Math.random() * remaining.length)];
    const newCalled = [...called];
    newCalled[pick] = true;
    this.setState({
      called: newCalled,
      history: [...history, pick],
      lastCalled: pick,
      gameOver: remaining.length === 1,
    });
  };

  toggleAuto = () => {
    const { autoDrawing, autoInterval } = this.state;
    if (autoDrawing) {
      clearInterval(autoInterval);
      this.setState({ autoDrawing: false, autoInterval: null });
    } else {
      const interval = setInterval(() => {
        const { called, gameOver } = this.state;
        if (gameOver) {
          clearInterval(interval);
          this.setState({ autoDrawing: false, autoInterval: null });
          return;
        }
        const remaining = [];
        for (let i = 1; i <= 90; i++) {
          if (!called[i]) remaining.push(i);
        }
        if (remaining.length === 0) {
          clearInterval(interval);
          this.setState({ autoDrawing: false, autoInterval: null, gameOver: true });
          return;
        }
        this.drawNumber();
      }, 2000);
      this.setState({ autoDrawing: true, autoInterval: interval });
    }
  };

  resetGame = () => {
    if (this.state.autoInterval) clearInterval(this.state.autoInterval);
    this.setState({
      called: new Array(91).fill(false),
      history: [],
      lastCalled: null,
      gameOver: false,
      autoDrawing: false,
      autoInterval: null,
    });
  };

  getRowLabel(row) {
    // Tambola rows: 1-10, 11-20, ... 81-90
    const start = row * 10 + 1;
    const end = row * 10 + 10;
    return `${start}-${end}`;
  }

  render() {
    const { called, history, lastCalled, gameOver, autoDrawing } = this.state;
    const totalCalled = history.length;
    const remaining = 90 - totalCalled;

    // Group numbers into rows of 10
    const rows = [];
    for (let r = 0; r < 9; r++) {
      const cells = [];
      for (let c = 1; c <= 10; c++) {
        const num = r * 10 + c;
        cells.push(num);
      }
      rows.push(cells);
    }

    return (
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Tambola</h1>
          <p className={styles.subtitle}>Number Counter</p>
        </div>

        {/* Current Number Display */}
        <div className={styles.currentSection}>
          {lastCalled ? (
            <div className={styles.currentNumber}>
              <span className={styles.currentLabel}>Current Number</span>
              <span className={styles.bigNumber}>{lastCalled}</span>
            </div>
          ) : (
            <div className={styles.currentNumber}>
              <span className={styles.waitingText}>
                {gameOver ? 'All 90 numbers called!' : 'Press Draw to start'}
              </span>
            </div>
          )}
          <div className={styles.stats}>
            <div className={styles.statBox}>
              <span className={styles.statValue}>{totalCalled}</span>
              <span className={styles.statLabel}>Called</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>{remaining}</span>
              <span className={styles.statLabel}>Remaining</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={styles.drawBtn}
            onClick={this.drawNumber}
            disabled={gameOver || autoDrawing}
          >
            Draw Number
          </button>
          <button
            className={`${styles.autoBtn} ${autoDrawing ? styles.autoBtnActive : ''}`}
            onClick={this.toggleAuto}
            disabled={gameOver}
          >
            {autoDrawing ? 'Stop Auto' : 'Auto Draw'}
          </button>
          <button className={styles.resetBtn} onClick={this.resetGame}>
            Reset
          </button>
        </div>

        {/* Number Board */}
        <div className={styles.board}>
          <h2 className={styles.boardTitle}>Number Board</h2>
          <div className={styles.grid}>
            {rows.map((row, rowIdx) => (
              <div key={rowIdx} className={styles.row}>
                {row.map(num => (
                  <div
                    key={num}
                    className={`${styles.cell} ${called[num] ? styles.cellCalled : ''} ${num === lastCalled ? styles.cellLast : ''}`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Call History */}
        {history.length > 0 && (
          <div className={styles.historySection}>
            <h2 className={styles.boardTitle}>Call History</h2>
            <div className={styles.history}>
              {[...history].reverse().map((num, idx) => (
                <span
                  key={idx}
                  className={`${styles.historyItem} ${idx === 0 ? styles.historyLatest : ''}`}
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        )}

        {gameOver && (
          <div className={styles.gameOverBanner}>
            All 90 numbers have been called! Game Over.
            <button className={styles.resetBtn} onClick={this.resetGame} style={{ marginLeft: '16px' }}>
              New Game
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default TambolaCounter;
