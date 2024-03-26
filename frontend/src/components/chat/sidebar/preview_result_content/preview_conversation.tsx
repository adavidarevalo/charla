import { Avatar, AvatarBadge, Box, Flex, Text } from '@chakra-ui/react'
import { Conversation } from '../../../../types/conversation.type'
import { AppDispatch, AppState } from '../../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { dateHandler, getVariables } from './utils'
import capitalize from 'lodash.capitalize'
import truncate from 'lodash.truncate'
import { open_create_conversation } from '../../../../redux/actions/chat.actions'
import { ISearchedResult, useSidebarChat } from '../context'
import { useSocket } from '../../../../context/socket.context'
import { useMemo } from 'react'

interface PreviewResultProps {
  data: Conversation | ISearchedResult
}

export default function PreviewResult({ data }: PreviewResultProps) {
  const { socket } = useSocket()
  const { isSearching } = useSidebarChat()
  const { user } = useSelector((state: AppState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  const { activeConversation, onlineUsers } = useSelector(
    (state: AppState) => state.chat
  )

  const { receiver_id, picture, name, subtitle } = getVariables(
    data,
    isSearching,
    user
  )

  const insOnline = useMemo(() => {
    return onlineUsers.some(({ userId }) => userId === receiver_id)
  }, [activeConversation, onlineUsers])

  const handleSelect = async () => {
    try {
      const value = {
        receiver_id,
        token: user?.token
      }
      await dispatch(open_create_conversation(value))
      socket?.emit('join conversation', data?._id)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex
      w={'full'}
      justify={'space-between'}
      p={'20px'}
      rounded={'10px'}
      marginBlock={'5px'}
      cursor={'pointer'}
      _hover={{ bg: activeConversation?._id !== data._id && 'purple.100' }}
      bg={activeConversation?._id === data._id ? 'purple.100' : ''}
      onClick={handleSelect}
    >
      <Box>
        <Avatar src={picture} name={data.name}>
          {insOnline && <AvatarBadge boxSize="1.25em" bg="green.500" />}
        </Avatar>
      </Box>
      <Box w={'full'} pl={'20px'}>
        <Text as={'b'} fontSize={'25px'} color={'black.950'}>
          {capitalize(name)}
        </Text>
        <Text color={'purple.900'} fontSize={'20px'}>
          {truncate(subtitle, { length: 25 })}
        </Text>
      </Box>
      {!isSearching && (
        <Box mr={'5px'}>
          <Text color={'black.400'} fontSize={'18px'}>
            {dateHandler((data as Conversation).latestMessage.updatedAt)}
          </Text>
        </Box>
      )}
    </Flex>
  )
}
