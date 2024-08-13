import { render } from '@testing-library/react';
import { App } from '../components/App';
import { GlobalContext } from '../components/Context';
import { globalSettings } from '../components/Context';


it('renders without crashing', () => {
  expect(() => render(<App />)).not.toThrow();
});

describe('global context', () => {
  beforeEach(() => {
    console.error = jest.fn();
  })

  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('fails when words cant fit in grid', () => {
    expect(() => {
      render(
        <GlobalContext.Provider value={{...globalSettings, NUM_WORDS: 1000}} >
          <App />
        </GlobalContext.Provider>
      );
    }).toThrow('Not enough room to place words in grid');
  })

  it('fails when grid length not even number', () => {
    expect(() => {
      render(
        <GlobalContext.Provider value={{...globalSettings, CHARACTERS_PER_ROW: 13}} >
          <App />
        </GlobalContext.Provider>
      );
    }).toThrow('Grid length must be divisible into two even columns');
  })

  it('fails when word could be split across the two columns', () => {
    expect(() => {
      render(
        <GlobalContext.Provider value={{...globalSettings, NUM_WORDS: 13}} >
          <App />
        </GlobalContext.Provider>
      );
    }).toThrow('Word frequency must evenly divide grid length');
  })
})