import { createSlice } from '@reduxjs/toolkit'

export const NOT_LOGGED_IN_STATUS = 'not_logged_in';
export const LOGGED_IN_STATUS = 'logged_in';

const initialState = {
  status: 'not_logged_in',
}

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    loggedIn(state, action) {
      state.status = 'logged_in'
    },
    loggedOut(state, action) {
      state.status = 'not_logged_in'
    },
  }
})

export const { loggedIn, loggedOut } = currentUserSlice.actions

export default currentUserSlice.reducer
