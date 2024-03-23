import { Box, Flex } from '@chakra-ui/react'
import { TbTriangleInvertedFilled } from 'react-icons/tb'
import Lottie from 'lottie-react'

import typingAnimation from './../../../../../../public/lotties/typing.json'
import { useEffect } from 'react'

interface TypingMessage {
  messagesRef: React.RefObject<HTMLDivElement>
}

export default function TypingMessage({ messagesRef }: TypingMessage) {
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [])

  return (
    <Flex justify={'start'}>
      <Box
        bg={'#EEEEF8'}
        color={'#1C1C1C'}
        w={'fit-content'}
        maxW={'40%'}
        minW={'200px'}
        p={'17px'}
        marginBlock={'10px'}
        rounded={'20px'}
        fontSize={'20px'}
        position={'relative'}
      >
        <Box position={'absolute'} top={'-3px'} left={'-18px'}>
          <TbTriangleInvertedFilled size={30} color="#EEEEF8" />
        </Box>

        <Flex w={'full'} justify={'center'} align={'center'} h={'full'}>
          <Box maxW={'50px'}>
            <Lottie animationData={typingAnimation} loop={true} width={'10%'} />
          </Box>
        </Flex>
      </Box>
    </Flex>
  )
}
