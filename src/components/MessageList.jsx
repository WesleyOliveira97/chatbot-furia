import Message from './Message'
import './MessageList.css'

function MessageList({ messages, user }) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          user={user}
        />
      ))}
    </div>
  )
}

export default MessageList
