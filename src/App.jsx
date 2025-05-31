import { useState } from 'react'
import './App.css'
import ChatContainer from './components/ChatContainer'
import TopNavBar from './components/TopNavBar'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('dark')

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

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
  }

  return (
    <div className={`app ${theme}`}>
      <TopNavBar
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onUserUpdate={handleUserUpdate}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
      <ChatContainer isLoggedIn={isLoggedIn} user={user} />
    </div>
  )
}

export default App
