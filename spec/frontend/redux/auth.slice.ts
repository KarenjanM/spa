import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
interface AuthState {
  refreshToken: string,
  userToken: string,
  isVerified: boolean
}
interface TokenState {
  refreshToken: string,
  userToken: string,
}
const initialState : AuthState = {
  refreshToken: "", 
  userToken: "",
  isVerified: false, 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenState>) => {
        state.userToken = action.payload.userToken
        state.refreshToken = action.payload.refreshToken
    },
    verify: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload
    }
  },
})

export default authSlice.reducer

export const {
  setTokens,
  verify
} = authSlice.actions