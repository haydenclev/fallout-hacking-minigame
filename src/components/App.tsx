import { useContext, useRef, useState } from 'react';
import '../style/App.css';
import { GlobalContext } from './Context';
import Grid, { makeGrid, makeWords } from './Grid';
import GuessLog from './GuessLog';
import Header from './Header';
import UserInput from './UserInput';
import { GameState } from '../utils';


export function App() {
  const globalSettings = useContext(GlobalContext);
  const {NUM_WORDS, TOTAL_ROWS, CHARACTERS_PER_COLUMN, WORD_LEN, GUESS_LIMIT} = globalSettings;

  let [guessLog, setGuessLog] = useState<string[]>([]);
  let [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS);
  let [guessCount, setGuessCount] = useState<number>(0);

  const words = useRef(makeWords(NUM_WORDS)).current;
  const grid: string[] = useRef(makeGrid(words, TOTAL_ROWS, CHARACTERS_PER_COLUMN, NUM_WORDS, WORD_LEN)).current;
  const password = useRef(choosePassword(words)).current;

  return (
    <GlobalContext.Provider value={globalSettings}>
      {gameState === GameState.IN_PROGRESS && <div>
        <Header guessCount={guessCount} guessLimit={GUESS_LIMIT}/>
        <Grid grid={grid}/>
        <GuessLog guessLog={guessLog}/>
        <UserInput 
          guessCount={guessCount}
          guessLimit={GUESS_LIMIT}
          guessLog={guessLog}
          password={password}
          setGameState={setGameState}
          setGuessCount={setGuessCount}
          setGuessLog={setGuessLog} 
          wordLength={WORD_LEN}
          words={words}
          />
      </div>}
      {gameState === GameState.LOSE && <div>Terminal Locked. Please contact an administrator.</div>}
      {gameState === GameState.WIN && <div>Secrets of untold import.</div>}
    </GlobalContext.Provider>
  );
}

function choosePassword(words: Set<string>): string {
  return Array.from(words.values())[Math.floor(Math.random() * words.size)];
}

export default App;