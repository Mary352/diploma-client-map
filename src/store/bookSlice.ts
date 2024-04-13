import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { BookState, OneBookDetailed, OneBookShort, SearchBooksResponse, SearchBooksThunkParams } from '../types/types'
import { getBookByISBN, getNewBooks, searchBooks } from '../server/getBooks'
import { getPosters } from '../server/getPosters'

const initialState: BookState = {
   books: [],
   bookDetailed: {
      error: '',
      title: '',
      subtitle: '',
      authors: '',
      publisher: '',
      language: '',
      isbn10: '',
      isbn13: '',
      pages: '',
      year: '',
      rating: '',
      desc: '',
      price: '',
      image: '',
      url: '',
      pdf: {}
   },
   searchInputValue: '',
   booksFoundByTitle: [],
   total: 0,
   page: 1,
   pageQty: 1,
   // booksPerPage: 10
   status: ''
}

export const getNewBooksThunk = createAsyncThunk('books/getNewBooksThunk', async () => {
   const serverBooks = await getNewBooks();
   // const serverPosters = await getPosters();
   // console.log("🚀 ~ file: bookSlice.ts:38 ~ getNewBooksThunk ~ serverPosters:", serverPosters)
   return serverBooks
})

export const getBookByISBNThunk = createAsyncThunk('books/getBookByISBNThunk', async (isbn13: string) => {
   const serverBook = await getBookByISBN(isbn13);
   return serverBook
})

export const searchBooksThunk = createAsyncThunk<SearchBooksResponse, SearchBooksThunkParams, { state: RootState }>('books/searchBooksThunk', async ({ title, page }: SearchBooksThunkParams, store) => {
   // const state = store.getState()

   // let serverBooks
   // if (state.books.books[0].title.includes(title))
   //    serverBooks = await searchBooks(title, page)
   // else
   //    serverBooks = await searchBooks(title, 1)

   const serverBooks = await searchBooks(title, page)

   return serverBooks
})

export const booksSlice = createSlice({
   name: 'books',
   initialState,
   reducers: {
      setSearchInput: (state, action: PayloadAction<string>) => {
         return { ...state, searchInputValue: action.payload }
      },
      setPage: (state, action: PayloadAction<number>) => {
         return { ...state, page: action.payload }
      },
   },
   extraReducers(builder) {
      builder
         .addCase(getNewBooksThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getNewBooksThunk.fulfilled, (state, action: PayloadAction<OneBookShort[]>) => {
            return { ...state, books: action.payload, status: 'fulfilled' }
         })
         .addCase(getNewBooksThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(getBookByISBNThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(getBookByISBNThunk.fulfilled, (state, action: PayloadAction<OneBookDetailed>) => {
            return { ...state, bookDetailed: action.payload, status: 'fulfilled' }
         })
         .addCase(getBookByISBNThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
         .addCase(searchBooksThunk.pending, (state) => {
            return { ...state, status: 'loading' }
         })
         .addCase(searchBooksThunk.fulfilled, (state, action: PayloadAction<SearchBooksResponse>) => {
            const { books, total } = action.payload

            const totalConverted = (total && Number(total) > 0) ? Number(total) : 0
            const booksQtyAtArr = 10

            const pageQty = Math.ceil(totalConverted / booksQtyAtArr)

            return { ...state, booksFoundByTitle: books, pageQty: pageQty, total: totalConverted, status: 'fulfilled' }
         })
         .addCase(searchBooksThunk.rejected, (state) => {
            return { ...state, status: 'rejected' }
         })
   },
})

// Action creators are generated for each case reducer function
export const { setSearchInput, setPage } = booksSlice.actions

export const booksReducer = booksSlice.reducer