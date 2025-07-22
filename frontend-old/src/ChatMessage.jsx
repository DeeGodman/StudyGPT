import React from "react";

function ChatMessage({ type, text }) {
  const isUser = type === 'user';
  return (
    <div
      className={`chat-message ${isUser ? 'user' : 'bot'}`}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '0.5rem',
      }}
    >
      <div
        className="chat-bubble"
        style={{
          background: isUser ? '#2563eb' : '#2d3748',
          color: isUser ? '#fff' : '#f7fafc',
          padding: '0.75rem 1.25rem',
          borderRadius: '1.25rem',
          maxWidth: '75%',
          whiteSpace: 'pre-wrap',
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default ChatMessage;
