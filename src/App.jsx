import { useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

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
    setDice(prevDice => prevDice.map(die => die.isHeld ? die : generateNewDie()))
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
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all die are the same. Click each die to freeze it at its current value between rolls</p>
      <div className='game-board'>
        {dieElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>Roll</button>
    </main>
  )
}