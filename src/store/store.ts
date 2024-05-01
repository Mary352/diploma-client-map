import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'
import { postersReducer } from './posterSlice'
import { accountReducer } from './accountSlice'
import { userReducer } from './userSlice'
import { commentReducer } from './commentSlice'

export const store = configureStore({
   reducer: {
      posters: postersReducer,
      account: accountReducer,
      user: userReducer,
      comments: commentReducer,
   }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector