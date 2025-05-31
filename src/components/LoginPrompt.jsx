import './LoginPrompt.css'

function LoginPrompt() {
  const handleLoginClick = () => {
    // Scroll to top to show the login button
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Trigger a visual highlight on the login button
    setTimeout(() => {
      const loginButton = document.querySelector('.login-button')
      if (loginButton) {
        loginButton.style.animation = 'pulse 1s ease-in-out 3'
      }
    }, 500)
  }

  return (
    <div className="login-prompt">
      <div className="login-prompt-content">
        <div className="furia-icon">
          <span className="icon-text">🔥</span>
        </div>
        
        <h2 className="prompt-title">Bem-vindo ao Chat da FURIA!</h2>
        
        <p className="prompt-description">
          Para acessar o assistente oficial da FURIA e conversar sobre nossos jogadores, 
          partidas e estatísticas, você precisa fazer login.
        </p>
        
        <div className="prompt-features">
          <div className="feature-item">
            <span className="feature-icon">🎮</span>
            <span className="feature-text">Informações sobre jogadores</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏆</span>
            <span className="feature-text">Resultados de partidas</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span className="feature-text">Estatísticas da equipe</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔥</span>
            <span className="feature-text">História da FURIA</span>
          </div>
        </div>
        
        <button 
          className="prompt-login-button"
          onClick={handleLoginClick}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
          </svg>
          Fazer Login para Continuar
        </button>
        
        <p className="prompt-note">
          Clique no botão "Login" no canto superior direito da página
        </p>
      </div>
    </div>
  )
}

export default LoginPrompt
