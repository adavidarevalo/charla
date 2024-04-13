import Select from 'react-select'
import { SearchResult } from '.'
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface MultipleSelectProps {
  handleSearch: (e: React.KeyboardEvent<HTMLDivElement>) => Promise<void>
  searchResults: SearchResult[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[]>>
}

export default function MultipleSelect({
  setSelectedUsers,
  searchResults,
  handleSearch
}: MultipleSelectProps) {
  console.log("🚀 ~ searchResults:", searchResults)
  return (
    <Box>
      <Select
        options={searchResults}
        onChange={(e) => setSelectedUsers(e.map(({ value }) => value))}
        onKeyDown={(e) => handleSearch(e)}
        placeholder="Search, select users"
        isMulti
        formatOptionLabel={(user) => (
          <Flex align={'center'}>
            <Avatar src={user.picture} name={user.label} />
            <Text fontWeight={600} ml={'20px'}>
              {user.label}
            </Text>
          </Flex>
        )}
      />
    </Box>
  )
}
