interface GuessLogProps {
  guessLog: string[],
}

function GuessLog({guessLog}: GuessLogProps) {
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