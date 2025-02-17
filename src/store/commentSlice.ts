import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { CommentState, CommentToAdd, CommentToUpd, FilterForPosters, InnerCategoriesResponse, InnerCommentsResponse, InnerCreatePosterResponse, InnerDeleteReasonsResponse, InnerOnePosterResponse, InnerPostersResponse, InnerResponse, InnerStatusesResponse, PosterServer, PosterState, PosterToCreate, PosterToCreateWithCoords, PosterToUpdate, SearchBooksThunkParams } from '../types/types'
import dayjs from 'dayjs'
import { addComment, addComplaint, approveComment, deleteComment, getAllComments, getCommentsForPoster, updateComment } from '../server/getComments'

const initialState: CommentState = {
   comments: [],
   responseCode: 0,
   errorMsg: '',
   status: ''
}

export const getCommentsForPosterThunk = createAsyncThunk('posters/getCommentsForPosterThunk', async (posterId: string) => {
   const serverPosterComments: InnerCommentsResponse = await getCommentsForPoster(posterId);
   return serverPosterComments
})

export const getAllCommentsThunk = createAsyncThunk('posters/getAllCommentsThunk', async () => {
   const serverPosterComments: InnerCommentsResponse = await getAllComments();
   return serverPosterComments
})

// export const getPosterByIdThunk = createAsyncThunk('posters/getPosterByIdThunk', async (id: string) => {
//    const serverPoster: InnerOnePosterResponse = await getPosterById(id);
//    return serverPoster
// })

export const addCommentThunk = createAsyncThunk('posters/addCommentThunk', async (comment: CommentToAdd) => {
   const result: InnerCommentsResponse = await addComment(comment)
   return result
})

export const addComplaintThunk = createAsyncThunk('posters/addComplaintThunk', async (commentId: number) => {
   const result: InnerCommentsResponse = await addComplaint(commentId)
   return result
})

export const deleteCommentThunk = createAsyncThunk('posters/deleteCommentThunk', async (commentId: number) => {
   const result: InnerCommentsResponse = await deleteComment(commentId)
   return result
})

export const updCommentThunk = createAsyncThunk('posters/updCommentThunk', async (comment: CommentToUpd) => {
   const result: InnerCommentsResponse = await updateComment(comment)
   return result
})

export const approveCommentThunk = createAsyncThunk('posters/approveCommentThunk', async (commentId: number) => {
   const result: InnerCommentsResponse = await approveComment(commentId)
   return result
})

