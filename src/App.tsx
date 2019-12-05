import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import useElementSize from './hooks/useElementSize';
import useInterval from './hooks/useInterval';
import Cell from './models/Cell';
import Ecosystem from './models/Ecosystem';

enum AppState {
  STOPPED,
  RUNNING
}

const App: React.FC = () => {
  let field = useRef<HTMLDivElement | null>(null);
  let fieldSize = useElementSize(field);
  let [appState, setAppState] = useState<AppState>(AppState.STOPPED);
  let numOfRows = Math.floor(fieldSize.height / 16);
  let numOfCols = numOfRows;
  // let numOfCols = 10;
  // let numOfRows = 10;
  let [ generation, setGeneration ] = useState<number>(0);
  let [ cellEcosystem, setCellEcosystem ] = useState<Ecosystem>(new Ecosystem(numOfRows, numOfCols));
  useEffect(() => {
    setCellEcosystem(new Ecosystem(numOfRows, numOfCols));
    setAppState(AppState.STOPPED);
    setGeneration(0);
  }, [numOfRows, numOfCols]);

  let randomize = () => {
    setCellEcosystem(new Ecosystem(numOfRows, numOfCols));
    setAppState(AppState.STOPPED);
    setGeneration(0);
  }

  useInterval(() => {
    if (appState === AppState.RUNNING) {
      setGeneration(generation++);
      cellEcosystem.triggerNewGeneration();
    }
  }, 200);

  let toggleAlive = (cell : Cell) => {
    if (appState === AppState.STOPPED) {
      cellEcosystem.toggleAlive(cell);
      setCellEcosystem(cellEcosystem.clone())
    }
  }

  let toggleMassExtinction = () => {
    cellEcosystem.massExtinction();
    setCellEcosystem(cellEcosystem.clone());
    setAppState(AppState.STOPPED);
    setGeneration(0);
  }

  let stop = () => {
    setAppState(AppState.STOPPED);
    setGeneration(0);
  }

  return (
    <div className="App">
      <div className="gol-field" ref={field}>
        <table style={{ width : numOfCols * 16, height : numOfRows * 16 }}>
          <tbody>
          {cellEcosystem && cellEcosystem.getGrid().map((golRow : Cell[], rowIndex) => {
              return (<tr key={`row_${rowIndex}`}>
                {
                  golRow.map((golCell : Cell) => {
                    return (
                      <td key={`(${golCell.x},${golCell.y})`} onClick={() => { toggleAlive(golCell) }} className={golCell.isAlive ? 'alive' : 'dead'}></td>
                    );
                  })
                }
              </tr>)
            })}
          </tbody>
        </table>
      </div>
      <div className="gol-settings">
        <button onClick={() => { setAppState(AppState.RUNNING) }} disabled={appState === AppState.RUNNING}>Run</button>
        <button onClick={stop} disabled={appState === AppState.STOPPED}>Stop</button>
        <button onClick={randomize}>Randomize</button>
        <button onClick={toggleMassExtinction}>Mass Extinction</button>
        <h6>Ecosystem Dimensions: {numOfRows}x{numOfCols}</h6>
        <h6>Number of generations: {generation}</h6>
        <h6>Population: {cellEcosystem.getPopulation()}</h6>
      </div>
    </div>
  );
}

export default App;
