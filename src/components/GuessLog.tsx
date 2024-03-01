interface GuessLogProps {
  guessLog: string[],
}

function GuessLog({guessLog}: GuessLogProps) {
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