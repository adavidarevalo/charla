import { createSlice } from '@reduxjs/toolkit'
import { loginUser, registerUser } from '../actions/user.actions'

export interface IInitialState {
  status: string
  message: string
  user: {
    _id: string
    name: string
    email: string
    picture: string
    status: string
    token: string
    refreshToken: string
  }
}

export const initialState: IInitialState = {
  status: '',
  message: '',
  user: {
    _id: '',
    name: '',
    email: '',
    picture: '',
    status: '',
    token: '',
    refreshToken: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state = initialState
      state.status = ''
      state.message = ''
    }
    // changeStatus: (state, actions) => {
    //   state.status = actions.payload
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.message = ''
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message
        state.user = action.payload.user
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.message = `${action.payload}`
        state.user = initialState['user']
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload.message
        state.user = action.payload.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.message = `${action.payload}`
        state.user = initialState['user']
      })
  }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
