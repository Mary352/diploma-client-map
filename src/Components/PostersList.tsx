import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { PosterServer } from '../types/types';
import { LoadingInfo } from './LoadingInfo';
import { ErrorMessageComp } from './ErrorMessageComp';
import { getPostersThunk } from '../store/posterSlice';
import { PosterNotFound } from './PosterNotFound';
import { PosterCard } from './PosterCard';

type Props = {
   posters: PosterServer[]
}

export const PostersList = (props: Props) => {
   const { posters } = props

   // useEffect(() => {

   // }, [])

   return (
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
         {posters.map((poster) => <PosterCard poster={poster} key={poster.id} />)}
      </Box>
   );
}