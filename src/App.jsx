import Die from './Die';

export default function App() {
  const dieElements = Array.from({ length: 10}).map(() => {
    return <Die key={1} value={Math.floor(Math.random() * 6) + 1}/>
  })

  return (
    <main>
      <div className='game-board'>
        {dieElements}
      </div>
    </main>
  )
}