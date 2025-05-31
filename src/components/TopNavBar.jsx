import { useState } from 'react'
import './TopNavBar.css'

function TopNavBar({ isLoggedIn, user, onLogin, onLogout, onUserUpdate }) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showPreferencesModal, setShowPreferencesModal] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [newUsername, setNewUsername] = useState('')

  const handleLoginClick = () => {
    if (isLoggedIn) {
      onLogout()
    } else {
      setShowLoginModal(true)
    }
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (loginForm.username.trim() && loginForm.password.trim()) {
      // Simple mock authentication - in real app, this would call an API
      onLogin({
        username: loginForm.username,
        name: loginForm.username
      })
      setShowLoginModal(false)
      setLoginForm({ username: '', password: '' })
    }
  }

  const handleChatbotClick = () => {
    // Scroll to chat or focus on chat input
    const chatContainer = document.querySelector('.chat-container')
    if (chatContainer) {
      chatContainer.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleStoreClick = () => {
    // In a real app, this would navigate to the store
    window.open('https://furia.gg/loja', '_blank')
  }

  const handlePreferencesClick = () => {
    if (isLoggedIn) {
      setNewUsername(user?.name || '')
      setShowPreferencesModal(true)
    }
  }

  const handleUsernameUpdate = (e) => {
    e.preventDefault()
    if (newUsername.trim()) {
      const updatedUser = {
        ...user,
        name: newUsername.trim(),
        username: user?.username || newUsername.trim()
      }
      if (onUserUpdate) {
        onUserUpdate(updatedUser)
      } else {
        onLogin(updatedUser)
      }
      setShowPreferencesModal(false)
    }
  }

  return (
    <>
      <nav className="top-nav-bar">
        <div className="nav-content">
          {/* Left side - All menus */}
          <div className="nav-left">
            <button
              className="nav-button chatbot-button"
              onClick={handleChatbotClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 14.99 3.01 16.28L2 22L7.72 20.99C9.01 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.74 20 9.54 19.75 8.46 19.3L6 20L6.7 17.54C6.25 16.46 6 15.26 6 14C6 8.48 8.48 6 12 6C15.52 6 18 8.48 18 12C18 15.52 15.52 18 12 18Z" fill="currentColor"/>
              </svg>
              Chatbot
            </button>

            <button
              className="nav-button store-button"
              onClick={handleStoreClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C5.9 18 5 18.9 5 20S5.9 22 7 22 9 21.1 9 20 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.58 17.3 11.97L20.88 5H5.21L4.27 3H1ZM17 18C15.9 18 15 18.9 15 20S15.9 22 17 22 19 21.1 19 20 18.1 18 17 18Z" fill="currentColor"/>
              </svg>
              Furia Store
            </button>

            <button
              className={`nav-button preferences-button ${!isLoggedIn ? 'disabled' : ''}`}
              onClick={handlePreferencesClick}
              disabled={!isLoggedIn}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5ZM19.43 12.98C19.47 12.66 19.5 12.34 19.5 12C19.5 11.66 19.47 11.34 19.43 11.02L21.54 9.37C21.73 9.22 21.78 8.95 21.66 8.73L19.66 5.27C19.54 5.05 19.27 4.97 19.05 5.05L16.56 6.05C16.04 5.65 15.48 5.32 14.87 5.07L14.49 2.42C14.46 2.18 14.25 2 14 2H10C9.75 2 9.54 2.18 9.51 2.42L9.13 5.07C8.52 5.32 7.96 5.66 7.44 6.05L4.95 5.05C4.72 4.96 4.46 5.05 4.34 5.27L2.34 8.73C2.21 8.95 2.27 9.22 2.46 9.37L4.57 11.02C4.53 11.34 4.5 11.67 4.5 12C4.5 12.33 4.53 12.66 4.57 12.98L2.46 14.63C2.27 14.78 2.21 15.05 2.34 15.27L4.34 18.73C4.46 18.95 4.73 19.03 4.95 18.95L7.44 17.95C7.96 18.35 8.52 18.68 9.13 18.93L9.51 21.58C9.54 21.82 9.75 22 10 22H14C14.25 22 14.46 21.82 14.49 21.58L14.87 18.93C15.48 18.68 16.04 18.34 16.56 17.95L19.05 18.95C19.28 19.04 19.54 18.95 19.66 18.73L21.66 15.27C21.78 15.05 21.73 14.78 21.54 14.63L19.43 12.98Z" fill="currentColor"/>
              </svg>
              Preferências
            </button>
          </div>

          {/* Center - FURIA Logo */}
          <div className="nav-center">
            <div className="furia-logo">
              <img
                src="/images/furia-logo.png"
                alt="FURIA Logo"
                className="logo-image"
              />
            </div>
          </div>

          {/* Right side - Login */}
          <div className="nav-right">
            <button
              className={`nav-button login-button ${isLoggedIn ? 'logged-in' : ''}`}
              onClick={handleLoginClick}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
              </svg>
              {isLoggedIn ? `Olá, ${user?.name}` : 'Login'}
            </button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>Login na FURIA</h2>
              <button 
                className="close-button"
                onClick={() => setShowLoginModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="username">Usuário:</label>
                <input
                  type="text"
                  id="username"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  placeholder="Digite seu usuário"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha:</label>
                <input
                  type="password"
                  id="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  placeholder="Digite sua senha"
                  required
                />
              </div>
              <button type="submit" className="login-submit-button">
                Entrar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <div className="login-modal-overlay" onClick={() => setShowPreferencesModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <div className="login-modal-header">
              <h2>Preferências</h2>
              <button
                className="close-button"
                onClick={() => setShowPreferencesModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleUsernameUpdate} className="login-form">
              <div className="form-group">
                <label htmlFor="newUsername">Nome de exibição:</label>
                <input
                  type="text"
                  id="newUsername"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Digite seu nome de exibição"
                  required
                />
                <small className="form-help">
                  Este nome será exibido no chat e no menu de login
                </small>
              </div>
              <button type="submit" className="login-submit-button">
                Salvar Alterações
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default TopNavBar
