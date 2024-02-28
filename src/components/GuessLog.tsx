interface GuessLogProps {
  guessLog: string[],
}

function GuessLog({guessLog}: GuessLogProps) {
  return (
    <div>
      { guessLog.map((line, index) => {
        return ( 
          <ul key={index}>
            <p> {line} </p>
          </ul>
        )
      }) }
    </div>
  )
}

export default GuessLog;