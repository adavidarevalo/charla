import { Button } from "@chakra-ui/react"
import { bytescaleSecret } from "../../../../../../utils/variables"
import { UploadButton } from '@bytescale/upload-widget-react'
import { useSendMessageContext } from "../context"
import { GoPaperclip } from "react-icons/go"

const options = {
  apiKey: bytescaleSecret,
  maxFileCount: 1
}

export default function UploadBtn() {
  const { setFile } = useSendMessageContext()

  return (
    <UploadButton
      options={options}
      onComplete={(files) => {
        if (files.length > 0) {
          const fileUrl = files[0].fileUrl
          const fileName = files[0].originalFile.file.name
          const fileSize = files[0].originalFile.file.size
          const fileType = files[0].originalFile.file.type

          setFile([
            {
              fileUrl,
              fileName,
              fileSize,
              fileType
            }
          ])
        }
      }}
    >
      {({ onClick }) => (
        <Button
          onClick={onClick}
          color={'purple.800'}
          variant="outline"
          _hover={{ bg: 'none' }}
          border={'transparent'}
        >
          <GoPaperclip size={'30px'} />
        </Button>
      )}
    </UploadButton>
  )
}
