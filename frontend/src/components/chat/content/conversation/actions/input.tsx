import { Input } from '@chakra-ui/react'
import { useSendMessageContext } from './context'

export default function InputMessage() {
  const {
    isLoading,
    messageTextRef,
    messageValue,
    handleSendMessage,
    setMessageValue
  } = useSendMessageContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageValue(e.target.value)
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
