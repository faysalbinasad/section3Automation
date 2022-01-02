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
    logIn(state, action) {
      state.status = 'logged_in';
    },
    logOut(state, action) {
      state.status = 'not_logged_in';
    },
  }
})

export const { logIn, logOut } = currentUserSlice.actions

export default currentUserSlice.reducer
