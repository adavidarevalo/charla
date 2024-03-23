import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../redux/store'
import Message from './message'
import { useEffect, useRef } from 'react'
import TypingMessage from './message/typing'

export default function ChatContent() {
  const { messages, conversationTyping, activeConversation } = useSelector(
    (state: AppState) => state.chat
  )

  const { user } = useSelector((state: AppState) => state.user)

    const messagesRef = useRef<HTMLDivElement>(null)

      useEffect(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        }
      }, [messages]) 


  return (
    <Box w={'full'} h={'full'} p={'40px'} overflowX={'auto'} ref={messagesRef}>
      {(messages || []).map((message) => (
        <Message
          key={message._id}
          isMe={user._id === message.sender._id}
          message={message}
        />
      ))}
      {conversationTyping.includes(activeConversation?._id || '') && (
        <TypingMessage messagesRef={messagesRef} />
      )}
    </Box>
  )
}
