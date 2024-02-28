import Column from "./Column";
import JsonDictionary from '../dictionary/7_letter_words.json';


interface GridProps {
  grid: string[]
}


function Grid({grid}: GridProps) {
  return (
    <div>
      <Column data={grid.slice(0, grid.length / 2)}/>
      <Column data={makeAddresses()} />
      <Column data={grid.slice(grid.length / 2, grid.length)}/>
      <Column data={makeAddresses()} />
    </div>
  );
}

export function makeGrid(
  words: Set<string>, 
  totalRows: number, 
  charactersPerColumn: number, 
  numberOfWords: number, 
  wordLength: number
) {
  const lengthOfGrid = totalRows * charactersPerColumn;
  const allowedCharacters = `~!@#$%^&*()_-=+|]}[{;:}]/?.>,<\\`
  let grid: string[] = [];

		for(let i = 0; i < lengthOfGrid; i++) {
			const randomInt = Math.floor(Math.random() * allowedCharacters.length);
			grid[i] = allowedCharacters[randomInt];
		}

    return inputWords(grid, words, numberOfWords, wordLength);
}

export function makeWords(numberOfWords: number) {
  let words: Set<string> = new Set();
  const dictionary: string[] = JsonDictionary.map((x) => { return x.word});
  while(words.size < numberOfWords) {
    let randomInt = Math.floor(Math.random() * dictionary.length);
    let word = dictionary[randomInt];
    if(!words.has(word)) {
      words.add(word);
    }
  }
  return words;
}

export function inputWords(grid: string[], words: Set<string>, numberOfWords: number, wordLength: number): string[] {
  let frequency = grid.length / numberOfWords;
  let wordCount = 0;
  for(const word of words.values()) {
    let variation = Math.floor(Math.random() * (frequency - wordLength));
    let placement = (wordCount * frequency) + variation;
    for(let i = 0; i < wordLength; i++) {
      grid[placement + i] = word[i];
    }
    wordCount++;
  }
  return grid;
}

function makeAddresses(): string[] {
  let addresses: string[] = []
  for(let i = 0; i < 17; i++) {
    addresses.push(`0x${Math.floor((Math.random() * 0x10000)).toString(16)}`);
  }
  return addresses;
}

export default Grid;