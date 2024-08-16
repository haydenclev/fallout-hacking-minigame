import { useContext, useEffect } from "react";
import { GameState } from "../utils";
import { GlobalContext } from "./Context";


interface UserInputProps {
  guessCount: number,
  guessLog: string[],
  password: string,
  setGameState: (state: GameState) => void,
  setGuessCount: (count: number) => void,
  setGuessLog: (log: string[]) => void,
  words: string[],
  cheatCodes: string[],
}

export default function UserInput({
  guessCount,
  guessLog,
  password,
  setGameState,
  setGuessCount,
  setGuessLog,
  words,
  cheatCodes,
}: UserInputProps) {
  const { GUESS_LIMIT, WORD_LEN } = useContext(GlobalContext)
  useEffect(() => {
    const callbacks = addGuessInputHandling(guessCount, GUESS_LIMIT, guessLog, password, setGameState, setGuessCount, setGuessLog, WORD_LEN, words);
    return () => {
      removeMouseInputHandling(callbacks);
    }
  },
    [guessCount, guessLog]);
  useEffect(() => {
    const callbacks = addCheatCodeInputHandling(cheatCodes, guessLog, password, setGuessCount, setGuessLog, words);
    return () => {
      removeMouseInputHandling(callbacks);
    }
  },
    [guessCount, guessLog]);
  return (
    <input
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const input = e.target as HTMLInputElement;
          handleGuess(
            input.value.toLowerCase(),
            guessCount,
            GUESS_LIMIT,
            guessLog,
            password,
            setGameState,
            setGuessCount,
            setGuessLog,
            WORD_LEN,
            words
          );
          (e.target as HTMLInputElement).value = '';
        }
      }} />
  )
}

function handleGuess(
  guess: string,
  guessCount: number,
  guessLimit: number,
  guessLog: string[],
  password: string,
  setGameState: (state: GameState) => void,
  setGuessCount: (count: number) => void,
  setGuessLog: (log: string[]) => void,
  wordLength: number,
  words: string[],
) {
  if (!words.includes(guess)) {
    alert("Invalid guess!");
    return;
  }
  const numberOfMatchingChars = likeness(guess, password);
  const newGuessCount = guessCount + 1;
  setGuessCount(newGuessCount);
  if (numberOfMatchingChars === wordLength) {
    setGuessLog([...guessLog, guess, `Password Accepted.`]);
    alert(" You win! ");
    setGameState(GameState.WIN);
  }
  else if (newGuessCount >= guessLimit) {
    setGuessLog([...guessLog, guess, ...["Entry denied.", `Likeness = ${numberOfMatchingChars}`]]);
    alert(" You lose!");
    setGameState(GameState.LOSE);
  }
  else {
    setGuessLog([...guessLog, guess, ...["Entry denied.", `Likeness = ${numberOfMatchingChars}`]]);
  }
  return;
}

function handleCheatCode(
  cheatCode: string,
  guessLog: string[],
  password: string,
  setGuessCount: (count: number) => void,
  setGuessLog: (log: string[]) => void,
  words: string[],
) {
  if (Math.random() >= 0.5) {
    setGuessLog([...guessLog, cheatCode, "Allowance replenished."]);
    setGuessCount(0);
  }
  else {
    setGuessLog([...guessLog, cheatCode, "Dud removed."]);
    const dud = selectDud(password, words);
    const dudMembers = document.querySelectorAll(`.${dud}`);
    dudMembers.forEach(member => {
      member.textContent = '.';
      member.classList.remove(dud);
      member.replaceWith(member.cloneNode(true));
    })
  }
  const cheatCodeMembers = document.querySelectorAll(`.${CSS.escape(cheatCode)}`);
  cheatCodeMembers.forEach(member => {
    member.classList.remove('word-hovered', cheatCode);
    member.replaceWith(member.cloneNode(true));
  });
}


function addCheatCodeInputHandling(
  cheatCodes: string[],
  guessLog: string[],
  password: string,
  setGuessCount: (x: number) => void,
  setGuessLog: (x: string[]) => void,
  words: string[],
) {
  const callbacks = new Map<string, {(): void}>();
  for (const cheatCode of cheatCodes) {
    const members = document.querySelectorAll(`.${CSS.escape(cheatCode)}`);
    const callback = () => handleCheatCode(cheatCode, guessLog, password, setGuessCount, setGuessLog, words);
    callbacks.set(cheatCode, callback);
    members.forEach(member => {
      member.addEventListener('click', callback);
    })
  }
  return callbacks;
}

function addGuessInputHandling(
  guessCount: number,
  guessLimit: number,
  guessLog: string[],
  password: string,
  setGameState: (state: GameState) => void,
  setGuessCount: (count: number) => void,
  setGuessLog: (log: string[]) => void,
  wordLength: number,
  words: string[],
): Map<string, {(): void}> {
  const callbacks = new Map<string, {(): void}>();
  for (const word of words) {
    const members = document.querySelectorAll(`.${word}`);
    const callback = () => handleGuess(
      word,
      guessCount,
      guessLimit,
      guessLog,
      password,
      setGameState,
      setGuessCount,
      setGuessLog,
      wordLength,
      words);
      callbacks.set(word, callback);
      members.forEach(member => {
        member.addEventListener('click', callback);
      });
    }
    return callbacks
  }
  
  function removeMouseInputHandling(callbacks: Map<string, {(): void}>) {
    callbacks.forEach((callback, word) => {
      const members = document.querySelectorAll(`.${CSS.escape(word)}`);
      members.forEach(member => {
        member.removeEventListener('click', callback);
      });
    });
  } 
  
  function likeness(guess: string, password: string) {
    let similarity = 0;
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === password[i]) {
        similarity++;
      }
    }
    return similarity;
  }

  function selectDud(password: string, words: string[]) {
    let dud = password;
    while (dud == password) {
      dud = words[Math.floor(Math.random() * words.length)];
    }
    return dud;
  }