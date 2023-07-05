import React from 'react'

export default function Die(props) {

  const style = {
      backgroundColor: props.isHeld ? "#b5ffa1" : "white",
  }

  return (
    <div
      className="die-cont"
      style={style}
      onClick={props.handleClick}>
        
          <p className="die-num">{props.value}</p>
    
    </div>
  )
}
