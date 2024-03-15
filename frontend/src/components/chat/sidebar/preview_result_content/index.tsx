import { useSelector } from 'react-redux'
import { AppState } from '../../../../redux/store'
import { Box } from '@chakra-ui/react'
import PreviewConversation from './preview_conversation'
import { useSidebarChat } from '../context'

export default function ChatPreviewResultContent() {
  const { conversations } = useSelector((state: AppState) => state.chat)
  const { isSearching, searchedResult } = useSidebarChat()

  const dataResult = isSearching ? searchedResult : conversations

  return (
    <Box h={'full'} overflowX={'auto'}>
      {dataResult.map((data) => {
        return <PreviewConversation key={data._id} data={data} />
      })}
    </Box>
  )
}
