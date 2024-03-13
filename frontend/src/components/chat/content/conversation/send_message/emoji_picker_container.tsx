import { Box } from '@chakra-ui/react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import get from 'lodash/get'
import set from 'lodash.set'
import { useSendMessageContext } from './context'
import { useEffect, useState } from 'react'

export default function EmojiPickerContainer() {
  const {
    messageTextRef,
    messageValue,
    setMessageValue,
    isShowEmojiPicker,
    setIsShowEmojiPicker
  } = useSendMessageContext()

  const [cursorPosition, setCursorPosition] = useState<number>()

  useEffect(() => {
    set(messageTextRef, 'current.selectionEnd', cursorPosition)
  }, [cursorPosition])

  useEffect(() => {
    window.addEventListener('keydown', () => setIsShowEmojiPicker(false))
    return () => {
      window.removeEventListener('keydown', () => setIsShowEmojiPicker(false))
    }
  }, [])

  if (isShowEmojiPicker === false) return <></>

  const handleEmoji = (emojiData: EmojiClickData) => {
    const { emoji } = emojiData
    const ref = get(messageTextRef, 'current')
    ref!.focus()
    const value = ref?.value || messageValue
    const start = value.substring(0, get(ref, 'selectionStart') as number)

    const end = value.substring(get(ref, 'selectionStart') as number)

    setMessageValue(`${start}${emoji}${end}`)
    setCursorPosition(start.length + emoji.length)
  }

  return (
    <Box
      position={'absolute'}
      top={'-450px'}
      w={'80%'}
      zIndex={1}
    >
      <EmojiPicker width={'100%'} onEmojiClick={handleEmoji} />
    </Box>
  )
}
