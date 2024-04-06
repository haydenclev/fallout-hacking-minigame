import { useContext, useEffect } from "react";
import "../style/Column.css";
import { GlobalContext } from "./Context";


interface MemoryProps {
  data: string[],
  words: string[],
}

let wordCharIndex = 0;

function Memory({ data, words }: MemoryProps) {
  useEffect(() => addWordSelectionCSS(words), []);
  const { WORD_LEN, CHARACTERS_PER_COLUMN } = useContext(GlobalContext)
  const chunks: string[] = [];
  for (let i = 0; i < data.length; i += CHARACTERS_PER_COLUMN) {
    const chunk = data.slice(i, i + CHARACTERS_PER_COLUMN).join('');
    chunks.push(chunk);
  }
  return (
    <div className="column">
      {chunks.map((line, index) =>
        <p key={index}>{Array.from(line).map((character, index) => 
          <span className={applyClassNames(character, words, WORD_LEN)} key={index}>{character}</span>
          )}</p>
          )}
    </div>
  );
}

function applyClassNames(
  character: string,
  words: string[],
  wordLength: number,
): string {
  let classNames = "character";
  if (isLetter(character)) {
    classNames += ` ${getWord(words, wordLength, wordCharIndex)}`;
    wordCharIndex++;
    if (wordCharIndex >= words.length * wordLength) {
      wordCharIndex = 0;
    }
  }
  return classNames
}

function getWord(words: string[], wordLength: number, wordCharIndex: number): string {
  const index = Math.floor(wordCharIndex / wordLength)
  return words[index]
}

function isLetter(character: string): boolean {
  return /[a-zA-Z]/.test(character);
}

function addWordSelectionCSS(words: string[]) {
  for (const word of words) {
    const members = document.querySelectorAll(`.${word}`);
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

export default Memory;