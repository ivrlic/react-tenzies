import React from 'react'

export default function Stats(props) {

    const min = props.time.min >= 10 ? props.time.min : "0" + props.time.min
    const sec = props.time.sec >= 10 ? props.time.sec : "0" + props.time.sec

  return (
    <div className="stats">
        <p>TIME: {min + " : " + sec}</p>
        <p>MOVES: {props.moves}</p>
        <p>SCORE: {props.score}</p>
    </div>
  )
}

