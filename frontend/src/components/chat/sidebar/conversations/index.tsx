import { useSelector } from 'react-redux'
import { AppState } from '../../../../redux/store'
import { Box } from '@chakra-ui/react'
import { Conversation } from '@/types/conversation.type'
import PreviewConversation from './preview_conversation'
import { useState } from 'react'

export default function ChatConversations() {
  const { conversations } = useSelector((state: AppState) => state.chat)
  const [searchResults, setSearchResults] = useState([])

  return (
    <Box h={'full'} overflowX={'auto'}>
      {conversations &&
        conversations.map((conversation: Conversation) => {
          //   const isOnline = onlineUsers.some(
          //     ({ userId }) =>
          //       userId === getConversationId(user as User, conversation.users)
          //   )
          return (
            <PreviewConversation
              key={conversation._id}
              conversation={conversation}
            />
          )
        })}
    </Box>
  )
}
