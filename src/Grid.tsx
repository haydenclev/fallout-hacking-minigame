import { useContext } from "react";
import { GlobalContext } from "./Context";
import JsonDictionary from './dictionary/7_letter_words.json';


function Grid() {
  const {WORD_LEN, GUESS_LIMIT, TOTAL_ROWS, CHARACTERS_PER_COLUMN, NUM_WORDS} = useContext(GlobalContext);
  let words = makeWords(NUM_WORDS);
  let grid: string[] = makeGrid(words, TOTAL_ROWS, CHARACTERS_PER_COLUMN, NUM_WORDS, WORD_LEN);
  const password = choosePassword(words);
  let guessCount = 0;
  return (
    <div>
      <code>${grid}</code>
      {inputField(password, guessCount, WORD_LEN, GUESS_LIMIT)}
    </div>
  );
}

function inputField(password: string, guessCount: number, wordLength: number, guessLimit: number) {
  return (
    <input 
      // min={7}
      // max={7}
      onKeyDown={(e) => {
        if(e.key == "Enter") {
          const input = e.target as HTMLInputElement;
          alert(`similarty: ${handleGuess(input.value, password, guessCount, wordLength, guessLimit)}`);
          (e.target as HTMLInputElement).value = '';
      }
    }} />
  );
}

function handleGuess(guess: string, password: string, guessCount: number, wordLength: number, guessLimit: number) {
  if(guess.length != password.length) {
    alert("Invalid guess!");
    return 0;
  }
  let numberOfMatchingChars = likeness(guess, password);
  guessCount++;
  if(numberOfMatchingChars == wordLength) {
    alert(" You win! ");
  }
  else if(guessCount > guessLimit) {
    alert(" You lose!");
  }
  return numberOfMatchingChars;
}

function likeness(guess: string, password: string) {
  let similarity = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] == password[i]) {
      similarity++;
    }
  }
  return similarity;
}

export function makeGrid(
  words: Set<string>, 
  totalRows: number, 
  charactersPerColumn: number, 
  numberOfWords: number, 
  wordLength: number
) {
  const lengthOfGrid = totalRows * charactersPerColumn;
  const allowedCharacters = `~!@#$%^&*()_-=+|]}[{;:}]/?.>,<\\`
  let grid: string[] = [];

		for(let i = 0; i < lengthOfGrid; i++) {
			const randomInt = Math.floor(Math.random() * allowedCharacters.length);
			grid[i] = allowedCharacters[randomInt];
		}

    return inputWords(grid, words, numberOfWords, wordLength);
}

export function makeWords(numberOfWords: number) {
  let words: Set<string> = new Set();
  const dictionary: string[] = JsonDictionary.map((x) => { return x.word});
  while(words.size < numberOfWords) {
    let randomInt = Math.floor(Math.random() * dictionary.length);
    let word = dictionary[randomInt];
    if(!words.has(word)) {
      words.add(word);
    }
  }
  return words;
}

export function inputWords(grid: string[], words: Set<string>, numberOfWords: number, wordLength: number): string[] {
  let frequency = grid.length / numberOfWords;
  let wordCount = 0;
  for(const word of words.values()) {
    let variation = Math.floor(Math.random() * (frequency - wordLength));
    let placement = (wordCount * frequency) + variation;
    for(let i = 0; i < wordLength; i++) {
      grid[placement + i] = word[i];
    }
    wordCount++;
  }
  return grid;
}

function choosePassword(words: Set<string>) {
  return Array.from(words.values())[Math.floor(Math.random() * words.size)];
}

export default Grid;