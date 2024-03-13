import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { AppState } from '../../../../redux/store'
import { getConversationPicture } from '../../utils'
import { User } from '../../../../types/user.type';
import capitalize from 'lodash.capitalize';
import { CiMenuKebab, CiPhone, CiVideoOn } from 'react-icons/ci';

export default function HeaderConversation() {
  const { activeConversation } = useSelector((state: AppState) => state.chat)
  const { user } = useSelector((state: AppState) => state.user)

  return (
    <>
      <Flex
        h={'full'}
        align={'center'}
        paddingInline={'20px'}
        justify={'space-between'}
        borderBottom={'2px solid #eaeff6'}
      >
        <Flex align={'center'}>
          <Avatar
            src={
              activeConversation?.isGroup
                ? activeConversation.picture
                : getConversationPicture(
                    user,
                    activeConversation?.users as User[]
                  )
            }
            name={activeConversation?.name}
          />
          <Box ml={'10px'}>
            <Text as={'b'} fontSize={'23px'} color={'#464646'} m={0}>
              {capitalize(activeConversation?.name)}
            </Text>
            <Text color={'green'}>Online</Text>
          </Box>
        </Flex>
        <Flex
          color={'#8C9195'}
          w={'100%'}
          maxW={'120px'}
          justify={'space-between'}
        >
          <CiVideoOn size={30} cursor={'pointer'} />
          <CiPhone size={30} cursor={'pointer'} />
          <CiMenuKebab size={30} cursor={'pointer'} />
        </Flex>
      </Flex>
      <Divider orientation="horizontal" />
    </>
  )
}
