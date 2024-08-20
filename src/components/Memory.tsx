import { useContext, useEffect } from "react";
import "../style/Grid.css";
import { GlobalContext } from "./Context";


interface MemoryProps {
  data: string[],
  words: string[],
  cheatCodes: string[],
}

function Memory({ data, words, cheatCodes }: MemoryProps) {
  useEffect(() => addInputHighlighting(words), []);
  useEffect(() => addInputHighlighting(cheatCodes), []);
  const { CHARACTERS_PER_ROW } = useContext(GlobalContext)
  let wordCharIndex = 0;
  let cheatCodeIndex = 0;
  const chunksAndClasses: [string, Map<number, string[]>][] = [];
  for (let i = 0; i < data.length; i += CHARACTERS_PER_ROW) {
    const chunk = data.slice(i, i + CHARACTERS_PER_ROW).join('');
    const classNames = new Map<number, string[]>();
    wordCharIndex = makeWordClasses(chunk, words, wordCharIndex, classNames);
    cheatCodeIndex = makeCheatCodeClasses(chunk, cheatCodes, cheatCodeIndex, classNames);
    chunksAndClasses.push([chunk, classNames]);
  }
  return (
    <div className="column">
      {chunksAndClasses.map(([line, classes], index) =>
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

function makeCheatCodeClasses(chunk: string, cheatCodes: string[], cheatCodeIndex: number, classNames: Map<number, string[]>): number {
  let cheatCode = cheatCodes[cheatCodeIndex];
  while (chunk.includes(cheatCode)) {
    const startIndex = chunk.indexOf(cheatCode);
    for (let i = startIndex; i < startIndex + cheatCode.length; i++) {
      if (!classNames.has(i)) {
        classNames.set(i, []);
      }
      classNames.get(i)?.push(cheatCode);
    }
    cheatCode = cheatCodes[++cheatCodeIndex];
  }
  return cheatCodeIndex;
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

function addInputHighlighting(inputs: string[]) {
  for (const input of inputs) {
    const members = document.querySelectorAll(`.${CSS.escape(input)}`);
    for (const member of members) {
      member.addEventListener('mouseenter', () => {
          members.forEach(m => m.classList.add('word-hovered'));
      });
      member.addEventListener('mouseleave', () => {
          members.forEach(m => m.classList.remove('word-hovered'));
      });
      if (!isLetter(member.textContent)) {
        break;
      }
    }
  } 
}

function getWord(words: string[], wordCharIndex: number): string {
  const wordLength = words[0].length;
  const index = Math.floor(wordCharIndex / wordLength)
  return words[index]
}

export function isLetter(character: string | null): boolean {
  return character !== null && /[a-zA-Z]/.test(character);
}

export default Memory;