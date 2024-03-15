import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthServices from '../../service/auth'
import { RegisterValues } from '../../components/sign_up/form'
import get from 'lodash/get'

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    userValue: Omit<RegisterValues, 'repeat_password'>,
    { rejectWithValue }
  ) => {
    try {
      const data = await AuthServices.registerUser(userValue)

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
      const data = await AuthServices.loginUser(values)
      return data
    } catch (error) {
      return rejectWithValue(
        get(error, 'response.data.message', 'An error occurred.')
      )
    }
  }
)
