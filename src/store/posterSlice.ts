import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { FilterForPosters, InnerCategoriesResponse, InnerCreatePosterResponse, InnerDeleteReasonsResponse, InnerNotificationsResponse, InnerOnePosterResponse, InnerPostersResponse, InnerStatsResponse, InnerStatusesResponse, PosterServer, PosterState, PosterToCreate, PosterToCreateWithCoords, PosterToUpdate, SearchBooksThunkParams } from '../types/types'
import { createPoster, getItemCategories, getNotifications, getPosterById, getPosterDeleteReasons, getPosterStatuses, getPosters, getPostersFiltered, getStatistics, getUserPosters, setCommentsRead, updatePoster } from '../server/getPosters'
import dayjs from 'dayjs'

const initialState: PosterState = {
   posters: [],
   postersUser: [],
   poster: null,
   responseCode: 0,
   errorMsg: '',
   isAuth: 'no_info',
   isNotAdmin: 'no_info',
   itemInput: '',
   breedInput: null,
   isPetInput: false, //!
   objectCategoryInput: '', //!
   descriptionInput: '',
   itemStatusInput: '', //!
   dateOfActionInput: null,
   photoFileInput: null,
   addressInput: '',
   phoneInput: '',
   // posterCategories: [],
   petCategories: [],
   itemCategories: [],
   posterStatuses: [],
   posterDeleteReasons: [],
   rejectReason: '',
   deleteReason: '',
   rejectUpdMessage: '',
   posterAuthor: null,
   // notificationsInfo: NotificationsInfo[],
   notificationsInfo: [],
   foundStatistics: 0,
   // total: 0,
   // page: 1,
   // pageQty: 1,
   // // booksPerPage: 10
   status: ''
}

export const getPostersThunk = createAsyncThunk('posters/getPostersThunk', async () => {
   const serverPosters: InnerPostersResponse = await getPosters();
   // const serverPosters = await getPosters();
   // console.log("🚀 ~ file: bookSlice.ts:38 ~ getNewBooksThunk ~ serverPosters:", serverPosters)
   return serverPosters
})

export const getStatisticsThunk = createAsyncThunk('posters/getStatisticsThunk', async () => {
   const serverStatisticsInfo: InnerStatsResponse = await getStatistics();
   return serverStatisticsInfo
})

export const getPostersFilteredThunk = createAsyncThunk('posters/getPostersFilteredThunk', async (filterForPosters: FilterForPosters) => {
   const serverPosters: InnerPostersResponse = await getPostersFiltered(filterForPosters);
   // const serverPosters = await getPosters();
   // console.log("🚀 ~ file: bookSlice.ts:38 ~ getNewBooksThunk ~ serverPosters:", serverPosters)
   return serverPosters
})

export const getUserPostersThunk = createAsyncThunk('posters/getUserPostersThunk', async () => {
   const serverPosters: InnerPostersResponse = await getUserPosters();
   // const serverPosters = await getPosters();
   // console.log("🚀 ~ file: bookSlice.ts:38 ~ getNewBooksThunk ~ serverPosters:", serverPosters)
   return serverPosters
})

export const getItemCategoriesThunk = createAsyncThunk('posters/getItemCategoriesThunk', async () => {
   const serverCategories: InnerCategoriesResponse = await getItemCategories();
   return serverCategories
})

export const getPosterStatusesThunk = createAsyncThunk('posters/getPosterStatusesThunk', async () => {
   const serverPosterStatuses: InnerStatusesResponse = await getPosterStatuses();
   return serverPosterStatuses
})

export const getPosterDeleteReasonsThunk = createAsyncThunk('posters/getPosterDeleteReasonsThunk', async () => {
   const serverPosterDeleteReasons: InnerDeleteReasonsResponse = await getPosterDeleteReasons();
   return serverPosterDeleteReasons
})

export const getPosterByIdThunk = createAsyncThunk('posters/getPosterByIdThunk', async ({ id, isUpdated }: { id: string, isUpdated?: string }) => {
   const serverPoster: InnerOnePosterResponse = await getPosterById(id, isUpdated);
   return serverPoster
})

export const createPosterThunk = createAsyncThunk('posters/createPosterThunk', async (poster: PosterToCreateWithCoords) => {
   const result: InnerCreatePosterResponse = await createPoster(poster)
   return result
})

export const updatePosterThunk = createAsyncThunk('posters/updatePosterThunk', async (poster: PosterToUpdate) => {
   const result: InnerCreatePosterResponse = await updatePoster(poster)
   return result
})

export const getNotificationsThunk = createAsyncThunk('posters/getNotificationsThunk', async () => {
   const serverNotificationsInfo: InnerNotificationsResponse = await getNotifications();
   return serverNotificationsInfo
})

