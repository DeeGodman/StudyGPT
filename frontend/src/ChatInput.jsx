import React from "react";

import { useState } from 'react'
import { Button, HStack, Input } from '@chakra-ui/react'

function ChatInput({ onSend }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <HStack>
        <Input
          placeholder="Ask something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" colorScheme="blue">Send</Button>
      </HStack>
    </form>
  )
}

export default ChatInput
