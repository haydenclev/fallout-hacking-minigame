import { useContext, useRef, useState } from 'react';
import './App.css';
import { GlobalContext } from './Context';
import Grid, { makeGrid, makeWords } from './Grid';
import GuessLog from './GuessLog';
import Header from './Header';
import UserInput from './UserInput';


export function App() {
  const globalSettings = useContext(GlobalContext);
  const {NUM_WORDS, TOTAL_ROWS, CHARACTERS_PER_COLUMN, WORD_LEN, GUESS_LIMIT} = globalSettings;
  
  let guessCount = 0;
  let [guessLog, setGuessLog] = useState<string[]>([]);

  const words = useRef(makeWords(NUM_WORDS)).current;
  const grid: string[] = useRef(makeGrid(words, TOTAL_ROWS, CHARACTERS_PER_COLUMN, NUM_WORDS, WORD_LEN)).current;
  const password = useRef(choosePassword(words)).current;

  return (
    <GlobalContext.Provider value={globalSettings}>
      <p>
        <Header/>
        <Grid grid={grid}/>
        <GuessLog guessLog={guessLog}/>
        <UserInput 
          setGuessLog={setGuessLog} 
          password={password}
          guessCount={guessCount}
          wordLength={WORD_LEN}
          guessLimit={GUESS_LIMIT}
          guessLog={guessLog}/>
      </p>
    </GlobalContext.Provider>
  );
}

function choosePassword(words: Set<string>) {
  return Array.from(words.values())[Math.floor(Math.random() * words.size)];
}

export default App;