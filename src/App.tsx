import React from 'react';
import JsonDictionary from './dictionary/7_letter_words.json';
import './App.css';

export function App() {
  return (
    <div className="App">
      <p>
        <code>RobCo Industries Terminal Hacking Minigame</code>
        <br/>
        <code>{runGame()}</code>
      </p>
    </div>
  );
}

const CHARACTERS_PER_COLUMN = 20;
const GUESS_LIMIT = 4;
const NUM_WORDS = 10;
const TOTAL_ROWS = 40;
const WORD_LEN = 7;

function runGame() {
  let grid: string[] = makeGrid();
  let words: Set<string> = makeWords();
  return inputWords(grid, words);
}

export function makeGrid() {
  const lengthOfGrid = TOTAL_ROWS * CHARACTERS_PER_COLUMN;
  const allowedCharacters = `~!@#$%^&*()_-=+|]}[{;:}]/?.>,<\\`
  let grid: string[] = [];

		for(let i = 0; i < lengthOfGrid; i++) {
			const randomInt = Math.floor(Math.random() * allowedCharacters.length);
			grid[i] = allowedCharacters[randomInt];
		}
		return grid;
}

export function makeWords() {
  let words: Set<string> = new Set();
  const dictionary: string[] = JsonDictionary.map((x) => { return x.word});
  while(words.size < NUM_WORDS) {
    let randomInt = Math.floor(Math.random() * dictionary.length);
    let word = dictionary[randomInt];
    if(!words.has(word)) {
      words.add(word);
    }
  }
  return words;
}

export function inputWords(grid: string[], words: Set<string>): string[] {
  let frequency = grid.length / NUM_WORDS;
  let wordCount = 0;
  for(const word of words.values()) {
    console.log("inside loop");
    let variation = Math.floor(Math.random() * (frequency - WORD_LEN));
    let placement = (wordCount * frequency) + variation;
    for(let i = 0; i < WORD_LEN; i++) {
      grid[placement + i] = word[i];
    }
    wordCount++;
  }
  return grid;
}

export default App;