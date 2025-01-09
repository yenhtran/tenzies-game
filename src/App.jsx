import { useState } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => ({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }))
  }

  const dieElements = dice.map(die => <Die key={die.id} value={die.value} />)

  function handleClick() {
    setDice(generateAllNewDice())
  }

  return (
    <main>
      <div className='game-board'>
        {dieElements}
      </div>
      <button className="roll-dice" onClick={handleClick}>Roll</button>
    </main>
  )
}