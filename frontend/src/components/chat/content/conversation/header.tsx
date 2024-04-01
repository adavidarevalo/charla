import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../redux/store'
import { getConversationPicture } from '../../utils'
import { User } from '../../../../types/user.type'
import capitalize from 'lodash.capitalize'
import { CiMenuKebab, CiPhone, CiVideoOn } from 'react-icons/ci'
import { useMemo } from 'react'
import { getConversationId } from '../../sidebar/preview_result_content/utils'
import { useVideoChat } from '../../../../context/video_chat.context'
import { PhotoView } from 'react-photo-view'

export default function HeaderConversation() {
  const { activeConversation, onlineUsers } = useSelector(
    (state: AppState) => state.chat
  )
  const { user } = useSelector((state: AppState) => state.user)
  const { callUser } = useVideoChat()

  const insOnline = useMemo(() => {
    return onlineUsers.some(
      ({ userId }) =>
        userId ===
        getConversationId(user as User, activeConversation?.users as User[])
    )
  }, [activeConversation, onlineUsers])

  const avatarSrc = useMemo(
    () =>
      activeConversation?.isGroup
        ? activeConversation.picture
        : getConversationPicture(user, activeConversation?.users as User[]),
    [activeConversation]
  )

  return (
    <>
      <Flex
        h={'full'}
        align={'center'}
        paddingInline={'20px'}
        justify={'space-between'}
      >
        <Flex align={'center'}>
            <PhotoView src={avatarSrc}>
              <Avatar
                cursor={'pointer'}
                src={avatarSrc}
                name={activeConversation?.name}
              />
            </PhotoView>
          <Box ml={'10px'}>
            <Text as={'b'} fontSize={'23px'} color={'black.900'} m={0}>
              {capitalize(activeConversation?.name)}
            </Text>
            {insOnline && <Text color={'green.500'}>Online</Text>}
          </Box>
        </Flex>
        <Flex
          color={'black.900'}
          w={'100%'}
          maxW={'120px'}
          justify={'space-between'}
        >
          <Box
            _hover={{ color: 'purple.800' }}
            cursor={'pointer'}
            onClick={callUser}
          >
            <CiVideoOn size={30} />
          </Box>
          <Box _hover={{ color: 'purple.800' }} cursor={'pointer'}>
            <CiPhone size={30} />
          </Box>
          <Box _hover={{ color: 'purple.800' }} cursor={'pointer'}>
            <CiMenuKebab size={30} />
          </Box>
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
    </>
  )
}
