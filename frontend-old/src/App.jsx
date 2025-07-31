import React, { useState } from "react";
import axios from "axios";
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

function App() {
  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {
    const userMsg = { type: 'user', text };
    setMessages((msgs) => [...msgs, userMsg]);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/query`, { question: text });
      const botMsg = { type: 'bot', text: res.data.answer };
      setMessages((msgs) => [...msgs, botMsg]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { type: 'bot', text: 'Error: Could not get answer.' }]);
    }
  };

  return (
    <div className="chat-app" style={{ minHeight: '100vh', background: '#1a202c', color: '#f7fafc', display: 'flex', flexDirection: 'column' }}>
      <div style={{ maxWidth: 600, width: '100%', margin: '0 auto', paddingTop: 32, paddingBottom: 120, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ textAlign: 'center', marginBottom: 16, fontSize: '2rem', fontWeight: 700 }}>🤖 StudyGPT</h1>
        <div style={{ flex: 1, overflowY: 'auto', maxHeight: '70vh', padding: '0 8px' }}>
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} type={msg.type} text={msg.text} />
          ))}
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#1a202c', padding: '1rem 0.5rem', boxShadow: '0 -2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <ChatInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}

export default App;
