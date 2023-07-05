import React from 'react'

export default function PlayBoard(props) {
  return (
    <div>
        <h1>Tenzies</h1>
        <p>Roll the dice until all dice are the same number value. Click each die to freeze it at its current value between rolls.</p>
        
        <div className="dice-cont">
            {props.diceElements}
        </div>
        
        <button onClick={props.handleClick} className="roll-btn">
            {props.tenzies ? "NEW GAME" : "ROLL"}
        </button>
    </div>
  )
}

