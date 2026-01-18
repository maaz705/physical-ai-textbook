import React, { useState, useEffect } from 'react';
import styles from './RAGChatbot.module.css';

const RAGChatbot = ({ selectedText = null }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Initialize with any selected text if provided
  useEffect(() => {
    if (selectedText) {
      setInputValue(selectedText);
    }
  }, [selectedText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: inputValue, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // In a real implementation, we would get the auth token from context/state
      const authToken = localStorage.getItem('auth_token') || 'mock-token'; // Placeholder

      const response = await fetch('/api/v1/chat/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          query: inputValue,
          selected_text: selectedText
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Add bot response to chat
      const botMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
        contextUsed: data.context_used
      };

      setMessages(prev => [...prev, botMessage]);
      setInputValue('');
    } catch (error) {
      console.error('Error communicating with chatbot:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h3>Physical AI & Robotics Assistant</h3>
        <p>Ask questions about the textbook content</p>
      </div>

      <div className={styles.chatMessages}>
        {messages.length === 0 ? (
          <div className={styles.welcomeMessage}>
            <p>Hello! I'm your Physical AI & Humanoid Robotics textbook assistant.</p>
            <p>Ask me questions about the content, and I'll help you understand concepts better.</p>
            {selectedText && (
              <div className={styles.selectedTextPreview}>
                <small>You selected: "{selectedText.substring(0, 100)}{selectedText.length > 100 ? '...' : ''}"</small>
              </div>
            )}
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${styles[message.role]} ${message.isError ? styles.error : ''}`}
            >
              <div className={styles.messageContent}>
                {message.role === 'assistant' && message.contextUsed && (
                  <small className={styles.contextIndicator}>
                    Context used from textbook
                  </small>
                )}
                <p>{message.content}</p>
                <span className={styles.timestamp}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className={styles.message} style={{justifyContent: 'flex-start'}}>
            <div className={styles.typingIndicator}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.chatInputForm}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={selectedText ? "Ask about the selected text..." : "Ask a question about the robotics content..."}
          disabled={isLoading}
          className={styles.chatInput}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className={styles.sendButton}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default RAGChatbot;