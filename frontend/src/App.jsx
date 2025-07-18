import React, { useState } from "react";
import axios from "axios";
import { Box, VStack, Heading, useColorMode } from '@chakra-ui/react';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

function App() {
  const [messages, setMessages] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

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
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.100'}>
      <VStack spacing={4} align="stretch" maxW="600px" mx="auto" pt={8} pb={24}>
        <Heading size="lg" color={colorMode === 'dark' ? 'white' : 'gray.800'} textAlign="center" mb={2}>
          🤖 StudyGPT
        </Heading>
        <Box flex={1} overflowY="auto" maxH="70vh" px={2}>
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} type={msg.type} text={msg.text} />
          ))}
        </Box>
      </VStack>
      <Box position="fixed" bottom={0} left={0} w="100%" bg={colorMode === 'dark' ? 'gray.900' : 'gray.100'} py={4} px={2} boxShadow="0 -2px 8px rgba(0,0,0,0.1)">
        <Box maxW="600px" mx="auto">
          <ChatInput onSend={handleSend} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
