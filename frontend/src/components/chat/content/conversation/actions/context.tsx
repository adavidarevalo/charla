import * as React from 'react'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState, AppDispatch } from '../../../../../redux/store';
import { sendMessage } from '../../../../../redux/actions/chat.actions';
import {File} from "../../../../../types/message.type" 

const initialState = {
  messageValue: '',
  setMessageValue: () => {},
  messageTextRef: { current: null },
  isLoading: false,
  setIsLoading: () => {},
  handleSendMessage: async () => {},
  setFile: () => {},
  file: [],
  isShowEmojiPicker: false,
  setIsShowEmojiPicker: () => {}
}

interface IContext {
  messageTextRef: React.RefObject<HTMLInputElement>
  setMessageValue: React.Dispatch<React.SetStateAction<string>>
  messageValue: string
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  handleSendMessage: () => Promise<void>
  setFile: React.Dispatch<React.SetStateAction<File[]>>
  file: File[]
  isShowEmojiPicker: boolean
  setIsShowEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>
}

const SendMessageContext = React.createContext<IContext>(initialState)

const SendMessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [messageValue, setMessageValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File[]>([])
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false)
  const messageTextRef = useRef<HTMLInputElement>(null)

  const { user } = useSelector((state: AppState) => state.user)
  const { activeConversation } = useSelector((state: AppState) => state.chat)
  const dispatch = useDispatch<AppDispatch>()

    const handleSendMessage = async () => {
      setIsLoading(true)
      const value = {
        message: messageValue,
        conversationId: activeConversation?._id ?? '',
        token: user?.token || '',
        files: file
      }
      await dispatch(sendMessage(value))
      setMessageValue('')
      setFile([])
      setIsLoading(false)
    }

  return (
    <SendMessageContext.Provider
      value={{
        messageTextRef,
        setMessageValue,
        messageValue,
        isLoading,
        setIsLoading,
        handleSendMessage,
        setFile,
        file,
        isShowEmojiPicker,
        setIsShowEmojiPicker
      }}
    >
      {children}
    </SendMessageContext.Provider>
  )
}

export const useSendMessageContext = () => React.useContext(SendMessageContext)

export default SendMessageProvider
