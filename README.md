# 🔥 Furia Counter Strike Team Chatbot

A modern, responsive chatbot frontend designed for Furia Counter Strike team fans. Built with React and Vite, featuring a sleek dark theme that matches the esports aesthetic.

## ✨ Features

- **Modern UI/UX**: Sleek dark theme with Furia branding
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Chat**: Smooth message animations and typing indicators
- **Smart Responses**: Context-aware bot responses about Furia team
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Performance**: Fast loading with Vite build system

## 🎮 What the Bot Knows

The chatbot can help with information about:
- **Players**: Information about KSCERATO, yuurih, fallen, molodoy, YEKINDAR
- **Matches**: Recent games and tournament information
- **Statistics**: Team performance and player stats
- **General**: Team history and achievements

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd Chatbot
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ChatContainer.jsx     # Main chat interface
│   ├── Header.jsx           # App header with Furia branding
│   ├── MessageList.jsx      # Messages display container
│   ├── Message.jsx          # Individual message component
│   ├── MessageInput.jsx     # Message input with send button
│   ├── TypingIndicator.jsx  # Bot typing animation
│   └── *.css               # Component styles
├── App.jsx                 # Main app component
├── App.css                # Global app styles
├── index.css              # Global CSS reset and variables
└── main.jsx               # App entry point
```

## 🎨 Design Features

- **Color Scheme**: Black and dark grays with green accents (#4CAF50)
- **Typography**: Modern sans-serif fonts for readability
- **Animations**: Smooth transitions and typing indicators
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG compliant color contrast and navigation

## 🔧 Customization

### Adding New Bot Responses

Edit the `generateBotResponse` function in `ChatContainer.jsx`:

```javascript
const generateBotResponse = (userMessage) => {
  const message = userMessage.toLowerCase()

  if (message.includes('your-keyword')) {
    return "Your custom response here"
  }

  // ... existing responses
}
```

### Styling

Each component has its own CSS file for easy customization. Main theme variables are in `index.css`.

## 🌟 Future Enhancements

- [ ] Integration with real Furia API for live data
- [ ] Voice message support
- [ ] Multi-language support (Portuguese/English)
- [ ] Chat history persistence
- [ ] Admin panel for bot responses
- [ ] Integration with Discord/Telegram

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔥 About Furia

Furia Esports is a Brazilian professional esports organization competing in Counter-Strike 2, among other games. They are one of the top teams in the Brazilian and international CS scene.

---

**Made with ❤️ for Furia fans by the community**