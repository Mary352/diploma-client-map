import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { OneBookShort } from '../types/types';
import { LoadingInfo } from './LoadingInfo';
import { ErrorMessageComp } from './ErrorMessageComp';
import { getPostersThunk, getUserPostersThunk } from '../store/posterSlice';
import { PosterNotFound } from './PosterNotFound';
import { PosterCard } from './PosterCard';
import { ErrorPage } from './ErrorPage';
import { useNavigate } from 'react-router-dom';

export const PostersUserList = () => {

   // const books = useAppSelector(state => state.books.books)
   const postersUser = useAppSelector(state => state.posters.postersUser)
   const status = useAppSelector(state => state.posters.status)
   // const responseCode = useAppSelector(state => state.posters.responseCode)

   const errMsg = useAppSelector(state => state.posters.errorMsg)
   const resCode = useAppSelector(state => state.posters.responseCode)

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   useEffect(() => {

      dispatch(getUserPostersThunk())

   }, [])

   if (status === 'loading')
      return <LoadingInfo />

   if (resCode === 401) {
      navigate('/signin')
   }

   if ((postersUser.length === 0 || !postersUser || postersUser === null) && resCode !== 0 && resCode !== 200 && resCode !== 201 && errMsg && status === 'fulfilled') {
      return <ErrorPage errorMessage={errMsg} />
   }

   if (postersUser.length === 0 && status === 'fulfilled')
      return <PosterNotFound />

   if (status === 'rejected')
      return <ErrorMessageComp />

   return (
      <Box sx={{
         maxWidth: '1200px',
         marginX: 'auto',
         marginY: '0',
         paddingX: { xs: '25px', md: '35px', xl: '40px' }
      }}>
         <Typography
            variant="h1"
            // noWrap
            component="h1"
            sx={{
               // display: { xs: 'none', sm: 'block' } 
               pt: { xs: 14, md: 18 },
               pb: { xs: 9, md: 12 },
               // pb: 6,
               textTransform: 'uppercase'
            }}
         >
            Мои Объявления
         </Typography>
         <Box
            sx={{
               display: 'flex',
               flexWrap: 'wrap',
               // bgcolor: '#ff0000',
               my: { xs: '-18px', md: -6 },
               mx: { md: -4 },
            }}
         >
            {/* {books.map((book: OneBookShort) => <BookShort book={book}></BookShort>)} */}
            {/* {posters.map((poster) => <p>{poster.item}</p>)} */}
            {postersUser.map((posterUser) => <PosterCard poster={posterUser} />)}
         </Box>
      </Box>
   );
}