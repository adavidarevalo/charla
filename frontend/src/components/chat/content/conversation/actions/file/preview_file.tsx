import { Box, Flex, Text } from '@chakra-ui/react'
import { FileIcon } from 'react-file-icon'
import { useSendMessageContext } from '../context'
import { bytesToMB } from '../../utils'
import { MdOutlineDelete } from 'react-icons/md'

export default function PreviewFile() {
  const { file, setFile } = useSendMessageContext()
  if (file.length === 0) return <></>
  const { fileName, fileType, fileSize: fileBytes } = file[0]
  const fileSize = `${fileType} . ${bytesToMB(fileBytes)}MB`

  return (
    <Flex
      maxH={'100px'}
      top={'-100px'}
      p={'10px'}
      position={'absolute'}
      w={'80%'}
      bg={'white'}
      roundedTopEnd={'20px'}
      roundedTopStart={'20px'}
      justify={'space-between'}
    >
      <Flex>
        <Flex w={'100px'}>
          <FileIcon extension={fileType.split("/")[1]} />
        </Flex>
        <Box>
          <Text as={'b'}>{fileName}</Text>
          <Text>{fileSize}</Text>
        </Box>
      </Flex>
      <Box onClick={() => setFile([])} cursor={'pointer'}>
        <MdOutlineDelete size={'30px'} />
      </Box>
    </Flex>
  )
}
