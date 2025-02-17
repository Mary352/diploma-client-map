import { Box, Button, FormControl, InputLabel, NativeSelect, TextField, Typography, Select, SelectChangeEvent, Checkbox, FormControlLabel, MenuItem, RadioGroup, FormLabel, Radio } from "@mui/material"

import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { LoadingInfo } from './LoadingInfo';
import { ErrorMessageComp } from './ErrorMessageComp';
import { getPostersThunk, setPostersUser, getItemCategoriesThunk, getPostersFilteredThunk, getPosterStatusesThunk, getNotificationsThunk, getStatisticsThunk } from '../store/posterSlice';
import { PosterNotFound } from './PosterNotFound';
import { PosterCard } from './PosterCard';
import { PostersList } from './PostersList';
import { Link } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { setIsAuth } from "../store/accountSlice";
import { objectState } from "../types/commonVars"
import { getStatistics } from "../server/getPosters";

export const PostersListPage = () => {

   // const books = useAppSelector(state => state.books.books)
   const posters = useAppSelector(state => state.posters.posters)
   const foundStatistics = useAppSelector(state => state.posters.foundStatistics)
   const status = useAppSelector(state => state.posters.status)
   const responseCode = useAppSelector(state => state.posters.responseCode)

   // const posterCategories = useAppSelector(state => state.posters.posterCategories)
   const petCategories = useAppSelector(state => state.posters.petCategories)
   const itemCategories = useAppSelector(state => state.posters.itemCategories)
   const posterStatuses = useAppSelector(state => state.posters.posterStatuses)

   const [isPet, setIsPet] = useState<string>('no_value')
   const [itemStatus, setItemStatus] = useState<string>('no_itemStatus')
   const [objectCategory, setObjectCategory] = useState<string>('no_category')
   const [statusName, setStatusName] = useState('no_statusName');

   const isNotAdmin = localStorage.getItem('isNotAdmin');
   const errMsg = useAppSelector(state => state.posters.errorMsg)

   const dispatch = useAppDispatch()

   const handleObjectCategoryChange = (event: SelectChangeEvent<string>) => {
      setObjectCategory(event.target.value as string)
      // dispatch(setObjectCategory(e.target.value))
   }

   const handleStatusNameChange = (event: SelectChangeEvent<string>) => {
      setStatusName(event.target.value as string)
   }

   const handleItemStatusChange = (event: SelectChangeEvent<string>) => {
      setItemStatus(event.target.value as string)
   }

   const handleIsPetChange = (event: ChangeEvent<HTMLInputElement>) => {
      setIsPet((event.target as HTMLInputElement).value);
      // setHelperText('');
      // setError(false);
   };

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('form submit')
      dispatch(getPostersFilteredThunk({
         isPet: isPet,
         itemStatus: itemStatus,
         objectCategory: objectCategory,
         posterStatusName: statusName
      }))
   }
   const selectItemCategoryInput = <FormControl fullWidth sx={{ pt: 6, pb: 6 }}>
      <InputLabel variant="standard" htmlFor="objectCategory">
         Категория объекта
      </InputLabel>
      <Select
         // required
         onChange={handleObjectCategoryChange}
         value={objectCategory || 'no_category'}
         inputProps={{
            name: 'objectCategory',
            id: 'objectCategory',
         }}
      >
         <MenuItem value='no_category'>Не выбрано</MenuItem>
         {itemCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
      </Select>
   </FormControl>

   const selectPetCategoryInput = <FormControl fullWidth sx={{ pt: 6, pb: 6 }}>
      <InputLabel variant="standard" htmlFor="objectCategory">
         Категория объекта
      </InputLabel>
      <Select
         // required
         onChange={handleObjectCategoryChange}
         value={objectCategory || 'no_category'}
         inputProps={{
            name: 'objectCategory',
            id: 'objectCategory',
         }}
      >
         <MenuItem value='no_category'>Не выбрано</MenuItem>
         {petCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
      </Select>
   </FormControl>

   const selectAllCategoryInput = <FormControl fullWidth sx={{ pt: 6, pb: 6 }}>
      <InputLabel variant="standard" htmlFor="objectCategory">
         Категория объекта
      </InputLabel>
      <Select
         // required
         onChange={handleObjectCategoryChange}
         value={objectCategory || 'no_category'}
         inputProps={{
            name: 'objectCategory',
            id: 'objectCategory',
         }}
      >
         <MenuItem value='no_category'>Не выбрано</MenuItem>
         {itemCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
         {petCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
      </Select>
   </FormControl>

   useEffect(() => {
      dispatch(getStatisticsThunk())
      // getStatistics()
      //    .then(data => {
      //       data.message;
      //       // ! navigate('/posters/my')
      //       // const state = location.state as LocationState;
      //       // if (state.isUpdated === 'true') {
      //       //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
      //       // } else {
      //       //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
      //       // }
      //       // const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
      //       // if (isUpdated === 'true') {
      //       //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
      //       // } else {
      //       //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
      //       // }
      //       // dispatch(clearUpdInputs())

      //       // dispatch(clearUpdInputs())
      //       // navigate('/posters/my')

      //    })
      //    .catch(err => console.log(err))
      dispatch(setPostersUser([]))

      // dispatch(getNewBooksThunk())
      dispatch(getPostersThunk())
      dispatch(setIsAuth(false))
      dispatch(getNotificationsThunk())

      // dispatch(setItemStatus('потеряно'))
      isNotAdmin !== 'true' ? dispatch(getPosterStatusesThunk()) : dispatch(getItemCategoriesThunk())
      // dispatch(setObjectCategory('Другое'))

   }, [])
   // }, [books])

   if (status === 'loading')
      return <LoadingInfo />

   // !
   if (responseCode !== 200 && responseCode !== 201)
      return <ErrorPage errorMessage={errMsg} />

   if (posters.length === 0 && status === 'fulfilled')
      //  <PosterNotFound />
      return <Box sx={{
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
            Объявления
         </Typography>

         {/* {isNotAdmin === 'false' && <p><Link to='/users'>Перейти к управлению пользователями</Link></p>}
         {isNotAdmin === 'false' && <p style={{ marginBottom: '48px' }}><Link to='/comments'>Перейти к управлению комментариями</Link></p>} */}

         <Box sx={{
            paddingX: { xs: 6, md: 6 },
            paddingY: { xs: 6, md: 6 },
            bgcolor: 'tertiary.light',
            mb: 12
         }}>
            <form style={{
               display: 'flex',
               // paddingBottom: "48px",
               paddingTop: "16px",
               flexDirection: 'column'
            }}
               onSubmit={handleFormSubmit}
            >
               {/* {isPet} */}
               {isNotAdmin !== 'false' && (isPet === 'yes' ? selectPetCategoryInput : (isPet === 'no' ? selectItemCategoryInput : selectAllCategoryInput))}
               {/* {isNotAdmin !== 'false' && <FormControl fullWidth sx={{ pt: 6, pb: 6 }}>
               <InputLabel variant="standard" htmlFor="objectCategory">
                  Категория объекта
               </InputLabel>
               <Select
                  // required
                  onChange={handleObjectCategoryChange}
                  value={objectCategory || 'no_category'}
                  inputProps={{
                     name: 'objectCategory',
                     id: 'objectCategory',
                  }}
               >
                  <MenuItem value='no_category'>Не выбрано</MenuItem>
                  {posterCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
               </Select>
            </FormControl>} */}
               {isNotAdmin !== 'false' && <FormControl
                  // error={error} 
                  variant="standard">
                  <FormLabel id="isPetChoose">Это питомец?</FormLabel>
                  <RadioGroup
                     aria-labelledby="isPetChoose"
                     name="reason"
                     value={isPet}
                     onChange={handleIsPetChange}
                  >
                     <FormControlLabel value='no_value' control={<Radio />} label={'Не выбрано'} />
                     <FormControlLabel value='yes' control={<Radio />} label={'Да'} />
                     <FormControlLabel value='no' control={<Radio />} label={'Нет'} />
                  </RadioGroup>
               </FormControl>}
               {isNotAdmin !== 'false' && <FormControl fullWidth sx={{ pt: 6, pb: 6, mt: 6, }}>
                  <InputLabel variant="standard" htmlFor="itemStatus">
                     Статус объекта (потеряно/найдено)
                  </InputLabel>
                  <Select
                     // required
                     onChange={handleItemStatusChange}
                     value={itemStatus || 'no_itemStatus'}
                     inputProps={{
                        name: 'itemStatus',
                        id: 'itemStatus',
                     }}
                  >
                     <MenuItem value='no_itemStatus'>Не выбрано</MenuItem>
                     <MenuItem value={objectState.lost}>{objectState.lost}</MenuItem>
                     <MenuItem value={objectState.lookingForOwner}>{objectState.lookingForOwner}</MenuItem>
                  </Select>
               </FormControl>}
               {isNotAdmin !== 'true' && <FormControl fullWidth sx={{ pt: 6, pb: 6 }}>
                  <InputLabel variant="standard" htmlFor="statusName">
                     Статус объявления
                  </InputLabel>
                  <Select
                     // required
                     onChange={handleStatusNameChange}
                     value={statusName || 'no_statusName'}
                     inputProps={{
                        name: 'statusName',
                        id: 'statusName',
                     }}
                  >
                     <MenuItem value='no_statusName'>Не выбрано</MenuItem>
                     {posterStatuses.map((status, i) => <MenuItem key={i} value={status}>{status}</MenuItem>)}
                  </Select>
               </FormControl>}
               <Button variant='contained' sx={{
                  width: '30%',
                  // marginTop: 12,
                  // marginTop: 6,
                  // ml: 4,
                  paddingY: 3,
                  bgcolor: 'system.main',
                  color: '#fff',
                  textTransform: 'uppercase',
                  '&:hover': {
                     bgcolor: 'system.dark'
                  }
               }
               }
                  type="submit"
               >Подобрать объявления</Button>
            </form>
         </Box>
         <PosterNotFound />
         {/* <PostersList posters={posters} /> */}
         {/* <Box
         sx={{
            display: 'flex',
            flexWrap: 'wrap',
            // bgcolor: '#ff0000',
            my: { xs: '-18px', md: -6 },
            mx: { md: -4 },
         }}
      >
         
         {posters.map((poster) => <PosterCard poster={poster} />)}
      </Box> */}
      </Box >

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
            Объявления
         </Typography>

         {/* {isNotAdmin === 'false' && <p><Link to='/users'>Перейти к управлению пользователями</Link></p>}
         {isNotAdmin === 'false' && <p style={{ marginBottom: '48px' }}><Link to='/comments'>Перейти к управлению комментариями</Link></p>} */}

         {foundStatistics >= 70 && <Typography variant="h3" component="h3"
            sx={{ pb: 4 }}
         >
            У нас {foundStatistics}% людей находят то, что искали
         </Typography>}
         {/* <Typography variant="h3" component="h3"
            sx={{ pb: 4 }}
         >
            У нас 86,48% людей находят то, что искали
         </Typography> */}

         {/* <Typography variant="h3" component="h3"
            sx={{ pb: 4 }}
         >
            У нас {foundStatistics}% людей находят то, что искали
         </Typography> */}

         <Box sx={{
            paddingX: { xs: 6, md: 6 },
            paddingY: { xs: 6, md: 6 },
            bgcolor: 'tertiary.light',
            mb: 11
         }}>
            <form style={{
               display: 'flex',
               // paddingBottom: "48px",
               paddingTop: "16px",
               flexDirection: 'column'
            }}
               onSubmit={handleFormSubmit}
            >
               {/* {isPet} */}
               {isNotAdmin !== 'false' && (isPet === 'yes' ? selectPetCategoryInput : (isPet === 'no' ? selectItemCategoryInput : selectAllCategoryInput))}
               {/* {isNotAdmin !== 'false' && <FormControl fullWidth sx={{ pt: 6, pb: 6 }}>
                  <InputLabel variant="standard" htmlFor="objectCategory">
                     Категория объекта
                  </InputLabel>
                  <Select
                     // required
                     onChange={handleObjectCategoryChange}
                     value={objectCategory || 'no_category'}
                     inputProps={{
                        name: 'objectCategory',
                        id: 'objectCategory',
                     }}
                  >
                     <MenuItem value='no_category'>Не выбрано</MenuItem>
                     {posterCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
                  </Select>
               </FormControl>} */}
               {isNotAdmin !== 'false' && <FormControl
                  // error={error} 
                  variant="standard">
                  <FormLabel id="isPetChoose">Это питомец?</FormLabel>
                  <RadioGroup
                     aria-labelledby="isPetChoose"
                     name="reason"
                     value={isPet}
                     onChange={handleIsPetChange}
                  >
                     <FormControlLabel value='no_value' control={<Radio />} label={'Не выбрано'} />
                     <FormControlLabel value='yes' control={<Radio />} label={'Да'} />
                     <FormControlLabel value='no' control={<Radio />} label={'Нет'} />
                  </RadioGroup>
               </FormControl>}
               {isNotAdmin !== 'false' && <FormControl fullWidth sx={{ pt: 6, pb: 6, mt: 6, }}>
                  <InputLabel variant="standard" htmlFor="itemStatus">
                     Статус объекта (потеряно/найдено)
                  </InputLabel>
                  <Select
                     // required
                     onChange={handleItemStatusChange}
                     value={itemStatus || 'no_itemStatus'}
                     inputProps={{
                        name: 'itemStatus',
                        id: 'itemStatus',
                     }}
                  >
                     <MenuItem value='no_itemStatus'>Не выбрано</MenuItem>
                     <MenuItem value={objectState.lost}>{objectState.lost}</MenuItem>
                     <MenuItem value={objectState.lookingForOwner}>{objectState.lookingForOwner}</MenuItem>
                  </Select>
               </FormControl>}
               {isNotAdmin !== 'true' && <FormControl fullWidth sx={{ pt: 6, pb: 6 }}>
                  <InputLabel variant="standard" htmlFor="statusName">
                     Статус объявления
                  </InputLabel>
                  <Select
                     // required
                     onChange={handleStatusNameChange}
                     value={statusName || 'no_statusName'}
                     inputProps={{
                        name: 'statusName',
                        id: 'statusName',
                     }}
                  >
                     <MenuItem value='no_statusName'>Не выбрано</MenuItem>
                     {/* {posterStatuses.filter((status) => {
                        if (status === ) {
                           
                        }
                        return status
                     })} */}
                     {posterStatuses.map((status, i) => <MenuItem key={i} value={status}>{status}</MenuItem>)}
                  </Select>
               </FormControl>}
               <Button variant='contained' sx={{
                  width: '30%',
                  // marginTop: 12,
                  // marginTop: 6,
                  // ml: 4,
                  paddingY: 3,
                  bgcolor: 'system.main',
                  color: '#fff',
                  textTransform: 'uppercase',
                  '&:hover': {
                     bgcolor: 'system.dark'
                  }
               }
               }
                  type="submit"
               >Подобрать объявления</Button>
            </form>
         </Box>



         <PostersList posters={posters} />
         {/* <Box
            sx={{
               display: 'flex',
               flexWrap: 'wrap',
               // bgcolor: '#ff0000',
               my: { xs: '-18px', md: -6 },
               mx: { md: -4 },
            }}
         >
            
            {posters.map((poster) => <PosterCard poster={poster} />)}
         </Box> */}
      </Box >
   );
}