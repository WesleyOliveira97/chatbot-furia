import { useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import TopNavBar from './components/TopNavBar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setIsLoggedIn(true)
    setUser(userData)
  }

  const handleUserUpdate = (updatedUserData) => {
    setUser(updatedUserData)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <div className="app">
      <TopNavBar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
      />
      <ChatContainer isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default App
