import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
interface AuthState {
  refreshToken: string,
  userToken: string,
  isVerified: boolean,
  invalid: boolean
}
interface TokenState {
  refreshToken: string,
  userToken: string,
}
const initialState : AuthState = {
  refreshToken: "", 
  userToken: "",
  isVerified: false,
  invalid: false, 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenState>) => {
      if(action.payload.userToken){
        state.userToken = action.payload.userToken
        state.refreshToken = action.payload.refreshToken
        state.invalid = false
      }
      else
        state.invalid = true
    },
    setInvalid: (state, action: PayloadAction<boolean>) => {
      state.invalid = action.payload
    },
    verify: (state, action: PayloadAction<boolean>) => {
      state.isVerified = action.payload
    }
  },
})

export default authSlice.reducer

export const {
  setTokens,
  setInvalid, 
  verify
} = authSlice.actions