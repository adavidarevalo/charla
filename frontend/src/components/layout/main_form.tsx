import {
  Box,
  Container,
  Flex,
  Stack,
  Image
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface MainFormLayoutProps {
  imageUrl: string
  subHeadingStack: ReactNode
  form: ReactNode
}

export default function MainFormLayout({imageUrl, form, subHeadingStack}: MainFormLayoutProps) {
  return (
    <Flex w={'full'} h={'full'} justify={'center'} align={'center'}>
      <Container
        maxW="lg"
        py={{ base: '12', md: '24' }}
        px={{ base: '0', sm: '8' }}
      >
        <Stack spacing="8">
          <Stack spacing="6">
            <Flex w={'full'} justify={'center'}>
              <Image src={imageUrl} alt={'Logo'} w={'80px'} />
            </Flex>
            {subHeadingStack}
          </Stack>
          <Box
            py={{ base: '0', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={{ base: 'transparent', sm: 'bg.surface' }}
            boxShadow={{ base: 'none', sm: 'md' }}
            borderRadius={{ base: 'none', sm: 'xl' }}
          >
            {form}
          </Box>
        </Stack>
      </Container>
    </Flex>
  )
}
