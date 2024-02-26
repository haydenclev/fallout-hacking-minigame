interface UserInputProps {
  password: string,
  guessCount: number,
  wordLength: number,
  guessLimit: number,
}

export default function UserInput({password, guessCount, wordLength, guessLimit}: UserInputProps) {
  return (
    <input 
      // min={7}
      // max={7}
      onKeyDown={(e) => {
        if(e.key == "Enter") {
          const input = e.target as HTMLInputElement;
          alert(`similarty: ${handleGuess(input.value, password, guessCount, wordLength, guessLimit)}`);
          (e.target as HTMLInputElement).value = '';
      }
    }} />
  )
}

function handleGuess(guess: string, password: string, guessCount: number, wordLength: number, guessLimit: number) {
  if(guess.length != password.length) {
    alert("Invalid guess!");
    return 0;
  }
  let numberOfMatchingChars = likeness(guess, password);
  guessCount++;
  if(numberOfMatchingChars == wordLength) {
    alert(" You win! ");
  }
  else if(guessCount > guessLimit) {
    alert(" You lose!");
  }
  return numberOfMatchingChars;
}

function likeness(guess: string, password: string) {
  let similarity = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] == password[i]) {
      similarity++;
    }
  }
  return similarity;
}