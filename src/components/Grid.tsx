import Column from "./Column";
import JsonDictionary from '../dictionary/7_letter_words.json';
import "../style/Grid.css"
import { GlobalContext } from "./Context";
import { useContext } from "react";


interface GridProps {
  grid: string[]
}


function Grid({grid}: GridProps) {
  const { CHARACTERS_PER_COLUMN } = useContext(GlobalContext);
  return (
    <div id="grid">
      <Column charactersPerColumn={CHARACTERS_PER_COLUMN} data={makeAddresses()} isAddresses={true} />
      <Column charactersPerColumn={CHARACTERS_PER_COLUMN} data={grid.slice(0, grid.length / 2)}/>
      <Column charactersPerColumn={CHARACTERS_PER_COLUMN} data={makeAddresses()} isAddresses={true} />
      <Column charactersPerColumn={CHARACTERS_PER_COLUMN} data={grid.slice(grid.length / 2, grid.length)}/>
    </div>
  );
}

export function makeGrid(
  words: Set<string>, 
  totalRows: number, 
  charactersPerColumn: number, 
  numberOfWords: number, 
  wordLength: number
) {
  const lengthOfGrid = totalRows * charactersPerColumn * 2;
  const allowedCharacters = "~!@#$%^&*()_-=+|]}[{;:}]/?.>,<\\"
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
  let frequency = Math.floor(grid.length / numberOfWords);
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

function makeAddresses(): string[] {
  let addresses: string[] = []
  const maxHexValue = 0x10000;
  const minHexValue = 0x1000;
  const hexValuerange = maxHexValue - minHexValue;
  for(let i = 0; i < 17; i++) {
    addresses.push(`0x${(Math.floor((Math.random() * hexValuerange)) + minHexValue).toString(16)}`);
  }
  return addresses;
}

export default Grid;