import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa6'
import { useVideoChat } from '../../../context/video_chat.context'
import { ImPhoneHangUp } from 'react-icons/im'
import { useRef } from 'react'

export default function RingRing() {
  const { call, endCall, answerCall } = useVideoChat()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const options = [
    {
      icon: <ImPhoneHangUp />,
      bg: '#F03A13',
      onClick: endCall,
      content: 'Decline',
      hoverBg: '#df3510'
    },
    {
      icon: <FaCheck />,
      bg: '#01B94D',
      onClick: answerCall,
      content: 'Accept',
      hoverBg: '#01ad48'
    }
  ]


  return (
    <Flex
      bg={'black.950'}
      h={'auto'}
      direction={'column'}
      align={'center'}
      p={'20px'}
      w={'full'}
      rounded={'20px'}
    >
      <Avatar name={call?.name} src={call?.picture} size="2xl" />
      <Box mt={'20px'} textAlign={'center'}>
        <Text as={'b'} color={'black.50'} fontSize={'3xl'}>
          {call?.name}
        </Text>
        <Text color={'black.100'} fontSize={'xl'} fontWeight={600}>
          Whatsapp Video
        </Text>
      </Box>
      <Flex mt={'20px'} justify={'space-around'} w={'full'}>
        {options.map(({ onClick, icon, content, bg, hoverBg }) => (
          <Button
            leftIcon={icon}
            onClick={onClick}
            key={content}
            bg={bg}
            fontSize={'xl'}
            color={'white'}
            fontWeight={600}
            p={'20px'}
            _hover={{ bg: hoverBg }}
          >
            {content}
          </Button>
        ))}
      </Flex>
      <audio src="/audio/ringtone.mp3" ref={audioRef} loop></audio>
    </Flex>
  )
}
