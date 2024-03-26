import { Box, Flex, Text, Image, Avatar } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { SlLogout } from 'react-icons/sl'
import Logo from './../../../public/logo.png'
import { useSelector } from 'react-redux'
import { AppState } from '../../redux/store'
import { useDispatch } from 'react-redux'
import { logout } from './../../redux/slices/user.slice'

interface MenuLayoutProps {
  children: ReactNode
}

export default function MenuLayout({ children }: MenuLayoutProps) {
  const dispatch = useDispatch()
  const { user } = useSelector((state: AppState) => state.user)

  return (
    <Flex bg={'black.950'} w={'full'} h={'100vh'}>
      <Flex
        w={'20%'}
        maxW={'120px'}
        h={'100vh'}
        flexDir={'column'}
        justify={'space-between'}
        color={'black.500'}
      >
        <Flex justify={'center'} p={'20px'}>
          <Image
            src={Logo}
            alt={'Logo'}
            filter={'brightness(10000%)'}
            w={'60px'}
          />
        </Flex>
        <Flex flexDir={'column'} align={'center'}>
          <Avatar src={user.picture} name={user.name} mb={'10px'} />
          <Flex
            flexDir={'column'}
            align={'center'}
            p={'20px'}
            cursor={'pointer'}
            onClick={() => dispatch(logout())}
          >
            <SlLogout size={'30px'} />
            <Text fontSize={'18px'} mt={'3px'}>
              Log out
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box w={'full'} h={'full'}>
        {children}
      </Box>
    </Flex>
  )
}
