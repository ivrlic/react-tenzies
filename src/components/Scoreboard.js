import React from 'react'

export default function Scoreboard(props) {

    const scoreboard = props.getScoreboard

  return (
    <div className="scoreboard" id="scoreboard" >
        <h2>SCOREBOARD</h2>
        <div className="scoreboard-heading">
            <p>RANK</p>
            <p>PLAYER</p>
            <p>SCORE</p>
        </div>
        {scoreboard}
        <button className="close-btn" onClick={props.closeScoreboard}>CLOSE</button>
    </div>
  )
}

