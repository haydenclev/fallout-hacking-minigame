import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../components/App';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// describe('make grid', () => {
//   it('has no numbers or letters', () => {
//     expect(makeGrid().join('')).not.toMatch(/[A-Za-z0-9]/);
//   });
// });

// describe('make words', () => {
//   it('has only letters', () => {
//     const stringOfWords: string = Array.from(makeWords().keys()).join('');;
//     expect(stringOfWords).toMatch(/[a-z]/);
//   });
// });

export {} // makes file module to remove compile error


