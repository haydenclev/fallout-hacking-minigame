import React from 'react';
import { KeyboardEvent } from 'react';
import JsonDictionary from './dictionary/7_letter_words.json';
import './App.css';

export function App() {
  return (
    <div className="App">
      <p>
        <code>RobCo Industries Terminal Hacking Minigame</code>
        <br/>
        <br/>
        {runGame()}
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
  let words: Set<string> = makeWords();
  const password = choosePassword(words);
  let guessCount = 0;
  let guesses: Set<string> = new Set();
  return (
    <div>
      { grid(words) }
      <br/>
      { inputField(password) }
    </div>
  )
}

function grid(words: Set<string>) {
  let grid: string[] = makeGrid(words);
  return (
    <code>${grid}</code>
  );
}

function inputField(password: string) {
  return (
    <input onKeyDown={(e) => {
      if(e.key == "Enter") {
        const input = e.target as HTMLInputElement;
        alert(`similarty: ${handleGuess(input.value, password)}`);
        (e.target as HTMLInputElement).value = '';
      }
    }} />
  );
}

function handleGuess(guess: string, password: string) {
  let numberOfMatchingChars = likeness(guess, password);

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

export function makeGrid(words: Set<string>) {
  const lengthOfGrid = TOTAL_ROWS * CHARACTERS_PER_COLUMN;
  const allowedCharacters = `~!@#$%^&*()_-=+|]}[{;:}]/?.>,<\\`
  let grid: string[] = [];

		for(let i = 0; i < lengthOfGrid; i++) {
			const randomInt = Math.floor(Math.random() * allowedCharacters.length);
			grid[i] = allowedCharacters[randomInt];
		}

    return inputWords(grid, words);
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

function choosePassword(words: Set<string>) {
  return Array.from(words.values())[Math.floor(Math.random() * words.size)];
}
