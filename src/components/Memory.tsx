import { useContext, useEffect } from "react";
import "../style/Grid.css";
import { GlobalContext } from "./Context";


interface MemoryProps {
  data: string[],
  words: string[],
}

let wordCharIndex = 0;

function Memory({ data, words }: MemoryProps) {
  useEffect(() => addWordSelectionCSS(words), []);
  const { WORD_LEN, CHARACTERS_PER_ROW: CHARACTERS_PER_COLUMN } = useContext(GlobalContext)
  const chunks: [string, Map<number, string>][] = [];
  const cheatCodes = new Set<string>();
  for (let i = 0; i < data.length; i += CHARACTERS_PER_COLUMN) {
    const chunk = data.slice(i, i + CHARACTERS_PER_COLUMN).join('');
    const cheatCodeMap = getCheatCodes(chunk, cheatCodes);
    chunks.push([chunk, cheatCodeMap]);
  }
  useEffect(() => addWordSelectionCSS([...cheatCodes.values()]), []);
  return (
    <div className="column">
      {chunks.map(([line, cheats], index) =>
        <p key={index}>{Array.from(line).map((character, index) => 
          <span 
            data-testid={isLetter(character) ? getWord(words, WORD_LEN, wordCharIndex) : null}
            className={applyClassNames(character, words, WORD_LEN, cheats, index)}
            key={index}>{character}
          </span>
          )}</p>
          )}
    </div>
  );
}

function getCheatCodes(chunk: string, cheatCodes: Set<string>): Map<number, string> {
  const cheatCodeMap = new Map<number, string>();
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
          cheatCodeMap.set(j, cheatCode);
        }
      }
    }
    return cheatCodeMap;
}

function applyClassNames(
  character: string,
  words: string[],
  wordLength: number,
  cheats: Map<number, string>,
  index: number,
): string {
  let classNames = "character";
  if (isLetter(character)) {
    classNames += ` ${getWord(words, wordLength, wordCharIndex)}`;
    wordCharIndex++;
    if (wordCharIndex >= words.length * wordLength) {
      wordCharIndex = 0;
    }
  }
  if (cheats.has(index)) {
    classNames += ` ${cheats.get(index)}`
  }
  return classNames
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

function getWord(words: string[], wordLength: number, wordCharIndex: number): string {
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