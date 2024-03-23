import { Input } from '@chakra-ui/react'
import { useSendMessageContext } from './context'
import { useState } from 'react'
import { useSocket } from '../../../../../context/socket.context'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../../redux/store'

export default function InputMessage() {
  const {
    isLoading,
    messageTextRef,
    messageValue,
    handleSendMessage,
    setMessageValue
  } = useSendMessageContext()
  const { socket } = useSocket()
  const [isTyping, setIsTyping] = useState(false)

  const { activeConversation } = useSelector((state: AppState) => state.chat)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value)

    if (!isTyping) {
      setIsTyping(true)
      socket?.emit('typing', activeConversation?._id)
    }

    const lastTypingTime = new Date().getTime()
    const timer = 2000

    setTimeout(() => {
      const timeNow = new Date().getTime()
      const timeDiff = timeNow - lastTypingTime

      if (timeDiff >= timer && isTyping) {
        socket?.emit('stop typing', activeConversation?._id)
        setIsTyping(false)
      }
    }, timer)
  }

  return (
    <Input
      placeholder="Type Message"
      size="lg"
      ref={messageTextRef}
      value={messageValue}
      isDisabled={isLoading}
      onChange={handleChange}
      h={'full'}
      _hover={{ border: 'transparent' }}
      focusBorderColor={'transparent'}
      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
    />
  )
}
