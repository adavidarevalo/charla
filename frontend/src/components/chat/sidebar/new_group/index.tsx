import { Box, Flex, IconButton, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Input } from '@chakra-ui/react'
import { MdGroup } from 'react-icons/md'
import MultipleSelect from './multiple_select'
import { useState } from 'react'
import get from 'lodash/get'
import UserServices from './../../../../service/user'
import { AppDispatch, AppState } from '../../../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCheckCircle } from 'react-icons/fa'
import { createGroupConversation } from '../../../../redux/actions/chat.actions';
import { IGroup } from '../../../../types/create_group.type';

export interface SearchResult {
  value: string
  label: string
  picture: string
}

export default function NewGroup() {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: AppState) => state.user)

  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [nameValue, setNameValue] = useState("")

  const handleSearch = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (get(e, 'target.value', '') && e.key === 'Enter') {
      setSearchResults([])
      try {
        const userList = await UserServices.searchUser(
          get(e, 'target.value', ''),
          user.token
        )
        if (userList.length > 0) {
          setSearchResults(
            userList.map((user) => ({
              value: user._id,
              label: user.name,
              picture: user.picture
            }))
          )
        } else {
          setSearchResults([])
        }
      } catch (error) {
        console.log('🚀 ~ handleSearch ~ error:', error)
      }
    } else {
      setSearchResults([])
    }
  }

    const createGroupHandler = async () => {
        const values: IGroup = {
          name: nameValue,
          users: selectedUsers,
          token: user.token
        }
        await dispatch(createGroupConversation(values))
    }

  return (
    <Flex flexDir={'column'} h={'full'} justify={'space-between'}>
      <Box>
        <IconButton
          aria-label="Return to chat"
          icon={<FaRegArrowAltCircleLeft />}
        />
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdGroup color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Group name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </InputGroup>
        <MultipleSelect
          searchResults={searchResults}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />
      </Box>
      <IconButton
        aria-label="Create chat"
        icon={<FaRegCheckCircle />}
        onClick={createGroupHandler}
      />
    </Flex>
  )
}
