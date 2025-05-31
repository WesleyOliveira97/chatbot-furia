import { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import TypingIndicator from './TypingIndicator'
import LoginPrompt from './LoginPrompt'
import './ChatContainer.css'

function ChatContainer({ isLoggedIn }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Eu sou o assistente oficial da FURIA! 🔥 Como posso te ajudar hoje? Posso falar sobre nossos jogadores, partidas, estatísticas e muito mais!",
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageText)
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('jogador') || message.includes('player')) {
      return "A FURIA tem um elenco incrível! Nossa lineup é composta por KSCERATO, yuurih, FalleN, molodoy e YEKINDAR! 🎮"
    }
    
    if (message.includes('partida') || message.includes('jogo') || message.includes('match')) {
      return "Sempre temos partidas emocionantes! A FURIA compete nos principais torneios de CS2 mundiais. Quer saber sobre alguma partida específica? 🏆"
    }
    
    if (message.includes('estatística') || message.includes('stats')) {
      return "A FURIA tem estatísticas impressionantes! Somos uma das melhores equipes do Brasil e competimos no cenário mundial. Que estatística específica você gostaria de saber? 📊"
    }
    
    if (message.includes('olá') || message.includes('oi') || message.includes('hello')) {
      return "Olá, torcedor da FURIA! 🔥 É sempre um prazer falar com nossos fãs! Como posso te ajudar hoje?"
    }
    
    if (message.includes('obrigado') || message.includes('thanks')) {
      return "De nada! É sempre um prazer ajudar os fãs da FURIA! 🔥 Se tiver mais alguma dúvida, estarei aqui!"
    }
    
    return "Interessante! Como assistente da FURIA, posso te ajudar com informações sobre nossos jogadores, partidas, estatísticas e história da equipe. O que você gostaria de saber? 🔥"
  }

  // Show login prompt if user is not logged in
  if (!isLoggedIn) {
    return (
      <div className="chat-container">
        <LoginPrompt />
      </div>
    )
  }

  return (
    <div className="chat-container">
      <div className="chat-content">
        <MessageList messages={messages} />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatContainer
