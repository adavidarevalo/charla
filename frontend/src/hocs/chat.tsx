import { useSocket } from '../context/socket.context'
import React, { ReactNode, useEffect } from 'react'
import { AppDispatch, AppState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../redux/actions/chat.actions'
import {
  addConversationTyping,
  removeConversationTyping,
  setOnlineUsers,
  updateMessages
} from './../redux/slices/chat.slice'

export const ChatHoc: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { socket } = useSocket()
  const { user } = useSelector((state: AppState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token))
    }
  }, [user?.token, dispatch])

  useEffect(() => {
    socket?.emit('join', user._id)
    socket?.on('get online users', (users) => {
      dispatch(setOnlineUsers(users))
    })
  }, [socket])

  useEffect(() => {
    socket?.on('receive message', (message) => {
      dispatch(updateMessages(message))
    })
    socket?.on('typing', (conversationId) => {
      dispatch(addConversationTyping(conversationId))
    })
    socket?.on('stop typing', (conversationId) => {
      dispatch(removeConversationTyping(conversationId))
    })
  }, [socket])

  return children
}
