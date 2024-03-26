import { Button } from '@chakra-ui/react'
import { useSendMessageContext } from './context'
import { BsSend } from 'react-icons/bs'

export default function SendMessageBtn() {
  const { messageValue, isLoading, handleSendMessage } = useSendMessageContext()
 
  return (
    <Button
      bg={'none'}
      color={'purple.800'}
      h={'50px'}
      onClick={handleSendMessage}
      isLoading={isLoading}
      isDisabled={isLoading || messageValue.length === 0}
      variant="outline"
      _hover={{ bg: 'none' }}
      border={'transparent'}
    >
      <BsSend size={'30px'} />
    </Button>
  )
}
