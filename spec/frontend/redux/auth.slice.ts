import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
interface AuthState {
  refreshToken: string,
  userToken: string,
  loggedIn: boolean,
  invalid: boolean
}
interface TokenState {
  refreshToken: string,
  userToken: string,
}
const initialState : AuthState = {
  refreshToken: "", 
  userToken: "",
  loggedIn: false,
  invalid: false, 
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<TokenState>) => {
      if(action.payload.userToken){
        console.log("setting tokens");
        state.userToken = action.payload.userToken
        state.refreshToken = action.payload.refreshToken
        state.invalid = false
      }
      else
        state.invalid = true
    },
    setTokensNull: (state) => {
        state.userToken = ""
        state.refreshToken = ""
    },
    setInvalid: (state, action: PayloadAction<boolean>) => {
      state.invalid = action.payload
    },
    login: (state) => {
      state.loggedIn = true
    },
    logout: (state) => {
      state.loggedIn = false
      state.userToken = ""
      state.refreshToken = ""
    }
  },
})

export default authSlice.reducer

export const {
  setTokens,
  setTokensNull,
  setInvalid, 
  login,
  logout
} = authSlice.actions