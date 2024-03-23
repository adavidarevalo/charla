import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillAudio, AiFillSound } from 'react-icons/ai'
import { ImPhoneHangUp } from 'react-icons/im'
import { IoVideocam } from 'react-icons/io5'
import { useVideoChat } from '../../../context/video_chat.context';

const callOption = [
  {
    bg: '#7578ED',
    color: '#FCFCFE',
    icon: <AiFillSound />,
    'aria-label': 'sound'
  },
  {
    bg: '#7578ED',
    color: '#FCFCFE',
    icon: <IoVideocam />,
    'aria-label': 'Video'
  },
  {
    bg: '#7578ED',
    color: '#FCFCFE',
    icon: <AiFillAudio />,
    'aria-label': 'Microphone'
  },
  {
    bg: 'red',
    color: '#FCFCFE',
    icon: <ImPhoneHangUp />,
    'aria-label': 'phone'
  }
]

export default function Call() {
  const {myVideo, call} = useVideoChat()
  const [hover, setHover] = useState(false)

  return (
    <Box
      as={'section'}
      cursor={'pointer'}
      h={'full'}
      w={'full'}
      rounded={'20px'}
      position={'relative'}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box
        w={'full'}
        h={'full'}
        rounded={'20px'}
        bg={
          'radial-gradient(circle, rgba(117,120,237,1) 0%, rgba(69,50,120,1) 100%)'
        }
      >
        <Flex
          direction={'column'}
          align={'center'}
          h={'100px'}
          justify={'center'}
        >
          <Text as={'b'} fontSize={'23px'}>
            {call?.name}
          </Text>
          <Text fontSize={'21px'}>Ring Ring...</Text>
        </Flex>
      </Box>
      <Box
        bg={'red'}
        position={'absolute'}
        w={'40%'}
        maxW={'300px'}
        height={'40%'}
        bottom={hover ? '100px' : 0}
        right={0}
        rounded={'20px'}
      >
        <video ref={myVideo} playsInline muted autoPlay></video>
      </Box>
      {hover && (
        <Flex
          position={'absolute'}
          background={'black'}
          w={'full'}
          bottom={0}
          rounded={'20px'}
          height={'100px'}
          justify={'center'}
          align={'center'}
        >
          <Flex w={'60%'} maxW={'200px'} justify={'space-between'}>
            {callOption.map((option) => (
              <IconButton
                key={option['aria-label']}
                {...option}
                rounded={'full'}
              />
            ))}
          </Flex>
        </Flex>
      )}
    </Box>
  )
}
