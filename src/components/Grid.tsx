import { useContext, useRef } from "react";
import "../style/Grid.css";
import Addresses from "./Addresses";
import Memory from "./Memory";
import { GlobalContext } from "./Context";


interface GridProps {
  words: string[]
}

function Grid({ words }: GridProps) {
  const globalSettings = useContext(GlobalContext);
  const { NUM_WORDS, TOTAL_ROWS, CHARACTERS_PER_ROW, WORD_LEN } = globalSettings;
  const grid: string[] = useRef(makeGrid(words, TOTAL_ROWS, CHARACTERS_PER_ROW, NUM_WORDS, WORD_LEN)).current;
  const addressesLeft = useRef(makeAddresses()).current;
  const addressesRight = useRef(makeAddresses()).current;
  const halfGrid = Math.floor(grid.length / 2);
  const halfWords = Math.floor(words.length / 2);
  return (
    <div id="grid">
      <Addresses addresses={addressesLeft} />
      <Memory data={grid.slice(0, halfGrid)} words={words.slice(0, halfWords)} />
      <Addresses addresses={addressesRight} />
      <Memory data={grid.slice(halfGrid, grid.length)} words={words.slice(halfWords, words.length)} />
    </div>
  );
}

export function makeGrid(
  words: string[], 
  totalRows: number, 
  charactersPerRow: number, 
  numberOfWords: number, 
  wordLength: number
) {
  const lengthOfGrid = totalRows * charactersPerRow * 2;
  const allowedCharacters = "~!@#$%^&*()_-=+|'\"[{;:}]/?.>,<\\"
  const grid: string[] = [];

		for(let i = 0; i < lengthOfGrid; i++) {
			const randomInt = Math.floor(Math.random() * allowedCharacters.length);
			grid[i] = allowedCharacters[randomInt];
		}

    return inputWords(grid, words, numberOfWords, wordLength);
}

function inputWords(grid: string[], words: string[], numberOfWords: number, wordLength: number): string[] {
  const frequency = Math.floor(grid.length / numberOfWords);
  let wordCount = 0;
  for(const word of words) {
    const variation = Math.floor(Math.random() * (frequency - wordLength));
    const placement = (wordCount * frequency) + variation;
    for(let i = 0; i < wordLength; i++) {
      grid[placement + i] = word[i];
    }
    wordCount++;
  }
  return grid;
}

function makeAddresses(): string[] {
  const addresses: string[] = []
  const maxHexValue = 0x10000;
  const minHexValue = 0x1000;
  const hexValuerange = maxHexValue - minHexValue;
  for(let i = 0; i < 17; i++) {
    addresses.push(`0x${(Math.floor((Math.random() * hexValuerange)) + minHexValue).toString(16)}`);
  }
  return addresses;
}

export default Grid;