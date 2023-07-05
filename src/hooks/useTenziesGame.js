import React, { useState, useEffect , useRef} from "react";
import {useWindowSize} from "@uidotdev/usehooks"


export default function useTenziesGame() {

    // getting scores from local storage if there is any or setting it to empty array
    let scoreArray = localStorage.getItem("scoreArray") ? 
                    JSON.parse(localStorage.getItem("scoreArray")) :
                    []

    const [time, setTime] = useState({min:0, sec:0})
    const [timeStatus, setTimeStatus] = useState(false)
    const [moves, setMoves] = useState(-1)
    const [dice, setDice] = useState(getFirstNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [score, setScore] = useState(0)
    const {width, height} = useWindowSize() 
    
    const idRef = useRef(null)

    // starts timing function using setInterval - at 60th sec minute goes up by 1
    function startStopWatch(){
        if (timeStatus===false){
            idRef.current = setInterval(() => {
                setTime(prevTime => {
                    if(prevTime.sec < 59){
                        return {
                            ...prevTime,
                            sec: prevTime.sec + 1}
                    } else if (prevTime.sec === 59) {
                        return {
                            min: prevTime.min + 1,
                            sec: 0}
                    }
                })  
            setTimeStatus(true)
        }, 1000)
        } else {return}
    }


    function getNewDie (){
        const newDie = {
            value: Math.floor (Math.random() * 6 + 1),
            isHeld: false,
            id: crypto.randomUUID()
        }
        return newDie
    }

    // getting new dice without number
    function getFirstNewDice (){
        let allDieArray =[]
        for (let i=0; i<10; i++){
                const newDie = {
                    value:"",
                    id: crypto.randomUUID()
                }
                allDieArray.push(newDie)
        }
        return allDieArray
    }

    // getting new dice with numbers
    function getAllNewDice (){
        let allDieArray =[]
        for (let i=0; i<10; i++){
            const newDie = getNewDie()
            allDieArray.push(newDie)
        }
        return allDieArray
    }

    function rollDice (){
        // ROLL BUTTON
        if (!tenzies) {
            setMoves(prevMoves => prevMoves + 0,5)
            setDice(prevDice => prevDice.map(die=>{
                return !die.isHeld ? getNewDie() : die
            }))
        // NEW GAME BUTTON
        } else {
            setDice(getAllNewDice())
            setTenzies(false)
            setTime({min:0, sec:0})
            setMoves(0)
        }
    }

    // hold die/mark it with color
    function holdDie(id) {
        setDice(prevDice => prevDice.map(die =>{
                return die.id === id ?
                    {...die, isHeld: !die.isHeld} :
                    die
        }))
    }
    

    // checking win status: if all numbers are equal and marked/held on every die state change
    // adding moves on every die state change 
    useEffect(()=>{
        const isAllHeld = dice.every(die => die.isHeld)
        const refValue = dice[0].value
        const isSameValue = dice.every(die => die.value === refValue && typeof die.value === "number")
        setMoves(prevMoves => prevMoves + 1)
        // if game won
        if(isAllHeld && isSameValue) {
            setTenzies(true)
            setTimeStatus(false)
            clearInterval(idRef.current)
        }
    }, [dice])


    // calculating score and uploading it to local storage scoreboard at the end of the game
    useEffect(() => {
        const score = moves * 2 + time.min * 60 + time.sec * 1
        setScore(score)      
        if(tenzies){
            scoreArray.push({score: score, id: scoreArray.length + 1, current: false})
            localStorage.setItem("scoreArray", JSON.stringify(scoreArray))
        }
    }, [moves, time])


    // geting max 10 best scores and sorting them out to the scoreboard
    function getScoreboard (){
        // changing property of last item in array (current game) in order to higlight 
        // score if it gets inbetween top 10 best on the scoreboard
        const currentScoreArray = scoreArray.map(item => {
            if (item.id === scoreArray.length) {
                return {...item, current:true}                   
            } else {
                return {...item, current: false}
            }
        })

        currentScoreArray.sort((a, b) => {
            return a.score - b.score
        })
        
        // limiting to only top ten results
        const tenResults = currentScoreArray.slice(0, 10)
        // ranking number
        let n = 0

        const scoreBoard = tenResults.map (result => {
            n = n + 1
            return (
                <div key={result.id}
                    className="scoreboard-result"
                    // highlighting current score
                    style={{backgroundColor: result.current ? "yellow" : ""}}>
                    <span>{n}.</span>
                    {/* name can't be chosen so this is the way how it is written:
                    ordinal number of current game + player */}
                    <span>{result.id + ". player"}</span>
                    <span>{result.score}</span>
                </div>)
        })
    return scoreBoard
    }


    // closing scoreboard
    function closeScoreboard (){
        if(document.getElementById("scoreboard")){
        document.getElementById("scoreboard").style.display = "none"
        }
    }


  return {
        dice, tenzies, width, height, rollDice, startStopWatch,
        time, moves, score, getScoreboard, closeScoreboard, holdDie
        }
}

