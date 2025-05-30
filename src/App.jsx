import { useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import Header from './components/Header'

function App() {
  return (
    <div className="app">
      <Header />
      <ChatContainer />
    </div>
  )
}

export default App
