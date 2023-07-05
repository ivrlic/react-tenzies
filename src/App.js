import React from "react";
import Confetti from "react-confetti"
import Scoreboard from "./components/Scoreboard"
import Stats from "./components/Stats"
import PlayBoard from "./components/PlayBoard"
import useTenziesGame from "./hooks/useTenziesGame";
import Die from "./components/Die"



function App() {

  const {
    dice,
    tenzies,
    width,
    height,
    time,
    moves,
    score,
    holdDie,
    rollDice,
    startStopWatch,
    getScoreboard,
    closeScoreboard} = useTenziesGame()


  // getting all dice from die component
  const diceElements = dice.map(die => {
    return (
        <Die
            value={die.value}
            key={die.id}
            isHeld={die.isHeld}
            handleClick={()=>holdDie(die.id)}/>
    )
    })


  return (
    <div className="container">
        {tenzies && <Confetti width={width} height={height}/>}
        
        <PlayBoard 
          diceElements={diceElements}
          handleClick={()=>(rollDice(), startStopWatch())}
          tenzies={tenzies}/>

        <Stats time={time} moves={moves} score={score}/>

        {tenzies && 
          <Scoreboard
            tenzies={tenzies}
            getScoreboard={getScoreboard()}
            closeScoreboard={()=>closeScoreboard()}/>}

    </div>
  );
}


export default App;

