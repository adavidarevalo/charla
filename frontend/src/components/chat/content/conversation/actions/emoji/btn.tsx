import { Button } from '@chakra-ui/react'
import { BsEmojiSmile } from 'react-icons/bs'
import { useSendMessageContext } from '../context'

export default function EmojiBtn() {
    const { setIsShowEmojiPicker } = useSendMessageContext()
  return (
    <Button
      variant="outline"
      _hover={{ bg: 'none' }}
      border={'transparent'}
      color={'#454686'}
      onClick={() => setIsShowEmojiPicker((prev) => !prev)}
    >
      <BsEmojiSmile size={'30px'} />
    </Button>
  )
}
