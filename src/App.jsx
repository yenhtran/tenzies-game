import { useState } from 'react';
import Die from './Die';

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => Math.ceil(Math.random() * 6))
  }

  const dieElements = dice.map((num, index) => <Die key={index} value={num}/>)

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