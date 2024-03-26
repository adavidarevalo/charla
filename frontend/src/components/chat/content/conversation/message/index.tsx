import { Box, Flex, Text } from '@chakra-ui/react'
import moment from 'moment'
import MessageType from "../../../../../types/message.type"
import { TbTriangleInvertedFilled } from 'react-icons/tb'
import 'react-photo-view/dist/react-photo-view.css'
import FileView from './file_view'

interface MessageProps {
  isMe: boolean
  message: MessageType
}

export default function Message({ message, isMe }: MessageProps) {  
  return (
    <Flex justify={isMe ? 'end' : 'start'}>
      <Box
        bg={isMe ? 'purple.600' : 'purple.200'}
        color={isMe ? 'white' : 'black.900'}
        w={'fit-content'}
        maxW={'40%'}
        minW={'200px'}
        p={'17px'}
        marginBlock={'10px'}
        rounded={'20px'}
        fontSize={'20px'}
        position={'relative'}
      >
        {isMe === false && (
          <Box
            position={'absolute'}
            top={'-4px'}
            left={'-11px'}
            color="purple.200"
          >
            <TbTriangleInvertedFilled size={30} />
          </Box>
        )}
        {message.message && <Text fontSize={'21px'} fontWeight={400}>{message.message}</Text>}
        {message.files.map((file) => (
          <FileView file={file} key={file.fileUrl} />
        ))}
        <Text
          textAlign={'end'}
          fontSize={'15px'}
          color={isMe ? 'white' : 'black.500'}
        >
          {moment(message.createdAt).format('HH:mm')}
        </Text>
      </Box>
    </Flex>
  )
}
