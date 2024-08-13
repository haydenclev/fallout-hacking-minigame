import { render } from '@testing-library/react';
import Grid from '../components/Grid';
import { makeWords } from '../components/App'
import { globalSettings } from '../components/Context';

const words = makeWords(globalSettings.NUM_WORDS);

it('puts all the words into the grid', () => {
  const gridComponent = render(
      <Grid words={words}/>
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