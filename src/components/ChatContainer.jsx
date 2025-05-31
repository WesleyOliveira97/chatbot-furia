import { useState, useEffect, useRef } from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import TypingIndicator from './TypingIndicator'
import LoginPrompt from './LoginPrompt'
import './ChatContainer.css'

function ChatContainer({ isLoggedIn, user }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bem-vindos ao chat dos fãs da FURIA! 🔥 Conversem à vontade! Eu apareço quando vocês mencionam nossos players ou me chamam com !Furiabot. Vamos FURIA! 💪",
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
      timestamp: new Date(),
      username: user?.name || user?.username || 'User'
    }

    setMessages(prev => [...prev, userMessage])

    // Check if bot should respond
    const botResponse = generateBotResponse(messageText)

    if (botResponse) {
      setIsTyping(true)

      // Simulate bot response
      setTimeout(() => {
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
  }

  // Keyword-based response system with random phrases
  const keywordResponses = {
    'fallen': [
      "FalleN é uma lenda viva do CS! 🎯 Nosso IGL tem uma das mentes mais táticas do cenário mundial!",
      "Gabriel 'FalleN' Toledo é o coração tático da FURIA! 🧠 Sua experiência e liderança são incomparáveis!",
      "FalleN é um dos maiores nomes da história do Counter-Strike brasileiro! 🇧🇷 Que honra tê-lo na FURIA!",
      "O sniper mais icônico do Brasil! 🔫 FalleN continua mostrando sua classe na FURIA!",
      "FalleN é pura inspiração! ✨ Sua dedicação e paixão pelo jogo são contagiantes!"
    ],
    'kscerato': [
      "KSCERATO é uma máquina de frags! 🔥 Nosso rifler é simplesmente imparável!",
      "Kaike 'KSCERATO' Cerato é puro talento brasileiro! 🇧🇷 Que jogador incrível!",
      "KSCERATO tem uma das miras mais precisas do mundo! 🎯 É sempre um show assistir ele jogar!",
      "Nosso KSCERATO é consistência pura! 📈 Sempre entregando performances de alto nível!",
      "KSCERATO representa o futuro do CS brasileiro! ⭐ Que orgulho ter ele na FURIA!"
    ],
    'yuurih': [
      "yuurih é pura habilidade! 🎮 Nosso entry fragger é simplesmente fenomenal!",
      "Yuri 'yuurih' Santos tem reflexos de outro mundo! ⚡ Que jogador espetacular!",
      "yuurih sempre abre os rounds para a FURIA! 🚪 Sua agressividade é perfeita!",
      "Nosso yuurih é velocidade e precisão! 🏃‍♂️💨 Impossível não se impressionar!",
      "yuurih representa a nova geração do CS brasileiro! 🌟 Futuro brilhante pela frente!"
    ],
    'molodoy': [
      "molodoy trouxe uma energia incrível para a FURIA! ⚡ Que adição fantástica ao time!",
      "Dmitriy 'molodoy' Molodoy é pura classe! 🎯 Sua experiência internacional é valiosa!",
      "molodoy se adaptou perfeitamente à FURIA! 🤝 Química perfeita com o time!",
      "Nosso molodoy é consistência e inteligência! 🧠 Sempre nas jogadas certas!",
      "molodoy prova que a FURIA é verdadeiramente internacional! 🌍 Que jogador!"
    ],
    'yekindar': [
      "YEKINDAR é pura energia! ⚡ Sua entrada na FURIA foi revolucionária!",
      "Mareks 'YEKINDAR' Gaļinskis é um dos melhores entry fraggers do mundo! 🔥",
      "YEKINDAR trouxe uma nova dimensão para a FURIA! 🚀 Que jogador espetacular!",
      "Nosso YEKINDAR é agressividade controlada! 💪 Sempre abrindo espaço para o time!",
      "YEKINDAR representa a ambição global da FURIA! 🌟 Que contratação incrível!"
    ],
    'major': [
      "Os Majors são o sonho de todo jogador de CS! 🏆 A FURIA sempre busca a glória nos maiores torneios!",
      "Major é onde as lendas nascem! ⭐ A FURIA está sempre lutando pelo título mais prestigioso!",
      "Cada Major é uma nova oportunidade! 🎯 A FURIA nunca para de sonhar com a conquista!",
      "Os Majors são a Copa do Mundo do Counter-Strike! 🌍 A FURIA representa o Brasil com orgulho!",
      "Major Championship é o objetivo máximo! 👑 A FURIA trabalha duro para chegar lá!"
    ],
    'brasil': [
      "O Brasil é a terra do Counter-Strike! 🇧🇷 A FURIA carrega nossa bandeira com orgulho!",
      "Representamos o melhor do CS brasileiro! 🔥 FURIA é sinônimo de paixão nacional!",
      "O Brasil tem os melhores torcedores do mundo! 📢 A energia da torcida nos impulsiona!",
      "CS brasileiro é pura emoção! ❤️ A FURIA mantém viva essa tradição!",
      "Somos o orgulho do Brasil no cenário internacional! 🌟 FURIA representa nossa garra!"
    ],
    'tático': [
      "As táticas da FURIA são de outro nível! 🧠 Cada jogada é pensada nos mínimos detalhes!",
      "Nossa preparação tática é impecável! 📋 Estudamos cada adversário profundamente!",
      "A FURIA tem algumas das melhores estratégias do mundo! 🎯 Sempre inovando no jogo!",
      "Táticas inteligentes fazem a diferença! ⚡ A FURIA sempre surpreende os adversários!",
      "Nosso jogo tático é uma obra de arte! 🎨 Cada round é uma masterclass!"
    ]
  }

  const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()

    // Check if user is directly addressing the bot with !Furiabot command
    const isBotCommand = message.includes('!furiabot')

    // Check for player keywords
    let keywordFound = false
    for (const [keyword, responses] of Object.entries(keywordResponses)) {
      if (message.includes(keyword)) {
        keywordFound = true
        return getRandomResponse(responses)
      }
    }

    // Only respond to direct bot commands if no keywords were found
    if (isBotCommand && !keywordFound) {
      // Remove the !furiabot command from the message to process the rest
      const cleanMessage = message.replace('!furiabot', '').trim()

      // General topic responses for direct bot commands
      if (cleanMessage.includes('jogador') || cleanMessage.includes('player')) {
        return "A FURIA tem um elenco incrível! Nossa lineup é composta por KSCERATO, yuurih, FalleN, molodoy e YEKINDAR! 🎮"
      }

      if (cleanMessage.includes('partida') || cleanMessage.includes('jogo') || cleanMessage.includes('match')) {
        return "Sempre temos partidas emocionantes! A FURIA compete nos principais torneios de CS2 mundiais. Quer saber sobre alguma partida específica? 🏆"
      }

      if (cleanMessage.includes('estatística') || cleanMessage.includes('stats')) {
        return "A FURIA tem estatísticas impressionantes! Somos uma das melhores equipes do Brasil e competimos no cenário mundial. Que estatística específica você gostaria de saber? 📊"
      }

      if (cleanMessage.includes('olá') || cleanMessage.includes('oi') || cleanMessage.includes('hello') || cleanMessage === '') {
        return "Olá, torcedor da FURIA! 🔥 É sempre um prazer falar com nossos fãs! Como posso te ajudar hoje?"
      }

      if (cleanMessage.includes('obrigado') || cleanMessage.includes('thanks')) {
        return "De nada! É sempre um prazer ajudar os fãs da FURIA! 🔥 Se tiver mais alguma dúvida, estarei aqui!"
      }

      if (cleanMessage.includes('ajuda') || cleanMessage.includes('help')) {
        return "Posso te ajudar com informações sobre nossos jogadores, partidas, estatísticas e história da FURIA! 🔥 Também respondo quando vocês mencionam nossos players!"
      }

      // Default response for direct bot commands
      return "Como assistente da FURIA, posso te ajudar com informações sobre nossos jogadores, partidas, estatísticas e história da equipe. O que você gostaria de saber? 🔥"
    }

    // Return null if neither keywords nor bot command were found
    // This will prevent the bot from responding
    return null
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
        <MessageList messages={messages} user={user} />
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  )
}

export default ChatContainer