export const setCommentsReadThunk = createAsyncThunk('posters/setCommentsReadThunk', async (posterId: number) => {
   const serverNotificationsInfo: InnerNotificationsResponse = await setCommentsRead(posterId);
   return serverNotificationsInfo
})

export const postersSlice = createSlice({
   name: 'posters',
   initialState,
   reducers: {
      setResponseCode: (state, action: PayloadAction<number>) => {
         return { ...state, responseCode: action.payload }
      },
      clearUpdInputs: (state) => {
         return { ...state, objectCategoryInput: '', descriptionInput: '', phoneInput: '', breedInput: '' }
      },
      setItem: (state, action: PayloadAction<string>) => {
         return { ...state, itemInput: action.payload }
      },
      setBreed: (state, action: PayloadAction<string | null>) => {
         return { ...state, breedInput: action.payload }
      },
      setIsPet: (state, action: PayloadAction<boolean>) => {
         return { ...state, isPetInput: action.payload }
      },
      setObjectCategory: (state, action: PayloadAction<string>) => {
         return { ...state, objectCategoryInput: action.payload }
      },
      setDescription: (state, action: PayloadAction<string>) => {
         return { ...state, descriptionInput: action.payload }
      },
      setItemStatus: (state, action: PayloadAction<string>) => {
         return { ...state, itemStatusInput: action.payload }
      },
      setDateOfAction: (state, action: PayloadAction<dayjs.Dayjs | null>) => {
         return { ...state, dateOfActionInput: action.payload }
      },
      setPhotoFile: (state, action: PayloadAction<File | null>) => {
         return { ...state, photoFileInput: action.payload }
      },
      setPhone: (state, action: PayloadAction<string>) => {
         return { ...state, phoneInput: action.payload }
      },
      setAddress: (state, action: PayloadAction<string>) => {
         return { ...state, addressInput: action.payload }
      },
      setPostersUser: (state, action: PayloadAction<PosterServer[]>) => {
         return { ...state, postersUser: action.payload }
      },
      // setSearchInput: (state, action: PayloadAction<string>) => {
      //    return { ...state, searchInputValue: action.payload }
      // },
      // setPage: (state, action: PayloadAction<number>) => {
      //    return { ...state, page: action.payload }
      // },
   },
   extraReducers(builder) {
      builder
         .addCase(getPostersThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getPostersThunk.fulfilled, (state, action: PayloadAction<InnerPostersResponse>) => {
            if (action.payload.resCode === 200) {
               return { ...state, posters: action.payload.posters, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }

            // return { ...state, posters: action.payload.res, status: 'fulfilled' }
         })
         .addCase(getPostersThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getStatisticsThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getStatisticsThunk.fulfilled, (state, action: PayloadAction<InnerStatsResponse>) => {
            if (action.payload.resCode === 200) {
               return { ...state, foundStatistics: action.payload.foundStatistics, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getStatisticsThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getPosterByIdThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getPosterByIdThunk.fulfilled, (state, action: PayloadAction<InnerOnePosterResponse>) => {
            // return { ...state, poster: action.payload, status: 'fulfilled' }
            if (action.payload.resCode === 200) {
               const { rejectReason, deleteReason, rejectUpdMessage, poster, accountInfo } = action.payload
               return { ...state, rejectReason: rejectReason || '', rejectUpdMessage: rejectUpdMessage || '', isAuth: accountInfo.isAuth, isNotAdmin: accountInfo.isNotAdmin, deleteReason: deleteReason || '', breedInput: poster?.breed || '', objectCategoryInput: poster?.ObjectCategories?.category || '', descriptionInput: poster?.description || '', phoneInput: poster?.phone || '', poster: poster, responseCode: 200, status: 'fulfilled' }
            }
            else {
               const { accountInfo } = action.payload
               return { ...state, isAuth: accountInfo.isAuth, isNotAdmin: accountInfo.isNotAdmin, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getPosterByIdThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(createPosterThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(createPosterThunk.fulfilled, (state, action: PayloadAction<InnerCreatePosterResponse>) => {
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
         .addCase(createPosterThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getItemCategoriesThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getItemCategoriesThunk.fulfilled, (state, action: PayloadAction<InnerCategoriesResponse>) => {
            if (action.payload.resCode === 200) {
               const { categories, accountInfo } = action.payload
               return { ...state, isAuth: accountInfo.isAuth, isNotAdmin: accountInfo.isNotAdmin, itemCategories: categories.itemCategories, petCategories: categories.petCategories, responseCode: 200, status: 'fulfilled' }
               // return { ...state, posterCategories: action.payload.categories, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }

            // return { ...state, posters: action.payload.res, status: 'fulfilled' }
         })
         .addCase(getItemCategoriesThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getUserPostersThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getUserPostersThunk.fulfilled, (state, action: PayloadAction<InnerPostersResponse>) => {
            if (action.payload.resCode === 200) {
               return { ...state, postersUser: action.payload.posters, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }

            // return { ...state, posters: action.payload.res, status: 'fulfilled' }
         })
         .addCase(getUserPostersThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(updatePosterThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(updatePosterThunk.fulfilled, (state, action: PayloadAction<InnerCreatePosterResponse>) => {

            if (action.payload.resCode === 201) {
               const { resCode, isAuth, isNotAdmin } = action.payload
               return { ...state, responseCode: resCode, isAuthorized: isAuth, isNotAdmin: isNotAdmin, status: 'fulfilled' }
            }
            else {
               const { resCode, isAuth, isNotAdmin, err } = action.payload
               return { ...state, errorMsg: err, responseCode: resCode, isAuthorized: isAuth, isNotAdmin: isNotAdmin, status: 'fulfilled' }
            }
         })
         .addCase(updatePosterThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getPosterDeleteReasonsThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getPosterDeleteReasonsThunk.fulfilled, (state, action: PayloadAction<InnerDeleteReasonsResponse>) => {
            if (action.payload.resCode === 200) {
               return { ...state, posterDeleteReasons: action.payload.deleteReasons, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }

            // return { ...state, posters: action.payload.res, status: 'fulfilled' }
         })
         .addCase(getPosterDeleteReasonsThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getPostersFilteredThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getPostersFilteredThunk.fulfilled, (state, action: PayloadAction<InnerPostersResponse>) => {
            if (action.payload.resCode === 200) {
               return { ...state, posters: action.payload.posters, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getPostersFilteredThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getPosterStatusesThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getPosterStatusesThunk.fulfilled, (state, action: PayloadAction<InnerStatusesResponse>) => {
            if (action.payload.resCode === 200) {
               return { ...state, posterStatuses: action.payload.posterStatuses, responseCode: 200, status: 'fulfilled' }
            }
            else {
               return { ...state, errorMsg: action.payload.err, responseCode: action.payload.resCode, status: 'fulfilled' }
            }
         })
         .addCase(getPosterStatusesThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getNotificationsThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getNotificationsThunk.fulfilled, (state, action: PayloadAction<InnerNotificationsResponse>) => {
            if (action.payload.resCode === 200) {
               const { notificationsInfo, resCode } = action.payload;
               return { ...state, notificationsInfo: notificationsInfo, responseCode: resCode, status: 'fulfilled' }
            }
            else {
               const { err, resCode } = action.payload;
               return { ...state, errorMsg: err, responseCode: resCode, status: 'fulfilled' }
            }

            // return { ...state, posters: action.payload.res, status: 'fulfilled' }
         })
         .addCase(getNotificationsThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(setCommentsReadThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(setCommentsReadThunk.fulfilled, (state, action: PayloadAction<InnerNotificationsResponse>) => {
            if (action.payload.resCode === 200) {
               const { notificationsInfo, resCode } = action.payload;
               return { ...state, notificationsInfo: notificationsInfo, responseCode: resCode, status: 'fulfilled' }
            }
            else {
               const { err, resCode } = action.payload;
               return { ...state, errorMsg: err, responseCode: resCode, status: 'fulfilled' }
            }

            // return { ...state, posters: action.payload.res, status: 'fulfilled' }
         })
         .addCase(setCommentsReadThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
      // .addCase(searchBooksThunk.pending, (state) => {
      //    return { ...state, status: 'loading' }
      // })
      // .addCase(searchBooksThunk.fulfilled, (state, action: PayloadAction<SearchBooksResponse>) => {
      //    const { books, total } = action.payload

      //    const totalConverted = (total && Number(total) > 0) ? Number(total) : 0
      //    const booksQtyAtArr = 10

      //    const pageQty = Math.ceil(totalConverted / booksQtyAtArr)

      //    return { ...state, booksFoundByTitle: books, pageQty: pageQty, total: totalConverted, status: 'fulfilled' }
      // })
      // .addCase(searchBooksThunk.rejected, (state) => {
      //    return { ...state, status: 'rejected' }
      // })
   },
})

// Action creators are generated for each case reducer function
export const { setResponseCode, setItem, setBreed, setIsPet, setObjectCategory, setDescription, setItemStatus, setDateOfAction, setPhotoFile, setPhone, setAddress, setPostersUser, clearUpdInputs } = postersSlice.actions

export const postersReducer = postersSlice.reducer