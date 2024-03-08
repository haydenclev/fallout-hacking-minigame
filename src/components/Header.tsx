import "../style/Header.css";

interface HeaderProps {
  guessCount: number,
  guessLimit: number,
}

function Header({ guessCount, guessLimit }: HeaderProps) {
  const headerMessage = "robco industries (tm) termlink protocol";
  const warningMessage = "!!! warning: lockout imminent !!!";
  const regularMesage = "password required";
  const squareCharacter = "\u25A0";
  let attemptsArray = new Array(guessLimit - guessCount).fill(squareCharacter);

  const displaywarningMessage = guessLimit - guessCount === 1 ? true : false;
  return (
    <div>
      <p>{headerMessage}</p>
      {displaywarningMessage ? <p className="blink">{warningMessage}</p> : <p>{regularMesage}</p>}
      <p id="attempts">attempt(s) remaining: {attemptsArray.join(" ")}</p>
    </div>
  )
}

export default Header;