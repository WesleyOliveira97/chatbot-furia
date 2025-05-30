import { useState } from 'react'
import './MessageInput.css'

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form className="message-input-container" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem para a FURIA..."
          className="message-input"
          rows="1"
          maxLength="500"
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!message.trim()}
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M2 21L23 12L2 3V10L17 12L2 14V21Z" 
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div className="input-footer">
        <span className="char-count">{message.length}/500</span>
        <span className="hint">Pressione Enter para enviar</span>
      </div>
    </form>
  )
}

export default MessageInput
