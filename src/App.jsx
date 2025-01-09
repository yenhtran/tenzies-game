import { useState } from 'react';
import Die from './Die';

export default function App() {
  const [numbers, setNumbers] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10)
        .fill(0)
        .map(() => Math.ceil(Math.random() * 6))
  }

  const dieElements = numbers.map(num => {
    return <Die key={num} value={num} />
  })

  return (
    <main>
      <div className='game-board'>
        {dieElements}
      </div>
    </main>
  )
}