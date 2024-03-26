import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { AiFillAudio, AiFillSound } from 'react-icons/ai'
import { ImPhoneHangUp } from 'react-icons/im'
import { IoVideocam } from 'react-icons/io5'
import { useVideoChat } from '../../../context/video_chat.context'
import { AppState } from '../../../redux/store'
import { useSelector } from 'react-redux'
import Stopwatch from './stopwatch'

export default function Call() {
  const { user } = useSelector((state: AppState) => state.user)
  const { myVideo, call, endCall, show, callAccepted, userVideo } =
    useVideoChat()
  const [hover, setHover] = useState(false)
  const audio = useMemo(() => new Audio('/audio/ringing.mp3'), [])

  const callOption = [
    {
      bg: 'purple.500',
      color: '#FCFCFE',
      icon: <AiFillSound />,
      'aria-label': 'sound'
    },
    {
      bg: 'purple.500',
      color: '#FCFCFE',
      icon: <IoVideocam />,
      'aria-label': 'Video'
    },
    {
      bg: 'purple.500',
      color: '#FCFCFE',
      icon: <AiFillAudio />,
      'aria-label': 'Microphone'
    },
    {
      bg: 'red',
      color: '#FCFCFE',
      icon: <ImPhoneHangUp />,
      'aria-label': 'phone',
      onClick: endCall
    }
  ]

  const isCalling = useMemo(
    () => Boolean((show || call?.signal) && !call?.callEnded),
    [show, call]
  )

  useEffect(() => {
    isCalling && audio.play()
    isCalling === false && audio.pause()
  }, [isCalling])

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
      <Flex
        bg={'red'}
        position={'absolute'}
        zIndex={100}
        w={'full'}
        justify={'space-between'}
      >
        <Box>
          <Stopwatch />
        </Box>
        <Text as={'b'} fontSize={'23px'}>
          {call?.name}
        </Text>
        <Box></Box>
      </Flex>
      <Flex
        w={'full'}
        h={'full'}
        rounded={'20px'}
        bg={'purple.100'}
        justify={'center'}
        align={'center'}
        position={'relative'}
      >
        <Flex
          direction={'column'}
          align={'center'}
          justify={'center'}
          position={'absolute'}
        >
          {!callAccepted && <Text fontSize={'21px'}>Ring Ring...</Text>}
          {!callAccepted && (
            <Avatar
              size="2xl"
              name={call?.name}
              src={call?.picture}
              mt={'20px'}
            />
          )}
        </Flex>
        {callAccepted && (
          <video
            ref={userVideo}
            playsInline
            autoPlay
            style={{ height: '100%', objectFit: 'cover', borderRadius: '20px' }}
          />
        )}
      </Flex>
      <Flex
        position={'absolute'}
        w={'40%'}
        maxW={'300px'}
        height={'40%'}
        bottom={hover ? '100px' : 0}
        right={0}
        rounded={'20px'}
        justify={'center'}
        align={'center'}
        bg={'purple.300'}
      >
        {show && (
          <video
            ref={myVideo}
            playsInline
            autoPlay
            style={{
              height: '100%',
              objectFit: 'cover',
              borderRadius: '20px'
            }}
          ></video>
        )}
        {!show && <Avatar size="lg" name={user.name} src={user.picture} />}
      </Flex>
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
