import { render } from '@testing-library/react';
import Grid, { identifyCheatCodes, makeGrid } from '../components/Grid';
import { makeWords } from '../components/App'
import { globalSettings } from '../components/Context';

const { NUM_WORDS, TOTAL_ROWS, CHARACTERS_PER_ROW, WORD_LEN } = globalSettings;
const words = makeWords(NUM_WORDS);
const grid = makeGrid(words, TOTAL_ROWS, CHARACTERS_PER_ROW, NUM_WORDS, WORD_LEN);

it('puts all the words into the grid', () => {
  const gridComponent = render(
      <Grid words={words} grid={grid} cheatCodes={{left:[], right:[]}}/>
  )
  for(const word of words) {
    const letters = gridComponent.getAllByTestId(word)
    let text = ''
    for(const letter of letters) {
      text += letter.textContent;
    }
    expect(text).toBe(word);
  }
});

it('removes duplicate cheat codes', () => {
  const line = new Array<string>(CHARACTERS_PER_ROW).fill('.')
  line.splice(0, 2, '(', ')');
  grid.splice(0, CHARACTERS_PER_ROW, ...line);
  grid.splice(CHARACTERS_PER_ROW, 2 * CHARACTERS_PER_ROW, ...line);
  identifyCheatCodes(grid, CHARACTERS_PER_ROW);
  expect(grid.slice(CHARACTERS_PER_ROW, CHARACTERS_PER_ROW + 2)).toEqual(['(','.']);
});