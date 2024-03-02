import "../style/Header.css";

interface HeaderProps {
  guessCount: number,
  guessLimit: number,
}

function Header({guessCount, guessLimit}: HeaderProps) {
  const headerMessage = "robco industries (tm) termlink protocol";
  const warningMessage = "!!! warning: lockout imminent !!!";
  const regularMesage = "password required";
  const squareCharacter = "\u25A1"; // convert to 250A0
  let attemptsArray = new Array(guessLimit - guessCount).fill(squareCharacter);

  const displaywarningMessage = guessLimit - guessCount === 1 ? true : false;
  return (
    <div>
      <p>{headerMessage}</p>
      <p>{displaywarningMessage ? warningMessage : regularMesage}</p>
      <p id="attempts">attempts remaining: {attemptsArray}</p>
    </div>
  )
}

export default Header;