import './TypingIndicator.css'

function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="typing-content">
        <div className="bot-avatar">
          <span className="avatar-text">F</span>
        </div>
        <div className="typing-bubble">
          <div className="typing-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator
