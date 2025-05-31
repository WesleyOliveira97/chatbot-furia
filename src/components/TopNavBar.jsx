import { useState, useEffect, useRef } from 'react'
import './TopNavBar.css'

function TopNavBar({ isLoggedIn, user, onLogin, onLogout, onUserUpdate, theme, onThemeChange }) {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showPreferencesModal, setShowPreferencesModal] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [newUsername, setNewUsername] = useState('')
  const userMenuRef = useRef(null)

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const handleLoginClick = () => {
    if (isLoggedIn) {
      setShowUserMenu(!showUserMenu)
    } else {
      setShowLoginModal(true)
    }
  }

  const handleLogout = () => {
    onLogout()
    setShowUserMenu(false)
  }

  const handleThemeToggle = () => {
    onThemeChange(theme === 'dark' ? 'light' : 'dark')
    setShowUserMenu(false)
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
            <div className="user-menu-container" ref={userMenuRef}>
              <button
                className={`nav-button login-button ${isLoggedIn ? 'logged-in' : ''}`}
                onClick={handleLoginClick}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                </svg>
                {isLoggedIn ? `Olá, ${user?.name}` : 'Login'}
                {isLoggedIn && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                  </svg>
                )}
              </button>

              {/* User Menu Dropdown */}
              {isLoggedIn && showUserMenu && (
                <div className="user-menu-dropdown">
                  <div className="user-menu-item user-info">
                    <span className="user-name">{user?.name}</span>
                    <span className="user-email">{user?.username}</span>
                  </div>
                  <div className="user-menu-divider"></div>
                  <button
                    className="user-menu-item menu-button"
                    onClick={() => {
                      handlePreferencesClick()
                      setShowUserMenu(false)
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                    </svg>
                    Nome do Usuário
                  </button>
                  <button
                    className="user-menu-item menu-button"
                    onClick={handleThemeToggle}
                  >
                    {theme === 'dark' ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18ZM12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.515 4.929L4.929 3.515L7.05 5.636L5.636 7.05L3.515 4.929ZM16.95 18.364L18.364 16.95L20.485 19.071L19.071 20.485L16.95 18.364ZM19.071 3.515L20.485 4.929L18.364 7.05L16.95 5.636L19.071 3.515ZM5.636 16.95L7.05 18.364L4.929 20.485L3.515 19.071L5.636 16.95ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z" fill="currentColor"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.75 4.09L15.22 6.03L16.13 9.09L13.5 7.28L10.87 9.09L11.78 6.03L9.25 4.09L12.44 4L13.5 1L14.56 4L17.75 4.09ZM21.25 11L19.61 12.25L20.2 14.23L18.5 13.06L16.8 14.23L17.39 12.25L15.75 11L17.81 10.95L18.5 9L19.19 10.95L21.25 11ZM18.97 15.95C19.8 15.87 20.69 17.05 20.16 17.8C19.84 18.25 19.5 18.67 19.08 19.07C15.17 23 8.84 23 4.94 19.07C1.03 15.17 1.03 8.83 4.94 4.93C5.34 4.53 5.76 4.17 6.21 3.85C6.96 3.32 8.14 4.21 8.06 5.04C7.79 7.9 8.75 10.87 10.95 13.06C13.14 15.26 16.1 16.22 18.97 15.95Z" fill="currentColor"/>
                      </svg>
                    )}
                    {theme === 'dark' ? 'Tema Claro' : 'Tema Escuro'}
                  </button>
                  <button
                    className="user-menu-item menu-button logout-button"
                    onClick={handleLogout}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.59L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" fill="currentColor"/>
                    </svg>
                    Sair
                  </button>
                </div>
              )}
            </div>
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
              <h2>Nome do Usuário</h2>
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
