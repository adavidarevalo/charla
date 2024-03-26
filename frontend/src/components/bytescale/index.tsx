import { UploadButton } from '@bytescale/upload-widget-react'
import { bytescaleSecret } from '../../utils/variables'
import { Avatar, Box, Button, Flex, FormLabel } from '@chakra-ui/react'
import { FormikErrors } from 'formik'
import { RegisterValues } from '../sign_up/form'
import { AiOutlineClose } from 'react-icons/ai'

const options = {
  apiKey: bytescaleSecret,
  maxFileCount: 1
}

interface BytescaleProps {
  avatarUrl: string
  avatarName: string
  setFieldValue: (
    field: string,
    value: string,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<RegisterValues>>
}

const Bytescale = ({
  avatarUrl,
  avatarName,
  setFieldValue
}: BytescaleProps) => {
  return (
    <Flex w={'full'} direction={'column'}>
      <FormLabel>Picture (Optional)</FormLabel>
      <UploadButton
        options={options}
        onComplete={(files) => {
          if (files.length > 0) {
            const imageUrl = files[0].fileUrl
            setFieldValue('picture', imageUrl)
          }
        }}
      >
        {({ onClick }) => (
          <Box position={'relative'} maxW={'110px'}>
            {avatarUrl && (
              <Button
                position={'absolute'}
                rounded={'full'}
                zIndex={'100'}
                h={'37px'}
                w={'30px'}
                p={'0px'}
                right={'0px'}
                onClick={() => setFieldValue('picture', '')}
              >
                <AiOutlineClose />
              </Button>
            )}
            <Avatar
              size="xl"
              onClick={onClick}
              cursor={'pointer'}
              name={avatarUrl && avatarName}
              bg={'purple.800'}
              src={avatarUrl}
            />
          </Box>
        )}
      </UploadButton>
    </Flex>
  )
}

export default Bytescale
