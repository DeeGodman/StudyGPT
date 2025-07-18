import React, { useState } from "react";

function ChatInput({ onSend }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <form className="chat-input-bar" onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        className="chat-input"
        type="text"
        placeholder="Ask something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: '0.75rem', borderRadius: '1rem', border: '1px solid #333', background: '#222', color: '#fff', fontSize: '1rem' }}
      />
      <button
        className="chat-send-btn"
        type="submit"
        style={{ padding: '0.75rem 1.5rem', borderRadius: '1rem', border: 'none', background: '#2563eb', color: '#fff', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
