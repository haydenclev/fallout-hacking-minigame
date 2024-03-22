import { useContext, useRef, useState } from 'react';
import '../style/App.css';
import { GlobalContext } from './Context';
import Grid, { makeGrid, makeWords } from './Grid';
import GuessLog from './GuessLog';
import Header from './Header';
import UserInput from './UserInput';
import { GameState } from '../utils';
import ResetButton from './ResetButton';


export function App() {
  const globalSettings = useContext(GlobalContext);
  const { NUM_WORDS, TOTAL_ROWS, CHARACTERS_PER_COLUMN, WORD_LEN, GUESS_LIMIT } = globalSettings;

  const [guessLog, setGuessLog] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS);
  const [guessCount, setGuessCount] = useState<number>(0);

  const words = useRef(makeWords(NUM_WORDS)).current;
  const grid: string[] = useRef(makeGrid(words, TOTAL_ROWS, CHARACTERS_PER_COLUMN, NUM_WORDS, WORD_LEN)).current;
  const password = useRef(choosePassword(words)).current;

  return (
    <div id="content">
      {gameState === GameState.IN_PROGRESS &&
        <div>
          <Header guessCount={guessCount} guessLimit={GUESS_LIMIT} />
          <div id="gridAndGuessLogAndInput">
            <Grid grid={grid} />
            <div id="guessLogAndInput" >
              <GuessLog guessLog={guessLog} />
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
            </div>
          </div>
        </div>}
      {gameState === GameState.LOSE && <p>Terminal Locked. Please contact an administrator.</p>}
      {gameState === GameState.WIN && <p>Secrets of untold import.</p>}
      <ResetButton/>
    </div>
  );
}

function choosePassword(words: Set<string>): string {
  return Array.from(words.values())[Math.floor(Math.random() * words.size)];
}

export default App;