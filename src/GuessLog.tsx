function GuessLog() {
  let guessLog: string[] = [];
  guessLog.push("> previous guesses go here");
  guessLog.push("> more guesses go here");
  return (
    <div>
      { guessLog.map((x) => {
        return ( 
          <ul>
            <code> {x} </code>
          </ul>
        )
      }) }
    </div>
  )
}

export default GuessLog;