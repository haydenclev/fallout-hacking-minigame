import { useContext } from "react";
import { GlobalContext } from "./Context";

interface GuessLogProps {
  guessLog: string[],
  setGuessLog: (log: string[]) => void,
}

function GuessLog({ guessLog, setGuessLog }: GuessLogProps) {
  const { TOTAL_ROWS } = useContext(GlobalContext);
  while (guessLog.length >= TOTAL_ROWS) {
    guessLog.shift();
  }
  setGuessLog(guessLog);
  return (
    <div>
      { guessLog.map((line, index) => {
        return ( 
            <p key={index}> {">" + line} </p>
        )
      }) }
    </div>
  )
}

export default GuessLog;