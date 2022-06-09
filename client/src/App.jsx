import React from 'react'
import TheChat from './components/TheChat'
import TheLogo from './components/TheLogo'

function App() {
  return (
    <div className='container flex flex-col items-center w-full max-w-4xl min-h-screen p-4 mx-auto space-y-2'>
      <TheLogo />
      <TheChat />
    </div>
  )
}

export default App
