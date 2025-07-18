import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/query`, {
      question,
    });
    setAnswer(res.data.answer);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🤖 Ask StudyGPT</h1>
      <input
        type="text"
        placeholder="Ask me anything..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <button onClick={handleSubmit}>Send</button>
      <p><strong>Answer:</strong> {answer}</p>
    </div>
  );
}

export default App;
