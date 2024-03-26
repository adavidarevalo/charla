import Lottie from 'lottie-react'
import defaultChatAnimation from "./../../../../public/lotties/default_chat.json"
import { Flex, GridItem, Text } from '@chakra-ui/react'

export default function DefaultContent() {
  return (
    <GridItem rowSpan={12} colSpan={1} >
      <Flex w={'full'} justify={'center'} h={'full'} align={'center'}>
        <Flex direction={'column'}>
          <Lottie animationData={defaultChatAnimation} loop={true} />
          <Text fontSize={'4xl'} color={'black.800'}>
            Please Select a conversation... 😀
          </Text>
        </Flex>
      </Flex>
    </GridItem>
  )
}
