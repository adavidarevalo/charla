import { Avatar, Box, Button, Flex, IconButton, Text } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'
import { useVideoChat } from '../../../context/video_chat.context'

export default function RingRing() {
  const { call, callAccepted, endCall, answerCall } = useVideoChat()

  const options = [
    {
      icon: <IoMdClose />,
      'aria-label': 'Call reject',
      bg: 'red',
      onClick: endCall
    },
    {
      icon: <FaCheck />,
      'aria-label': 'Accept call',
      bg: 'blue',
      onClick: answerCall
    }
  ]

  if (!call?.receivingCall && callAccepted) return <></>

  return (
    <>
      <Flex position={'absolute'} bg={'red'} align={'center'}>
        <Avatar name={'pepe'} src="https://bit.ly/code-beast" size="xl" />
        <Box>
          <Text as={'b'}>David Arevalo</Text>
          <Text>Whatsapp Video</Text>
        </Box>
        <Flex>
          {options.map(({onClick, ...option}) => (
            <Button onClick={onClick}>
              <IconButton {...option} rounded={'full'} cursor={'pointer'} />
            </Button>
          ))}
        </Flex>
      </Flex>
      <audio src="/audio/ringtone.mp3" autoPlay loop />
    </>
  )
}
