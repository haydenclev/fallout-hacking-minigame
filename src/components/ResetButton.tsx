import "../style/ResetButton.css"

function ResetButton() {
  return (
    <button id="resetButton" onClick={() => { window.location.reload() }}/>
  )
}

export default ResetButton;