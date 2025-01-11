import { useState, useRef, useEffect } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const { width, height } = useWindowSize()
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)
  const newGameFocus = useRef(null);

  useEffect(() => {
    if (gameWon && newGameFocus.current) {
      newGameFocus.current.focus()
    }
  }, [gameWon])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => generateNewDie())
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice())
    } else {
      setDice(prevDice => prevDice.map(die => die.isHeld ? die : generateNewDie()))
    }
  }

  function hold(id) {
    setDice(prevDice => prevDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  const dieElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      hold={hold}
      id={die.id}
    />
  ))

  return (
    <main>
      {gameWon && <Confetti width={width} height={height}/>}
      <div aria-live="polite" className='sr-only'>
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again</p>}
      </div>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all die are the same. Click each die to freeze it at its current value between rolls</p>
      <div className='game-board'>
        {dieElements}
      </div>
      <button
        className="roll-dice"
        onClick={rollDice}
        ref={newGameFocus}>
        {gameWon ? 'New Game' : 'Roll'}
      </button>
    </main>
  )
}