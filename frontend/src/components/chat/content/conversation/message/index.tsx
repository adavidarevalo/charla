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
        bg={isMe ? '#7578ED' : '#EEEEF8'}
        color={isMe ? '#FCFCFE' : '#1C1C1C'}
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
          <Box position={'absolute'} top={'-3px'} left={'-18px'}>
            <TbTriangleInvertedFilled size={30} color="#EEEEF8" />
          </Box>
        )}
        {message.message && <Text fontSize={'21px'}>{message.message}</Text>}
        {message.files.map((file) => (
          <FileView file={file} key={file.fileUrl} />
        ))}
        <Text
          textAlign={'end'}
          fontSize={'15px'}
          color={isMe ? '#FAFAFE' : '#918f90'}
        >
          {moment(message.createdAt).format('HH:mm')}
        </Text>
      </Box>
    </Flex>
  )
}
