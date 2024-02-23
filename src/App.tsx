import React, { useContext } from 'react';
import './App.css';
import { GlobalContext } from './Context';
import Header from './Header';
import Grid from './Grid';
import GuessLog from './GuessLog';

export function App() {
  const globalSettings = useContext(GlobalContext);
  return (
    <GlobalContext.Provider value={globalSettings}>
      <p>
        <Header/>
        <Grid/>
        <GuessLog/>
      </p>
    </GlobalContext.Provider>
  );
}

export default App;