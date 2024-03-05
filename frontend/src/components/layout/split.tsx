import {
  Box,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface SplitLayoutProps {
  leftComponent: ReactNode
  rightComponent: ReactNode
}

export default function SplitLayout({ leftComponent, rightComponent }: SplitLayoutProps) {
  return (
    <Flex align={'center'} justifyContent={'center'} h={'100vh'}>
      <Box maxW="10xl" w={'full'} mx="auto" h={'full'}>
        <Stack
          direction={{ base: 'column-reverse', lg: 'row' }}
          data-testid={'split-layout-stack'}
        >
          <Box flex="1">{rightComponent}</Box>
          <Flex
            flex="1"
            overflow="hidden"
            display={{ base: 'none', lg: 'block' }}
          >
            {leftComponent}
          </Flex>
        </Stack>
      </Box>
    </Flex>
  )
}
