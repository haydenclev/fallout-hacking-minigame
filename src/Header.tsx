import { isArrayLiteralExpression } from "typescript";

interface HeaderProps {
  guessCount: number,
  guessLimit: number,
}

function Header({guessCount, guessLimit}: HeaderProps) {
  const headerMessage = "robco industries (tm) termlink protocol";
  const warningMessage = "!!! warning: lockout imminent !!!";
  const regularMesage = "password required";
  const squareCharacter = "\u25A1";
  let attemptsArray = new Array(guessLimit - guessCount).fill(squareCharacter);

  const displaywarningMessage = guessLimit - guessCount === 1 ? true : false;
  return (
    <div>
      <code>{headerMessage}</code>
      <br/>
      <code>{displaywarningMessage ? warningMessage : regularMesage}</code>
      <br/>
      <code>attempts remaining: {attemptsArray}</code>
    </div>
  )
}

export default Header;