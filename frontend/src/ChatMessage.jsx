import React from "react";
import { Box, Flex, Text } from '@chakra-ui/react'

function ChatMessage({ type, text }) {
  const isUser = type === 'user'
  return (
    <Flex justify={isUser ? 'flex-end' : 'flex-start'} mb={2}>
      <Box
        bg={isUser ? 'blue.500' : 'gray.200'}
        color={isUser ? 'white' : 'black'}
        px={4}
        py={2}
        borderRadius="lg"
        maxW="75%"
      >
        <Text whiteSpace="pre-wrap">{text}</Text>
      </Box>
    </Flex>
  )
}

export default ChatMessage
