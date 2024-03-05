import { createAsyncThunk } from '@reduxjs/toolkit'
import UserServices from './../../service/user'
import { RegisterValues } from '../../components/sign_up/form'
import get from 'lodash/get'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    userValue: Omit<RegisterValues, 'repeat_password'>,
    { rejectWithValue }
  ) => {
    try {
      const data = await UserServices.registerUser(userValue)

      return data
    } catch (error) {
      return rejectWithValue(
        get(error, 'response.data.message', 'An error occurred.')
      )
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (values: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await UserServices.loginUser(values)
      return data
    } catch (error) {
      return rejectWithValue(
        get(error, 'response.data.message', 'An error occurred.')
      )
    }
  }
)
