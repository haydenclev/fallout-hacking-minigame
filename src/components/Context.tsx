import { createContext } from "react";

const globalSettings = {
  CHARACTERS_PER_ROW: 12,
  GUESS_LIMIT: 4,
  NUM_WORDS: 12,
  TOTAL_ROWS: 17,
  WORD_LEN: 7,
}

export function verifySettings(charactersPerRow: number, numWords: number, totalRows: number, wordLength: number) {
  const gridLength = charactersPerRow * totalRows;
  const frequency = Math.floor(gridLength / numWords);
  if(frequency < wordLength) {
    throw new RangeError("Program Settings Error: Not enough room to place words in grid. Adjust settings and retry.")
  }
  if(gridLength % 2 !== 0) {
    throw new RangeError("Program Settings Error: Grid length must be divisible into two even columns. Adjust settings and retry.")
  }
  if(gridLength % frequency !== 0) {
    throw new RangeError("Program Settings Error: Word frequency must evenly divide grid length. Adjust settings and retry.")
  }
}

export const GlobalContext = createContext(globalSettings);