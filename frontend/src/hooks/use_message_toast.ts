import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react' // Asumiendo que estás usando Chakra UI
import { AppState } from '../redux/store'

const useMessageToast = (): void => {
  const { message, status } = useSelector((state: AppState) => state.user)
  const toast = useToast()

  useEffect(() => {
    if (message && status !== 'loading') {
      const isError = status === 'failed'
      toast({
        title: isError ? 'Error' : 'Success',
        description: message,
        status: isError ? 'error' : 'success',
        duration: 9000,
        isClosable: true
      })
    }
  }, [message, status, toast])
}

export default useMessageToast
