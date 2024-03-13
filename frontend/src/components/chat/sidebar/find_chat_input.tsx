import { Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { useDebounce } from 'use-debounce'
import { useSidebarChat } from './context'

export default function FindChatInput() {
  const { handleSearch } = useSidebarChat()
  const [searchValue, setSearchValue] = useState("")
  const [value] = useDebounce(searchValue, 1000)


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  useEffect(() => {
    handleSearch(value)
  }, [value])
  

  return (
    <>
      <Flex
        h={'full'}
        align={'center'}
        p={'20px'}
        borderBottom={'1px solid #eaeff6'}
      >
        <InputGroup
          size="lg"
          bg={'#DBDCFF'}
          rounded={'15px'}
          paddingInline={'10px'}
        >
          <InputLeftElement pointerEvents="none">
            <FaMagnifyingGlass color="#3A3A37" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Find Chat"
            onChange={handleChange}
            value={searchValue}
            _hover={{ border: 'transparent' }}
            focusBorderColor={'transparent'}
            border={'none'}
          />
        </InputGroup>
      </Flex>
    </>
  )
}
