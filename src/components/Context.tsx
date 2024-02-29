import { createContext } from "react";

const globalSettings = {
  CHARACTERS_PER_COLUMN: 12,
  GUESS_LIMIT: 4,
  NUM_WORDS: 10,
  TOTAL_ROWS: 17,
  WORD_LEN: 7,
}

export const GlobalContext = createContext(globalSettings);