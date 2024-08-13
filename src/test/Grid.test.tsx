import { render } from '@testing-library/react';
import Grid, { makeGrid, makeWords } from '../components/Grid';
import { globalSettings } from '../components/Context';

const words = makeWords(globalSettings.NUM_WORDS);
const grid = makeGrid(
  words, globalSettings.TOTAL_ROWS, 
  globalSettings.CHARACTERS_PER_ROW, 
  globalSettings.NUM_WORDS, 
  globalSettings.WORD_LEN
);

it('puts all the words into the grid', () => {
  const gridComponent = render(
      <Grid grid={grid} words={words}/>
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