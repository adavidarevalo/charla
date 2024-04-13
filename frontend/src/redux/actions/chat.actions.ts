import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import ConversationServices from '../../service/conversation'
import MessageServices from './../../service/message'
import { File } from './../../types/message.type'
import { IGroup } from '../../types/create_group.type'

export const getConversations = createAsyncThunk(
  'conversation/all',
  async (token: string, { rejectWithValue }) => {
    try {
      const conversation = await ConversationServices.getConversations(token)
      return conversation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message)
      }
      throw error
    }
  }
)

export const open_create_conversation = createAsyncThunk(
  'conversation/open_create',
  async (
    values: { receiver_id: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const { token, receiver_id } = values
      const newConversation = await ConversationServices.createConversation(
        receiver_id,
        token
      )
      return newConversation
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message)
      }
      throw error
    }
  }
)

export const getConversationMessages = createAsyncThunk(
  'conversation/messages',
  async (
    values: {
      token: string
      conversation_id: string
    },
    { rejectWithValue }
  ) => {
    try {
      const { token, conversation_id } = values

      const conversations = await MessageServices.getConversation(
        conversation_id,
        token
      )

      return conversations
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message)
      }
      throw error
    }
  }
)

export const sendMessage = createAsyncThunk(
  'conversation/send',
  async (
    values: {
      message: string
      conversationId: string
      token: string
      files: File[]
    },
    { rejectWithValue }
  ) => {
    try {
      const { token, message, conversationId, files } = values

      const newMessage = await MessageServices.sendMessage(
        message,
        conversationId,
        token,
        files
      )

      return newMessage
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message)
      }
      throw error
    }
  }
)

export const createGroupConversation = createAsyncThunk(
  'conversation/create_group',
  async (values: IGroup, { rejectWithValue }) => {
    try {
      const group = await ConversationServices.createGroup(values)

      return group
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message)
      }
      throw error
    }
  }
)
