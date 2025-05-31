import './Message.css'

function Message({ message, user }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getUserInitial = () => {
    // First try to get from message.username (for new messages)
    if (message.username) {
      return message.username.charAt(0).toUpperCase()
    }
    // Fallback to user prop (for existing messages)
    if (user?.name) {
      return user.name.charAt(0).toUpperCase()
    }
    if (user?.username) {
      return user.username.charAt(0).toUpperCase()
    }
    // Final fallback
    return 'U'
  }

  return (
    <div className={`message ${message.sender}`}>
      <div className="message-content">
        {message.sender === 'bot' && (
          <div className="bot-avatar">
            <span className="avatar-text">F</span>
          </div>
        )}
        <div className="message-bubble">
          <p className="message-text">{message.text}</p>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
        {message.sender === 'user' && (
          <div className="user-avatar">
            <span className="avatar-text">{getUserInitial()}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Message
