import React from 'react';
import fs from 'fs';
import './App.css';

function App() {
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
  grid = inputWords(grid, words);
  return grid;
}

function makeGrid() {
  const lengthOfGrid = TOTAL_ROWS * CHARACTERS_PER_COLUMN;
  const allowedCharacters = `~!@#$%^&*()_-=+|]}[{;:}]/?.>,<\\`
  let grid: string[] = [];

		for(let i = 0; i < lengthOfGrid; i++) {
			const randomInt = Math.floor(Math.random() * allowedCharacters.length);
			grid[i] = allowedCharacters[randomInt];
		}
		return grid;
}

function makeWords() {
  let words: Set<string> = new Set();
  const dictionaryName = `dictionary/dict${WORD_LEN}.txt`
  const dictionary: string[] = fs.readFileSync(dictionaryName, "utf8").split(`\n`);
  while(words.size < NUM_WORDS) {
    let randomInt = Math.floor(Math.random() * dictionary.length);
    let word = dictionary[randomInt];
    if(!words.has(word)) {
      words.add(word);
    }
  }
  return words;
}

function inputWords(grid: string[], words: Set<string>): string[] {
  let frequency = grid.length / words.size;
  for(const [index, word] of grid.entries()) {
    let variation = Math.floor(Math.random() * (frequency - WORD_LEN));
    let placement = (index * frequency) + variation;
    for(let i = 0; i < WORD_LEN; i++) {
      grid[placement + i] = word[i];
    }
  }
  return grid;
}

export default App;
