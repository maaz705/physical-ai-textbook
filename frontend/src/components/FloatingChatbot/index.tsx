import React, { useState } from 'react';
import { useLocation } from '@docusaurus/router';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your Physical AI assistant. How can I help you today?', sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const location = useLocation();

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      // Add user message
      const newUserMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user'
      };

      setMessages([...messages, newUserMessage]);

      // Simulate bot response after a delay
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: `I received your message about "${inputValue}". I can help you with Physical AI and Robotics concepts. Current page: ${location.pathname}`,
          sender: 'bot'
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);

      setInputValue('');
    }
  };

  return (
    <div className="floating-chatbot-container">
      {isOpen ? (
        <div className="chatbot-window glass-card" style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '350px',
          height: '450px',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--ifm-card-background-color)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 168, 255, 0.2)',
          border: '1px solid rgba(0, 168, 255, 0.2)'
        }}>
          <div className="chatbot-header" style={{
            padding: '15px',
            backgroundColor: 'rgba(0, 168, 255, 0.1)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 168, 255, 0.2)'
          }}>
            <h4 style={{margin: 0, color: '#00a8ff'}}>Physical AI Assistant</h4>
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: '#00a8ff',
                fontSize: '18px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
          <div className="chatbot-messages" style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  backgroundColor: message.sender === 'user' ? 'var(--ifm-color-primary)' : 'rgba(255, 255, 255, 0.1)',
                  color: message.sender === 'user' ? 'white' : 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  maxWidth: '80%'
                }}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="chatbot-input" style={{
            display: 'flex',
            padding: '15px',
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            borderTop: '1px solid rgba(0, 168, 255, 0.2)'
          }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about robotics..."
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(0, 168, 255, 0.3)',
                backgroundColor: 'rgba(10, 10, 10, 0.7)',
                color: 'white',
                marginRight: '10px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--ifm-color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 15px',
                cursor: 'pointer'
              }}
            >
              Send
            </button>
          </form>
        </div>
      ) : null}

      <div className="floating-chatbot" onClick={toggleChat}>
        <div className="floating-chatbot-icon">💬</div>
      </div>
    </div>
  );
};

export default FloatingChatbot;