import { useState } from 'react'
import './App.scss'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div onClick={() => {setCount(count +  1)}}>hello {count}</div>
    </>
  )
}

export default App
