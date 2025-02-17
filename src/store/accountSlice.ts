import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AccountState, CheckUser, InnerAuthResponse, InnerRegResponse, UserForReg } from '../types/types'
import { UserProfile, checkUser, logoutUser, regUser, saveToken } from '../server/auth'

// const TEST_USER: User = {
//    name: 'user',
//    email: 'user@gmail.com',
//    password: 'user'
// }

// const TEST_USER_1: User = {
//    name: 'user1',
//    email: 'user1@gmail.com',
//    password: 'user1'
// }

// const TEST_USER_2: User = {
//    name: 'user2',
//    email: 'user2@yandex.by',
//    password: 'user2'
// }

// export type TokenAndUserProfile = {
//    access: string,
//    refresh: string,
//    profile: UserProfile
// };

// export type Token = {
//    access: string,
//    refresh: string
// };

const initialState: AccountState = {
   // users: [TEST_USER, TEST_USER_1, TEST_USER_2],
   isAuthorized: false,
   accessToken: '',
   emailInput: '',
   passInput: '',
   confirmPassInput: '',
   nameInput: '',
   phoneInput: '',
   addressInput: '',
   isNotAdmin: true,
   responseCode: 0,
   status: '',
   errorMsg: '',
   logout: false,

   // currentUser: {
   //    name: '',
   //    email: '',
   //    password: ''
   // }
}



export const regUserThunk = createAsyncThunk('auth/regUserThunk', async (user: UserForReg) => {
   const result: InnerRegResponse = await regUser(user)
   return result
})

export const handleAuthThunk = createAsyncThunk('account/handleAuthThunk', async (user: CheckUser) => {
   const serverResponse: InnerAuthResponse = await checkUser(user)
   saveToken(serverResponse.accessToken)
   // const profile = await getProfile()
   // const tokensAndUserProfile = { ...tokens, profile: profile }
   // const tokensAndUserProfile = { ...tokens }
   return serverResponse
})

export const handleLogoutThunk = createAsyncThunk('account/handleLogoutThunk', async () => {
   const serverResponse: InnerAuthResponse = await logoutUser()
   return serverResponse
})

// export const getProfileThunk = createAsyncThunk('auth/getProfileThunk', async () => {
//    // const accessToken = localStorage.getItem('accessToken')
//    const profile = await getProfile()
//    return profile
// })

export const accountSlice = createSlice({
   name: 'account',
   initialState,
   reducers: {
      setResponseCode: (state, action: PayloadAction<number>) => {
         return { ...state, responseCode: action.payload }
      },
      setIsAuth: (state, action: PayloadAction<boolean>) => {
         return { ...state, isAuthorized: action.payload }
      },
      setEmail: (state, action: PayloadAction<string>) => {
         return { ...state, emailInput: action.payload }
      },
      setPassword: (state, action: PayloadAction<string>) => {
         return { ...state, passInput: action.payload }
      },
      setConfirmPassword: (state, action: PayloadAction<string>) => {
         return { ...state, confirmPassInput: action.payload }
      },
      setName: (state, action: PayloadAction<string>) => {
         return { ...state, nameInput: action.payload }
      },
      setPhoneAcc: (state, action: PayloadAction<string>) => {
         return { ...state, phoneInput: action.payload }
      },
      setAddress: (state, action: PayloadAction<string>) => {
         return { ...state, addressInput: action.payload }
      },
      setErrorMsg: (state, action: PayloadAction<string>) => {
         return { ...state, errorMsg: action.payload }
      },
      // setCurrentUser: (state, action: PayloadAction<User>) => {
      //    localStorage.setItem('isAuthorized', 'true')
      //    localStorage.setItem('currentUser', JSON.stringify(action.payload))

      //    return { ...state, currentUser: action.payload, isAuthorized: true }
      // },
   },
   extraReducers(builder) {
      builder
         .addCase(regUserThunk.fulfilled, (state, action: PayloadAction<InnerRegResponse>) => {
            // return { ...state, post: action.payload }
            // return { ...state, isAuthorized: false, status: 'fulfilled' }
            // ! code 200/201
            if (action.payload.resCode === 201) {
               const { resCode, isAuth, isNotAdmin } = action.payload
               return { ...state, responseCode: resCode, isAuthorized: isAuth, isNotAdmin: isNotAdmin, status: 'fulfilled' }
            }
            else {
               const { resCode, isAuth, isNotAdmin, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, isAuthorized: isAuth, isNotAdmin: isNotAdmin, status: 'fulfilled' }
            }
         })
         .addCase(handleAuthThunk.fulfilled, (state, action: PayloadAction<InnerAuthResponse>) => {
            // const { access, refresh, profile } = action.payload
            // const { resCode, refresh, profile } = action.payload
            if (action.payload.resCode === 200) {
               const { resCode, isAuth, isNotAdmin, accessToken } = action.payload
               return { ...state, logout: false, responseCode: resCode, accessToken: accessToken, isAuthorized: isAuth, isNotAdmin: isNotAdmin, status: 'fulfilled' }
            }
            else {
               const { resCode, isAuth, isNotAdmin, accessToken, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, accessToken: accessToken, isAuthorized: isAuth, isNotAdmin: isNotAdmin, status: 'fulfilled' }
            }
         })
         .addCase(handleLogoutThunk.fulfilled, (state, action: PayloadAction<InnerAuthResponse>) => {
            // const { access, refresh, profile } = action.payload
            // const { resCode, refresh, profile } = action.payload
            if (action.payload.resCode === 200) {
               const { resCode, isAuth, isNotAdmin, accessToken } = action.payload
               // { ...state, }
               return { ...state, logout: true, responseCode: resCode, accessToken: accessToken, isAuthorized: isAuth, isNotAdmin: isNotAdmin, status: 'fulfilled' }
            }
            else {
               const { resCode, isAuth, isNotAdmin, accessToken, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, accessToken: accessToken, isAuthorized: isAuth, isNotAdmin: isNotAdmin, status: 'fulfilled' }
            }
         })
      // .addCase(getProfileThunk.fulfilled, (state, action: PayloadAction<UserProfile>) => {
      //    return { ...state, userEmail: '', userPassword: '', userUsername: action.payload.username }
      // })
   },
})

// Action creators are generated for each case reducer function
export const { setResponseCode, setErrorMsg, setIsAuth, setEmail, setPassword, setName, setPhoneAcc, setAddress } = accountSlice.actions

export const accountReducer = accountSlice.reducer