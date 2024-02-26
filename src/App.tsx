import React, { useContext, useState } from 'react';
import './App.css';
import { GlobalContext } from './Context';
import Header from './Header';
import Grid, { makeGrid, makeWords } from './Grid';
import GuessLog from './GuessLog';
import UserInput from './UserInput';


export function App() {
  const globalSettings = useContext(GlobalContext);
  const {NUM_WORDS, TOTAL_ROWS, CHARACTERS_PER_COLUMN, WORD_LEN, GUESS_LIMIT} = globalSettings;
  let words = makeWords(NUM_WORDS);
  let grid: string[] = makeGrid(words, TOTAL_ROWS, CHARACTERS_PER_COLUMN, NUM_WORDS, WORD_LEN);
  const password = choosePassword(words);
  let guessCount = 0;
  let [guessLog, setGuessLog] = useState([]);
  return (
    <GlobalContext.Provider value={globalSettings}>
      <p>
        <Header/>
        <Grid grid={grid}/>
        <GuessLog guessLog={guessLog}/>
        <UserInput password={password} guessCount={guessCount} wordLength={WORD_LEN} guessLimit={GUESS_LIMIT} />
      </p>
    </GlobalContext.Provider>
  );
}

function choosePassword(words: Set<string>) {
  return Array.from(words.values())[Math.floor(Math.random() * words.size)];
}

export default App;