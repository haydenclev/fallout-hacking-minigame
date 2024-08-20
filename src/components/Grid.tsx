import { useRef } from "react";
import "../style/Grid.css";
import Addresses from "./Addresses";
import Memory, { isLetter } from "./Memory";


interface GridProps {
  words: string[],
  grid: string[],
  cheatCodes: CheatCodes,
}

export interface CheatCodes {
  left: string[],
  right: string[],
}

function Grid({ words, grid, cheatCodes }: GridProps) {
  const addressesLeft = useRef(makeAddresses()).current;
  const addressesRight = useRef(makeAddresses()).current;
  const halfGrid = Math.floor(grid.length / 2);
  const halfWords = Math.floor(words.length / 2);
  return (
    <div id="grid">
      <Addresses addresses={addressesLeft} />
      <Memory data={grid.slice(0, halfGrid)} words={words.slice(0, halfWords)} cheatCodes={cheatCodes.left} />
      <Addresses addresses={addressesRight} />
      <Memory data={grid.slice(halfGrid, grid.length)} words={words.slice(halfWords, words.length)} cheatCodes={cheatCodes.right} />
    </div>
  );
}

export function identifyCheatCodes(grid: string[], charactersPerRow: number): CheatCodes {
  const cheatCodes: CheatCodes = {left: [], right: []}
  for (let i = 0; i < grid.length; i += charactersPerRow) {
    let chunk = grid.slice(i, i + charactersPerRow).join('');
    let bracketMap: { [key: string]: number } = {};
    const cheatCodeMap = new Map<string, string>();
    for (let j = 0; j < chunk.length; j++) {
      const character = chunk[j];
        if (isOpenBracket(character)) {
          if (bracketMap[character] == undefined) {
            bracketMap[character] = j;
          }
        }
        else if (isCompleteCheatCode(bracketMap, character)) {
          const startIndex = bracketMap[matchingBracket(character)];
          const cheatCode = chunk.slice(startIndex, j+1);
          if (isRepeatCheatCode(cheatCode, [...cheatCodes.left, ...cheatCodes.right])
          || isOverlappingCheatCode(chunk, cheatCodeMap, bracketMap[matchingBracket(character)])) {
            grid[i+j] = '.';
            chunk = grid.slice(i, i + charactersPerRow).join('')
          }
          else { cheatCodeMap.set(character, cheatCode); }
        }
        else if (isLetter(character)) {
          bracketMap = {};
        }
      }
      if (i <= grid.length / 2) {
        cheatCodes.left.push(...cheatCodeMap.values());
      }
      else {
        cheatCodes.right.push(...cheatCodeMap.values());
      }
    }
    return cheatCodes;
}

export function makeGrid(
  words: string[], 
  totalRows: number, 
  charactersPerRow: number, 
  numberOfWords: number, 
  wordLength: number
) {
  const lengthOfGrid = totalRows * charactersPerRow * 2;
  const allowedCharacters = "~!@#$%^&*()_-=+|'\"[{;:}]/?.>,<\\"
  const grid: string[] = [];

		for(let i = 0; i < lengthOfGrid; i++) {
			const randomInt = Math.floor(Math.random() * allowedCharacters.length);
			grid[i] = allowedCharacters[randomInt];
		}

    return inputWords(grid, words, numberOfWords, wordLength);
}

function inputWords(grid: string[], words: string[], numberOfWords: number, wordLength: number): string[] {
  const frequency = Math.floor(grid.length / numberOfWords);
  let wordCount = 0;
  for(const word of words) {
    const variation = Math.floor(Math.random() * (frequency - wordLength));
    const placement = (wordCount * frequency) + variation;
    for(let i = 0; i < wordLength; i++) {
      grid[placement + i] = word[i];
    }
    wordCount++;
  }
  return grid;
}

function makeAddresses(): string[] {
  const addresses: string[] = []
  const maxHexValue = 0x10000;
  const minHexValue = 0x1000;
  const hexValuerange = maxHexValue - minHexValue;
  for(let i = 0; i < 17; i++) {
    addresses.push(`0x${(Math.floor((Math.random() * hexValuerange)) + minHexValue).toString(16)}`);
  }
  return addresses;
}

function isRepeatCheatCode(cheatCode: string, cheatCodes: string[]): boolean {
  return cheatCodes.includes(cheatCode);
}

function isOverlappingCheatCode(chunk: string, cheatCodeMap: Map<string, string>, startIndex: number): boolean {
  for (const cheatCode of cheatCodeMap.values()) {
    const sameBracketType = chunk[startIndex] == cheatCode[0];
    const endIndex = chunk.indexOf(cheatCode) + cheatCode.length;
    if (!sameBracketType && endIndex > startIndex) {
      return true;
    }
  }
  return false;
}

function isOpenBracket(character: string): boolean {
  const openBracketChars = '[{<(';
  return openBracketChars.includes(character);
}

function isCloseBracket(character: string): boolean {
  const closeBracketChars = ']}>)';
  return closeBracketChars.includes(character);
}

function isCompleteCheatCode(openBrackets: { [key: string]: number }, character: string): boolean {
  return isCloseBracket(character) && matchingBracket(character) in openBrackets;
}

function matchingBracket(character: string): string {
  switch (character) {
    case ']':
      return '['
    case '}':
      return '{'
    case '>':
      return '<'
    case ')':
      return '('
  }
  return ''
}

export default Grid;