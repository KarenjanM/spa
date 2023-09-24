import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define a type for the slice state
interface AuthState {
  refreshToken: string,
  userToken: string,
  loggedIn: boolean,
  invalid: boolean,
  refreshMutation: () => any
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
  refreshMutation: null
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
      return state
    },
    setRefreshMut: (state, action)=>{
      state.refreshMutation = action.payload
    },
    setInvalid: (state, action: PayloadAction<boolean>) => {
      state.invalid = action.payload
      return state
    },
    login: (state) => {
      state.loggedIn = true
      return state
    },
    logout: (state) => {
      state.loggedIn = false
      state.userToken = ""
      state.refreshToken = ""
      state.invalid = false
      return state
    }
  }
})

export default authSlice.reducer

export const {
  setTokens,
  setInvalid, 
  setRefreshMut,
  login,
  logout
} = authSlice.actions