import { Box, Flex, Text, Image, Avatar } from '@chakra-ui/react'
import { ReactNode } from 'react';
import { SlLogout } from 'react-icons/sl';
import Logo from "./../../../public/logo.png"
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/store';

interface MenuLayoutProps {
    children: ReactNode
}

export default function MenuLayout({ children }: MenuLayoutProps) {
      const { user } = useSelector((state: AppState) => state.user)
      console.log("🚀 ~ MenuLayout ~ user:", user)

  return (
    <Flex bg={'#202022'} w={'full'} h={'100vh'}>
      <Flex
        w={'20%'}
        maxW={'120px'}
        h={'100vh'}
        flexDir={'column'}
        justify={'space-between'}
        color={'#908E8E'}
      >
        <Flex justify={'center'} p={'20px'}>
          <Image src={Logo} alt={'Logo'} filter={'brightness(10000%)'} />
        </Flex>
        <Flex flexDir={'column'} align={"center"}>
          <Avatar src={user.picture} name={user.name} mb={"10px"}/>
          <Flex
            flexDir={'column'}
            align={'center'}
            p={'20px'}
            cursor={'pointer'}
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
