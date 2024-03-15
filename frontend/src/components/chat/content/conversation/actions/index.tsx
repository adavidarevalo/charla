import { Flex } from '@chakra-ui/react'
import UploadBtn from './file/upload_btn'
import EmojiPickerContainer from './emoji/picker_container'
import InputMessage from './input'
import SendMessageProvider from './context'
import SendMessageBtn from './send_message_btn'
import PreviewFile from './file/preview_file'
import EmojiBtn from './emoji/btn'

export default function ConversationActions() {
  return (
    <SendMessageProvider>
      <Flex
        w={'full'}
        h={'full'}
        justify={'center'}
        position={'relative'}
        p={"15px"}
      >
        <Flex maxW={'80%'} w={'full'} h={'full'} bg={"#EEEEF8"} align={"center"} rounded={"15px"}>
          <EmojiBtn/>
          <InputMessage />
          <UploadBtn />
          <SendMessageBtn />
        </Flex>
        <EmojiPickerContainer />
        <PreviewFile />
      </Flex>
    </SendMessageProvider>
  )
}
