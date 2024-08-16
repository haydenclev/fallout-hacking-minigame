import { render } from '@testing-library/react';
import Grid, { makeGrid } from '../components/Grid';
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