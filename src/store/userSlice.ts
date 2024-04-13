import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InnerCreatePosterResponse, InnerOneUserResponse, InnerUsersResponse, UserSliceState, UserToUpdate } from '../types/types'
import { getOneUser, getUsers, getUsersFiltered, updateUser } from '../server/getUsers'

const initialState: UserSliceState = {
   // users: [TEST_USER, TEST_USER_1, TEST_USER_2],
   // isAuthorized: false,
   users: [],
   hiddenData: false,
   user: null,
   responseCode: 0,
   status: '',
   errorMsg: '',
   // accessToken: '',
   emailInput: '',
   passInput: '',
   confirmPassInput: '',
   nameInput: '',
   phoneInput: '',
   addressInput: '',
   roleInput: '',
   // isNotAdmin: true,
   // currentUser: {
   //    name: '',
   //    email: '',
   //    password: ''
   // }
}

export const getUsersThunk = createAsyncThunk('posters/getUsersThunk', async () => {
   const serverUsers: InnerUsersResponse = await getUsers();
   return serverUsers
})

export const getUsersFilteredThunk = createAsyncThunk('posters/getUsersFilteredThunk', async (userRole: string) => {
   const serverUsers: InnerUsersResponse = await getUsersFiltered(userRole);
   return serverUsers
})

export const getOneUserThunk = createAsyncThunk('auth/getOneUserThunk', async (id: string) => {
   // const accessToken = localStorage.getItem('accessToken')
   const result: InnerOneUserResponse = await getOneUser(id)
   return result
})

export const updateUserThunk = createAsyncThunk('posters/updateUserThunk', async (userNewData: UserToUpdate) => {
   const result: InnerOneUserResponse = await updateUser(userNewData)
   return result
})

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setResponseCode: (state, action: PayloadAction<number>) => {
         return { ...state, responseCode: action.payload }
      },
      // setEmail: (state, action: PayloadAction<string>) => {
      //    return { ...state, emailInput: action.payload }
      // },
      // setPassword: (state, action: PayloadAction<string>) => {
      //    return { ...state, passInput: action.payload }
      // },
      // setConfirmPassword: (state, action: PayloadAction<string>) => {
      //    return { ...state, confirmPassInput: action.payload }
      // },
      clearInputs: (state) => {
         return { ...state, nameInput: '', phoneInput: '', addressInput: '', roleInput: '' }
      },
      setName: (state, action: PayloadAction<string>) => {
         return { ...state, nameInput: action.payload }
      },
      setHiddenData: (state, action: PayloadAction<boolean>) => {
         return { ...state, hiddenData: action.payload }
      },
      setPhone: (state, action: PayloadAction<string>) => {
         return { ...state, phoneInput: action.payload }
      },
      setAddress: (state, action: PayloadAction<string>) => {
         return { ...state, addressInput: action.payload }
      },
      setRole: (state, action: PayloadAction<string>) => {
         return { ...state, roleInput: action.payload }
      },
   },
   extraReducers(builder) {
      builder
         .addCase(getUsersThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getUsersThunk.fulfilled, (state, action: PayloadAction<InnerUsersResponse>) => {
            if (action.payload.resCode === 200) {
               return { ...state, users: action.payload.users, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getUsersThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getOneUserThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getOneUserThunk.fulfilled, (state, action: PayloadAction<InnerOneUserResponse>) => {

            const { user } = action.payload;
            if (action.payload.resCode === 200) {
               return { ...state, user: user, nameInput: user?.name || '', phoneInput: user?.phone || '', addressInput: user?.address || '', roleInput: user?.role || '', responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getOneUserThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getUsersFilteredThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getUsersFilteredThunk.fulfilled, (state, action: PayloadAction<InnerUsersResponse>) => {
            if (action.payload.resCode === 200) {
               return { ...state, users: action.payload.users, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getUsersFilteredThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(updateUserThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<InnerOneUserResponse>) => {

            if (action.payload.resCode === 200) {
               const { resCode, accountInfo } = action.payload
               if (action.payload.user !== null) {

                  return { ...state, user: action.payload.user, responseCode: resCode, isAuthorized: accountInfo.isAuth, isNotAdmin: accountInfo.isNotAdmin, status: 'fulfilled' }
               }
               else {
                  return { ...state, responseCode: resCode, isAuthorized: accountInfo.isAuth, isNotAdmin: accountInfo.isNotAdmin, status: 'fulfilled' }

               }
            }
            else {
               const { resCode, err, accountInfo } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, isAuthorized: accountInfo.isAuth, isNotAdmin: accountInfo.isNotAdmin, status: 'fulfilled' }
            }
         })
         .addCase(updateUserThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
      // .addCase(getOneUserThunk.fulfilled, (state, action: PayloadAction<InnerOneUserResponse>) => {
      //    return { ...state, userUsername: action.payload.username }
      // })
   },
})

// Action creators are generated for each case reducer function
export const { clearInputs, setResponseCode, setName, setPhone, setAddress, setHiddenData, setRole } = userSlice.actions

export const userReducer = userSlice.reducer