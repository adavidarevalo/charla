import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { Conversation } from '../../../../types/conversation.type';
import { AppDispatch, AppState } from '../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { dateHandler, getConversationId, getConversationName } from './utils';
import capitalize from 'lodash.capitalize'
import truncate from "lodash.truncate"
import { open_create_conversation } from '../../../../redux/actions/chat.actions';
import { getConversationPicture } from '../../utils';

interface PreviewConversationProps {
  conversation: Conversation
}

export default function PreviewConversation({ conversation }: PreviewConversationProps) {
    const { user } = useSelector((state: AppState) => state.user)
      const dispatch = useDispatch<AppDispatch>()
       const { activeConversation } = useSelector(
         (state: AppState) => state.chat
       )
       

      const handleSelect = async () => {
        const value = {
          receiver_id: getConversationId(user, conversation.users),
          token: user?.token
        }
        try {
          await dispatch(
            open_create_conversation(value)
          )
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
      _hover={{ bg: activeConversation?._id !== conversation._id && '#EEEEF8' }}
      bg={activeConversation?._id === conversation._id ? '#EEEEF8' : ''}
      onClick={handleSelect}
    >
      <Image
        w={'80px'}
        h={'80px'}
        objectFit={'cover'}
        rounded={'10px'}
        src={getConversationPicture(user, conversation.users)}
        alt={conversation.name}
      />
      <Box w={'full'} pl={'20px'}>
        <Text as={'b'} fontSize={'25px'} color={'#2D2D2F'}>
          {capitalize(getConversationName(user, conversation.users))}
        </Text>
        <Text color={'#888CEF'} fontSize={'20px'}>
          {truncate(conversation.latestMessage.message, { length: 25 })}
        </Text>
      </Box>
      <Box mr={'5px'}>
        <Text color={'#9c9a9b'} fontSize={'18px'}>
          {dateHandler(conversation.latestMessage.updatedAt)}
        </Text>
      </Box>
    </Flex>
  )
}
