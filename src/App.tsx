import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      Vite + Vue
      <code>npm create vite@latest my-vue-app -- --template vue</code>
    </div>
    </>
  )
}

export default App
