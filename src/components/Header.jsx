import './Header.css'

function Header() {
  return (
    <header className="chat-header">
      <div className="header-content">
        <div className="furia-logo">
          <span className="logo-text">FURIA</span>
        </div>
        <div className="header-info">
          <h1 className="chat-title">Furia CS Team Assistant</h1>
          <p className="chat-subtitle">Your ultimate Counter-Strike companion</p>
        </div>
        <div className="status-indicator">
          <div className="status-dot online"></div>
          <span className="status-text">Online</span>
        </div>
      </div>
    </header>
  )
}

export default Header
