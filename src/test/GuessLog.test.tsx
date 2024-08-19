import { render } from '@testing-library/react';
import GuessLog from '../components/GuessLog';
import { globalSettings } from '../components/Context';

let guessLog = []
const setGuessLog = jest.fn();
const { TOTAL_ROWS } = globalSettings;

it('limits size of guess log to number of columns - 1', () => {
  guessLog = new Array<string>(TOTAL_ROWS + 10);
  render(
    <GuessLog guessLog={guessLog} setGuessLog={setGuessLog}/>
  );
  expect(setGuessLog).toHaveBeenCalledWith(new Array<string>(TOTAL_ROWS - 1));
  expect(guessLog.length).toEqual(TOTAL_ROWS - 1);
});