import { Box, Flex, Text, Image } from '@chakra-ui/react'
import {File} from "./../../../../../types/message.type"
import { MdDownloading } from 'react-icons/md'
import { bytesToMB } from '../utils'
import { FileIcon } from 'react-file-icon'
import truncate from 'lodash.truncate'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'

interface FileViewProp {
  file: File
}

export default function FileView({file}: FileViewProp) {
  if (!file) return null
  const { fileType, fileName, fileSize, fileUrl } = file

  const extension = fileType.split('/')[1]

  const isImage = fileType.split('/')[0] === "image"
  
  return (
    <Flex mt={'5px'} justify={'space-between'}>
      {isImage ? (
        <PhotoProvider>
          <PhotoView src={fileUrl}>
            <Image src={fileUrl} alt={fileName} rounded={"10px"} h={"500px"}/>
          </PhotoView>
        </PhotoProvider>
      ) : (
        <Flex>
          <Flex w={'80px'}>
            <FileIcon extension={extension} />
          </Flex>
          <Box ml={'10px'}>
            <Text as={'b'} fontSize={'18px'}>
              {truncate(fileName, { length: 200 })}
            </Text>
            <Text fontSize={'15px'}>{bytesToMB(fileSize)} MB</Text>
          </Box>
        </Flex>
      )}
      {isImage === false && (
        <a href={fileUrl} target="_blank" download rel="noreferrer">
          <MdDownloading size={'40px'} />
        </a>
      )}
    </Flex>
  )
}
