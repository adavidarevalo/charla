import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  status: '',
  error: '',
  user: {
    id: '',
    name: '',
    email: '',
    picture: '',
    status: '',
    token: ''
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = ''
      state.error = ''
      state.user = {
        id: '',
        name: '',
        email: '',
        picture: '',
        status: '',
        token: ''
      }
    }
  }
})

export const { logout } = userSlice.actions

export default userSlice.reducer