export const commentsSlice = createSlice({
   name: 'comments',
   initialState,
   reducers: {
      // setResponseCode: (state, action: PayloadAction<number>) => {
      //    return { ...state, responseCode: action.payload }
      // },
      // setItem: (state, action: PayloadAction<string>) => {
      //    return { ...state, itemInput: action.payload }
      // },
      // setBreed: (state, action: PayloadAction<string | null>) => {
      //    return { ...state, breedInput: action.payload }
      // },
      // setIsPet: (state, action: PayloadAction<boolean>) => {
      //    return { ...state, isPetInput: action.payload }
      // },
      // setObjectCategory: (state, action: PayloadAction<string>) => {
      //    return { ...state, objectCategoryInput: action.payload }
      // },
      // setDescription: (state, action: PayloadAction<string>) => {
      //    return { ...state, descriptionInput: action.payload }
      // },
      // setItemStatus: (state, action: PayloadAction<string>) => {
      //    return { ...state, itemStatusInput: action.payload }
      // },
      // setDateOfAction: (state, action: PayloadAction<dayjs.Dayjs | null>) => {
      //    return { ...state, dateOfActionInput: action.payload }
      // },
      // setPhotoFile: (state, action: PayloadAction<File | null>) => {
      //    return { ...state, photoFileInput: action.payload }
      // },
      // setPhone: (state, action: PayloadAction<string>) => {
      //    return { ...state, phoneInput: action.payload }
      // },
      // setAddress: (state, action: PayloadAction<string>) => {
      //    return { ...state, addressInput: action.payload }
      // },
      // // setSearchInput: (state, action: PayloadAction<string>) => {
      // //    return { ...state, searchInputValue: action.payload }
      // // },
      // // setPage: (state, action: PayloadAction<number>) => {
      // //    return { ...state, page: action.payload }
      // // },
   },
   extraReducers(builder) {
      builder
         .addCase(getCommentsForPosterThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getCommentsForPosterThunk.fulfilled, (state, action: PayloadAction<InnerCommentsResponse>) => {

            if (action.payload.resCode === 200) {
               return { ...state, comments: action.payload.comments, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getCommentsForPosterThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getAllCommentsThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getAllCommentsThunk.fulfilled, (state, action: PayloadAction<InnerCommentsResponse>) => {

            if (action.payload.resCode === 200) {
               return { ...state, comments: action.payload.comments, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getAllCommentsThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(addCommentThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(addCommentThunk.fulfilled, (state, action: PayloadAction<InnerCommentsResponse>) => {
            // return { ...state, post: action.payload }
            // return { ...state, isAuthorized: false, status: 'fulfilled' }
            // ! code 200/201
            if (action.payload.resCode === 201) {
               const { resCode, comments } = action.payload
               return { ...state, comments: comments, responseCode: resCode, status: 'fulfilled' }
            }
            else {
               const { resCode, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, status: 'fulfilled' }
            }
         })
         .addCase(addCommentThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(addComplaintThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(addComplaintThunk.fulfilled, (state, action: PayloadAction<InnerCommentsResponse>) => {

            if (action.payload.resCode === 201) {
               const { resCode, comments } = action.payload
               return { ...state, comments: comments, responseCode: resCode, status: 'fulfilled' }
            }
            else {
               const { resCode, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, status: 'fulfilled' }
            }
         })
         .addCase(addComplaintThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(deleteCommentThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(deleteCommentThunk.fulfilled, (state, action: PayloadAction<InnerCommentsResponse>) => {
            // return { ...state, post: action.payload }
            // return { ...state, isAuthorized: false, status: 'fulfilled' }

            if (action.payload.resCode === 201) {
               const { resCode, comments } = action.payload
               return { ...state, comments: comments, responseCode: resCode, status: 'fulfilled' }
            }
            else {
               const { resCode, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, status: 'fulfilled' }
            }
         })
         .addCase(deleteCommentThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(updCommentThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(updCommentThunk.fulfilled, (state, action: PayloadAction<InnerCommentsResponse>) => {
            // ! code 200/201
            if (action.payload.resCode === 201) {
               const { resCode, comments } = action.payload
               return { ...state, comments: comments, responseCode: resCode, status: 'fulfilled' }
            }
            else {
               const { resCode, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, status: 'fulfilled' }
            }
         })
         .addCase(updCommentThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(approveCommentThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(approveCommentThunk.fulfilled, (state, action: PayloadAction<InnerCommentsResponse>) => {
            // ! code 200/201
            if (action.payload.resCode === 201) {
               const { resCode, comments } = action.payload
               return { ...state, comments: comments, responseCode: resCode, status: 'fulfilled' }
            }
            else {
               const { resCode, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, status: 'fulfilled' }
            }
         })
         .addCase(approveCommentThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })

      // .addCase(getPostersFilteredThunk.pending, (state) => {
      //    return { ...state, status: 'loading' }
      // })
      // .addCase(getPostersFilteredThunk.fulfilled, (state, action: PayloadAction<InnerPostersResponse>) => {
      //    if (action.payload.resCode === 200) {
      //       return { ...state, posters: action.payload.posters, responseCode: 200, status: 'fulfilled' }
      //    }
      //    else {
      //       return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
      //    }
      // })
      // .addCase(getPostersFilteredThunk.rejected, (state) => {
      //    return { ...state, status: 'rejected' }
      // })

   },
})

// Action creators are generated for each case reducer function
export const { } = commentsSlice.actions

export const commentReducer = commentsSlice.reducer