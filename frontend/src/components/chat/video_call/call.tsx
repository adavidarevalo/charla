import { Avatar, Box, Flex, Grid, GridItem, IconButton, Text } from '@chakra-ui/react'
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
  // const audio = useMemo(() => new Audio('/audio/ringing.mp3'), [])

  const toggleMic = () => {
  }

  const toggleVideo = () => {}

  const callOption = [
    {
      bg: 'purple.500',
      color: '#FCFCFE',
      icon: <IoVideocam />,
      'aria-label': 'Video',
      onClick: toggleVideo
    },
    {
      bg: 'purple.500',
      color: '#FCFCFE',
      icon: <AiFillAudio />,
      'aria-label': 'Microphone',
      onClick: toggleMic
    },
    {
      bg: 'red',
      color: '#FCFCFE',
      icon: <ImPhoneHangUp />,
      'aria-label': 'phone',
      onClick: endCall
    }
  ]

  // const isCalling = useMemo(
  //   () => Boolean((show || call?.signal) && !call?.callEnded),
  //   [show, call]
  // )

  // useEffect(() => {
  //   console.log('isCalling ', isCalling)
  //   isCalling && audio.play()
  //   isCalling === false && audio.pause()
  // }, [isCalling])

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
      <Grid
        templateColumns="repeat(3, 1fr)"
        position={'absolute'}
        zIndex={100}
        w={'full'}
        p={'10px'}
      >
        <GridItem w="100%" h="10">
          {callAccepted && <Stopwatch />}
        </GridItem>
        <GridItem w="100%" h="10">
          <Text
            fontSize={'23px'}
            textAlign={'center'}
            w={'center'}
            fontWeight={600}
          >
            {call?.name}
          </Text>
        </GridItem>
        <GridItem w="100%" h="10" />
      </Grid>
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
          <Flex w={'60%'} maxW={'150px'} justify={'space-between'}>
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
