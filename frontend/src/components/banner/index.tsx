import { Box, Flex, Text } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import chatAnimation from "./../../../public/lotties/login_background.json"

export default function BannerAuthentication() {
  return (
    <Box
      w={'full'}
      h={'100vh'}
      position={'fixed'}
      width={{ base: '100vw', lg: '50vw' }}
    >
      <Flex justify={'center'} align={'center'} h={'full'} bg={'#F7FAFC'}>
        <Flex direction={'column'} align={'center'}>
          <Lottie animationData={chatAnimation} loop={true} />
          <Box position={'relative'}>
            <Text as={'b'} fontSize={'5xl'} display={'block'} color={'#464646'}>
              Realtime, no delay...
            </Text>
            <Text as={'b'} fontSize={'4xl'} display={'block'} color={'#464646'}>
              your ideal way to convey! 😎
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
