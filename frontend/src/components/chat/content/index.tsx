import { Grid } from '@chakra-ui/react'
import { AppState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import DefaultContent from './default_content'
import Conversation from './conversation'

export default function ChatContent() {
  const { activeConversation } = useSelector((state: AppState) => state.chat)

  return (
    <Grid h="100vh" w={'full'} templateRows="repeat(10, 1fr)">
      {activeConversation === null && <DefaultContent />}
      {activeConversation && <Conversation />}
    </Grid>
  )
}
