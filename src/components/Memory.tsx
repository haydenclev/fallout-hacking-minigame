import { useContext, useEffect } from "react";
import "../style/Grid.css";
import { GlobalContext } from "./Context";


interface MemoryProps {
  data: string[],
  words: string[],
}


function Memory({ data, words }: MemoryProps) {
  let wordCharIndex = 0;
  useEffect(() => addWordSelectionCSS(words), []);
  const { CHARACTERS_PER_ROW: CHARACTERS_PER_COLUMN } = useContext(GlobalContext)
  const chunks: [string, Map<number, string[]>][] = [];
  const cheatCodes = new Set<string>();
  for (let i = 0; i < data.length; i += CHARACTERS_PER_COLUMN) {
    const chunk = data.slice(i, i + CHARACTERS_PER_COLUMN).join('');
    const classNames = new Map<number, string[]>();
    wordCharIndex = makeWordClasses(chunk, words, wordCharIndex, classNames);
    makeCheatCodeClasses(chunk, cheatCodes, classNames);
    chunks.push([chunk, classNames]);
  }
  useEffect(() => addWordSelectionCSS([...cheatCodes.values()]), []);
  return (
    <div className="column">
      {chunks.map(([line, classes], index) =>
        <p key={index}>{Array.from(line).map((character, index) => 
          <span 
            data-testid={isLetter(character) ? classes.get(index)?.at(0) : null}
            className={applyClassNames(classes, index)}
            key={index}>{character}
          </span>
          )}</p>
          )}
    </div>
  );
}

function makeCheatCodeClasses(chunk: string, cheatCodes: Set<string>, classNames: Map<number, string[]>) {
  let bracketMap: { [key: string]: number[] } = {};
    for (let i = 0; i < chunk.length; i++) {
      if (isOpenBracket(chunk[i])) {
        if (!bracketMap[chunk[i]]) {
          bracketMap[chunk[i]] = [];
        }
        bracketMap[chunk[i]].push(i);
      }
      else if (isLetter(chunk[i])) {
        bracketMap = {};
      }
      else if (isCompleteCheatCode(bracketMap, chunk[i])) {
        const startIndex = bracketMap[matchingBracket(chunk[i])][0];
        const cheatCode = chunk.slice(startIndex, i+1)
        cheatCodes.add(cheatCode);
        for (let j = startIndex; j <= i; j++) {
          if (!classNames.has(j)) {
            classNames.set(j, []);
          }
          classNames.get(j)?.push(cheatCode);
        }
      }
    }
}

function makeWordClasses(chunk: string, words: string[], wordCharIndex: number, classNames: Map<number, string[]>): number {
  for (let i = 0; i < chunk.length; i++) {
    if (isLetter(chunk[i])) {
      if (!classNames.has(i)) {
        classNames.set(i, []);
      }
      classNames.get(i)?.push(getWord(words, wordCharIndex));
      wordCharIndex++;
    }
  }
  return wordCharIndex;
}


function applyClassNames(
  classes: Map<number, string[]>,
  index: number,
): string {
  let classNames = "character";
  if (classes.has(index)) {
    classNames += ` ${classes.get(index)?.join(' ')}`
  }
  return classNames;
}

function addWordSelectionCSS(words: string[]) {
  for (const word of words) {
    const members = document.querySelectorAll(`.${CSS.escape(word)}`);
    members.forEach(member => {
        member.addEventListener('mouseenter', () => {
            members.forEach(m => m.classList.add('word-hovered'));
        });
        member.addEventListener('mouseleave', () => {
            members.forEach(m => m.classList.remove('word-hovered'));
        });
    });
  }
}

function getWord(words: string[], wordCharIndex: number): string {
  const wordLength = words[0].length;
  const index = Math.floor(wordCharIndex / wordLength)
  return words[index]
}

function isLetter(character: string): boolean {
  return /[a-zA-Z]/.test(character);
}

function isOpenBracket(character: string): boolean {
  const openBracketChars = '[{<(';
  return openBracketChars.includes(character);
}

function isCloseBracket(character: string): boolean {
  const closeBracketChars = ']}>)';
  return closeBracketChars.includes(character);
}

function isCompleteCheatCode(openBrackets: { [key: string]: number[] }, character: string): boolean {
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

export default Memory;