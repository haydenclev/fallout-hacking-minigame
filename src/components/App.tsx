import { useContext, useRef, useState } from 'react';
import JsonDictionary from '../dictionary/7_letter_words.json';
import '../style/App.css';
import { GameState } from '../utils';
import { GlobalContext, verifySettings } from './Context';
import Grid, { CheatCodes, identifyCheatCodes, makeGrid } from './Grid';
import GuessLog from './GuessLog';
import Header from './Header';
import ResetButton from './ResetButton';
import UserInput from './UserInput';


export function App() {
  const { NUM_WORDS, TOTAL_ROWS, CHARACTERS_PER_ROW, WORD_LEN, GUESS_LIMIT } = useContext(GlobalContext);
  verifySettings(CHARACTERS_PER_ROW, NUM_WORDS, TOTAL_ROWS, WORD_LEN);

  const [guessLog, setGuessLog] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.IN_PROGRESS);
  const [guessCount, setGuessCount] = useState<number>(0);
  
  const words = useRef(makeWords(NUM_WORDS)).current;
  const password = useRef(choosePassword(words)).current;
  const grid: string[] = useRef(makeGrid(words, TOTAL_ROWS, CHARACTERS_PER_ROW, NUM_WORDS, WORD_LEN)).current;
  const cheatCodes: CheatCodes = useRef(identifyCheatCodes(grid, CHARACTERS_PER_ROW)).current;

  return (
    <div id="content">
      {gameState === GameState.IN_PROGRESS &&
        <div>
          <Header guessCount={guessCount} guessLimit={GUESS_LIMIT} />
          <div id="gridAndGuessLogAndInput">
            <Grid words={words} grid={grid} cheatCodes={cheatCodes} />
            <div id="guessLogAndInput" >
              <GuessLog guessLog={guessLog} setGuessLog={setGuessLog} />
              <UserInput
                guessCount={guessCount}
                guessLog={guessLog}
                password={password}
                setGameState={setGameState}
                setGuessCount={setGuessCount}
                setGuessLog={setGuessLog}
                words={words}
                cheatCodes={[...cheatCodes.left, ...cheatCodes.right]}
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

function choosePassword(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)];
}

export function makeWords(numberOfWords: number) {
  const words: Set<string> = new Set();
  const dictionary: string[] = JsonDictionary.map((x) => { return x.word});
  while(words.size < numberOfWords) {
    const randomInt = Math.floor(Math.random() * dictionary.length);
    const word = dictionary[randomInt];
    if(!words.has(word)) {
      words.add(word);
    }
  }
  return Array.from(words);
}

export default App;