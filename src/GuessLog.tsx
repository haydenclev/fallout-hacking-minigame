interface GuessLogProps {
  guessLog: string[],
}

function GuessLog({guessLog}: GuessLogProps) {
  return (
    <div>
      { guessLog.map((line, index) => {
        return ( 
          <ul key={index}>
            <code> {line} </code>
          </ul>
        )
      }) }
    </div>
  )
}

export default GuessLog;