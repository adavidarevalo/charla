import { Box, Flex, Text } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import pageNotFoundAnimation from './../../public/lotties/page_not_found.json'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <Flex
      direction={'column'}
      w="full"
      h={'100vh'}
      maxH={'100vh'}
      justify={'center'}
      align={'center'}
      bg={"black.100"}
      color={"black.950"}
    >
      <Box maxW={"400px"}>
        <Lottie animationData={pageNotFoundAnimation} loop={true} />
      </Box>
      <Text fontSize="xl" fontWeight="bold" mt={4}>
        Error 404: Page Not Found
      </Text>
      <Text mt={2} fontSize={"xl"}>
        We're sorry, but the page you are looking for does not exist.
      </Text>
      <Link to={"/"}>Return to home </Link>
    </Flex>
  )
}
