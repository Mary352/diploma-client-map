import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Rating, Tab, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { LoadingInfo } from "./LoadingInfo";
import { ErrorMessageComp } from "./ErrorMessageComp";
import { DOMAIN, UPLOAD, posterStatuses } from "../types/commonVars";
import { PosterNotFound } from "./PosterNotFound";
import { getPosterByIdThunk, getPosterDeleteReasonsThunk } from "../store/posterSlice";
import { deletePosterByUser, publishPoster, rejectPoster } from "../server/getPosters";
import { ErrorPage } from "./ErrorPage";
import { error } from "console";
import { getOneUserThunk } from "../store/userSlice";
import { YMaps, Map, SearchControl, Placemark } from '@pbe/react-yandex-maps';

export const PosterPage = () => {
   // const { isbn13 } = useParams();
   const { id } = useParams();

   const [value, setValue] = useState('1')
   const [rejectReason, setRejectReason] = useState<string>('')
   const [isReject, setIsReject] = useState<boolean>(false)

   const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false)
   const [deleteReason, setDeleteReason] = useState('');

   const [error, setError] = useState(false);
   const [helperText, setHelperText] = useState('');

   const maxLength25 = 25;

   const posterDeleteReasons = useAppSelector(state => state.posters.posterDeleteReasons)
   // const currentUserId = localStorage.getItem('userId')
   // const book = useAppSelector((state) => state.books.bookDetailed)
   const poster = useAppSelector((state) => state.posters.poster)
   const status = useAppSelector(state => state.posters.status)
   const errMsg = useAppSelector(state => state.posters.errorMsg)
   const resCode = useAppSelector(state => state.posters.responseCode)
   const rejectReasonStore = useAppSelector(state => state.posters.rejectReason)
   const deleteReasonStore = useAppSelector(state => state.posters.deleteReason)
   const posterAuthor = useAppSelector(state => state.posters.posterAuthor)

   const isNotAdmin = localStorage.getItem('isNotAdmin');
   const currentUserId = localStorage.getItem('userId');


   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDeleteReason((event.target as HTMLInputElement).value);
      setHelperText('');
      setError(false);
   };

   const handleDeleteByUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("🚀 ~ file: PosterPage.tsx:46 ~ handleDeleteByUserSubmit ~ deleteReason:", deleteReason)

      if (!deleteReason) {
         setHelperText('Выберите причину');
         setError(true);
      }
      else {
         deletePosterByUser(id, deleteReason)
            .then(data => { id && dispatch(getPosterByIdThunk(id)); })
            .catch(err => console.log(err))
      }
   };

   useEffect(() => {
      dispatch(getPosterDeleteReasonsThunk())
      id && dispatch(getPosterByIdThunk(id))
      // isbn13 && dispatch(getBookByISBNThunk(isbn13))

      // console.log('----')
      // console.log(poster?.userId)
      // console.log('----')
      // isNotAdmin === 'false' && dispatch(getOneUserThunk(poster?.userId))

   }, [id])
   // }, [id, posterStatus])

   const handleChange = (e: React.SyntheticEvent, newVal: string) => {
      setValue(newVal)
   }

   const handleClickBack = () => {
      navigate(-1)
   }

   const handleDelete = () => {
      // navigate(-1)
      deletePosterByUser(id, deleteReason)
         .then(data => { id && dispatch(getPosterByIdThunk(id)); })
         .catch(err => console.log(err))
   }

   const handleUpdate = () => {
      // navigate(-1)
      navigate(`/posters/update/${id}`)
   }

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('form submit')
      rejectPoster(id, rejectReason)
         .then(data => { id && dispatch(getPosterByIdThunk(id)); })
         .catch(err => console.log(err))
      // dispatch()
      // const formattedDateOfAction = dateOfAction ? dateOfAction.format('YYYY-MM-DD') : '';
      // console.log("🚀 ~ file: PosterCreatePage.tsx:180 ~ handleFormSubmit ~ formattedDateOfAction:", formattedDateOfAction)
      // console.log("🚀 ~ file: PosterCreatePage.tsx:180 ~ handleFormSubmit ~ formattedDateOfAction:", new Date(formattedDateOfAction))
      // dispatch(createPosterThunk({
      //    photo: selectedFile,
      //    address: address,
      //    breed: breed,
      //    dateOfAction: formattedDateOfAction,
      //    description: description,
      //    isPet: isPet ? 'true' : '',
      //    item: item,
      //    itemStatus: itemStatus,
      //    objectCategory: objectCategory,
      //    phone: phone
      // }))
   }

   const handlePublish = () => {

      console.log("🚀 ~ file: PosterPage.tsx:95 ~ handlePublish ~ id:", id)
      publishPoster(id)
         .then(data => { id && dispatch(getPosterByIdThunk(id)); })
         .catch(err => console.log(err))
   }
   const handleReject = () => {
      // ! Отклонить объявление
   }

   if (status === 'loading')
      return <LoadingInfo />

   if (resCode !== 0 && resCode !== 200 && resCode !== 201 && errMsg && status === 'fulfilled') {
      return <ErrorPage errorMessage={errMsg} />
   }

   // if ((!poster || poster === null) && status === 'fulfilled')
   //    return <PosterNotFound />

   // if (poster === null) {
   //    return <PosterNotFound />
   // }

   if (status === 'rejected')
      return <ErrorMessageComp />

   // return <></>
   if (poster !== null && status === 'fulfilled') {
      return (
         <Box sx={{
            maxWidth: '1200px',
            marginX: 'auto',
            marginY: '0',
            paddingX: { xs: '25px', md: '35px', xl: '40px' }
         }}>
            <Button onClick={handleClickBack} sx={{ mt: { xs: 14, md: 18 } }}>
               <KeyboardBackspaceIcon fontSize="large" sx={{ color: "system.main" }} />
            </Button>

            <Typography variant="h1" component='h1' sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 9, md: 8 } }}>{poster.item}</Typography>
            {(isNotAdmin === 'false' || Number(currentUserId) === poster.userId) && <Typography variant="h3" component='h3' sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 9, md: 12 }, color: '#3817D8' }}>{poster.PosterStatuses?.statusName}</Typography>}

            <Box sx={{
               display: 'flex',
               justifyContent: { xs: 'normal', xl: 'space-between' },
               flexDirection: { xs: 'column', xl: 'row' }
            }}>
               <Card
                  sx={{
                     bgcolor: 'tertiary2.light',
                     width: { xs: '100%', xl: '440px' },
                     marginBottom: { xs: 9, md: 12, xl: 0 }
                  }}
               >
                  <CardMedia
                     component="img"
                     image={DOMAIN + UPLOAD + '/' + poster.photoLink}
                     alt="poster"
                     sx={{ width: '80%', marginX: 'auto', marginY: '0' }}
                  />
               </Card>
               <Card sx={{ width: { xs: '100%', xl: '450px' } }}>
                  <CardContent sx={{
                     paddingY: 0,
                     // '&:last:child': {
                     //    pb: 15
                     // }
                  }}>
                     {/* <Typography gutterBottom variant="h3" component="h3">
                     {book.title}
                  </Typography>
                  <Typography variant="body1" color="system.light">
                     {book.subtitle}
                  </Typography> */}
                     {/* <TableContainer>
                     <Table aria-label="book props table">
                        <TableBody>
                           <TableRow >
                              <TableCell>Author</TableCell>
                              <TableCell>{book.authors}</TableCell>
                           </TableRow>
                        </TableBody>
                     </Table>
                  </TableContainer> */}
                     {/* <Box sx={{
                        display: 'flex', justifyContent: 'space-between', pt: { xs: 8, md: 10 }, pb: 6
                     }}>
                        <Typography variant="h6" component="h6">
                           Телефон: {poster.phone}
                        </Typography>
                        {poster.isPet && <Typography variant="h6" component="h6">Порода: {poster.breed}</Typography>}

                        
                     </Box> */}

                     <Typography variant="h6" component="h6" sx={{ color: 'red', textAlign: 'center', pb: 5 }} >
                        {poster.itemStatus}
                     </Typography>

                     <Box sx={{ display: 'flex', pb: 4 }}>
                        {/* sx={{ color: 'system.light' }} */}
                        <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                           Категория:
                        </Typography>
                        <Typography maxWidth='200px' variant="body1" component="p" >
                           {poster.ObjectCategories?.category}
                        </Typography>
                     </Box>

                     <Box sx={{ display: 'flex', pb: 4 }}>
                        {/* sx={{ color: 'system.light' }} */}
                        <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                           Когда:
                        </Typography>
                        <Typography maxWidth='200px' variant="body1" component="p" >
                           {poster.dateOfAction}
                        </Typography>
                     </Box>
                     {poster.isPet && <Box sx={{ display: 'flex', pb: 4 }}>

                        <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                           Порода:
                        </Typography>
                        <Typography maxWidth='200px' variant="body1" component="p" >
                           {poster.breed}
                        </Typography>
                     </Box>}
                     <Box sx={{ display: 'flex', pb: 4 }}>
                        {/* sx={{ color: 'system.light' }} */}
                        <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                           Телефон для связи:
                        </Typography>
                        <Typography maxWidth='200px' variant="body1" component="p" >
                           {poster.phone}
                        </Typography>
                     </Box>

                     {poster.publishDate && <Box sx={{ display: 'flex', pb: 4 }}>
                        {/* sx={{ color: 'system.light' }} */}
                        <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                           Дата публикации:
                        </Typography>
                        <Typography maxWidth='200px' variant="body1" component="p" >
                           {poster.publishDate}
                        </Typography>
                     </Box>}

                     {isNotAdmin === 'false' && <>
                        <Typography variant="h6" component="h6" sx={{ pt: 4, textAlign: 'center', pb: 5 }} >
                           О пользователе
                        </Typography>
                        <Box sx={{ display: 'flex', pb: 4 }}>
                           {/* sx={{ color: 'system.light' }} */}
                           <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                              Имя:
                           </Typography>
                           <Typography maxWidth='200px' variant="body1" component="p" >
                              {posterAuthor?.name}
                           </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', pb: 4 }}>
                           {/* sx={{ color: 'system.light' }} */}
                           <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                              Email:
                           </Typography>
                           <Typography maxWidth='200px' variant="body1" component="p" >
                              {posterAuthor?.email}
                           </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', pb: 4 }}>
                           {/* sx={{ color: 'system.light' }} */}
                           <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                              Телефон:
                           </Typography>
                           <Typography maxWidth='200px' variant="body1" component="p" >
                              {posterAuthor?.phone}
                           </Typography>
                        </Box>

                     </>}

                     {/*  <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 4 }}>
                        <Typography variant="body1" component="p" sx={{ color: 'system.light' }}>
                           Publisher
                        </Typography>
                        <Typography maxWidth='125px' variant="body1" component="p" sx={{ textAlign: 'right' }}>
                           {book.publisher}
                        </Typography>
                     </Box>
                     <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" component="p" sx={{ color: 'system.light' }}>
                           Language
                        </Typography>
                        <Typography maxWidth='125px' variant="body1" component="p" sx={{ textAlign: 'right' }}>
                           {book.language}
                        </Typography>
                     </Box> */}
                  </CardContent>
               </Card>
            </Box>

            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitPublication) && isNotAdmin === 'false' &&
               <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
               }}>
                  <Button variant='contained' sx={{
                     width: '30%',
                     marginTop: 12,
                     marginBottom: 12,
                     paddingY: 3,
                     bgcolor: 'system.main',
                     color: '#fff',
                     textTransform: 'uppercase',
                     '&:hover': {
                        bgcolor: 'system.dark'
                     }
                  }
                  }
                     onClick={handlePublish}
                  >Опубликовать</Button>
                  <FormControlLabel
                     sx={{ pb: 6 }}
                     label="Отклонить?"
                     control={<Checkbox checked={isReject} onChange={(e) => setIsReject(e.target.checked)} />}
                  />
                  {isReject && <form onSubmit={handleFormSubmit}>
                     <TextField sx={{
                        pb: 6,
                        width: '50%',
                        // width: { xs: '100%', md: '80%' },
                        bgcolor: '#fff',
                        // marginBottom: { xs: 6, md: 0 }
                     }}
                        required
                        inputProps={{ maxLength: maxLength25 }}
                        label="Причина отклонения" variant="outlined" value={rejectReason} onChange={(event) => setRejectReason(event.target.value)} />
                     <Button variant='contained' sx={{
                        width: '30%',
                        // marginTop: 12,
                        // marginTop: 6,
                        ml: 4,
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
                     // onClick={handleReject}
                     >Отклонить</Button>
                  </form>
                  }
               </Box>}

            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitPublication || poster.PosterStatuses.statusName === posterStatuses.published) && poster.userId === Number(currentUserId) &&
               <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
               }}>
                  <Button variant='contained' sx={{
                     width: '30%',
                     marginTop: 12,
                     marginBottom: 12,
                     paddingY: 3,
                     bgcolor: 'system.main',
                     color: '#fff',
                     textTransform: 'uppercase',
                     '&:hover': {
                        bgcolor: 'system.dark'
                     }
                  }
                  }
                     onClick={handleUpdate}
                  >Редактировать объявление</Button>
               </Box>}
            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.rejected) &&
               <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 12 }, pr: { xs: 1, md: 2 } }}>Причина отклонения: </Typography>
                  <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 12 }, pb: { xs: 9, md: 2 } }}>{rejectReasonStore}</Typography>
               </Box>
            }

            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitDelete || poster.PosterStatuses.statusName === posterStatuses.deleted) && (isNotAdmin === 'false' || Number(currentUserId) === poster.userId) &&

               <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 12 }, pr: { xs: 1, md: 2 } }}>Причина удаления: </Typography>
                  <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 12 }, pb: { xs: 9, md: 2 } }}>{deleteReasonStore}</Typography>
               </Box>
            }

            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitDelete || poster.PosterStatuses.statusName === posterStatuses.waitPublication) && (isNotAdmin === 'false') &&
               <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
               }}>

                  <Button variant='contained' sx={{
                     width: '30%',
                     marginTop: 3,
                     // marginBottom: 12,
                     paddingY: 3,
                     bgcolor: '#ff5b5b',
                     color: '#fff',
                     textTransform: 'uppercase',
                     '&:hover': {
                        bgcolor: '#fec1c1'
                     }
                  }
                  }
                     onClick={handleDelete}
                  >Удалить</Button>
               </Box>}

            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitPublication || poster.PosterStatuses.statusName === posterStatuses.published) && (isNotAdmin === 'true' && Number(currentUserId) === poster.userId) &&
               <Box sx={{
                  display: 'flex',
                  flexDirection: 'column'
               }}>
                  <FormControlLabel
                     sx={{ pb: 6 }}
                     label="Удалить?"
                     control={<Checkbox checked={isDeleteUser} onChange={(e) => setIsDeleteUser(e.target.checked)} />}
                  />

                  {isDeleteUser && <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleDeleteByUserSubmit}>

                     <FormControl error={error} variant="standard">
                        <FormLabel id="posterDeleteReason">Выберите причину удаления:</FormLabel>
                        <RadioGroup
                           aria-labelledby="posterDeleteReason"
                           name="reason"
                           value={deleteReason}
                           onChange={handleRadioChange}
                        >
                           {/* <FormControlLabel value="best" control={<Radio />} label="The best!" />
                           <FormControlLabel value="worst" control={<Radio />} label="The worst." /> */}
                           {posterDeleteReasons.map((reason) => <FormControlLabel value={reason} control={<Radio />} label={reason} />)}
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                        {/* <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
                              Check Answer
                           </Button> */}
                     </FormControl>
                     <Button type="submit" variant='contained' sx={{
                        width: '30%',
                        // marginTop: 12,
                        marginTop: 6,
                        // ml: 4,
                        paddingY: 3,
                        bgcolor: '#ff5b5b',
                        color: '#fff',
                        textTransform: 'uppercase',
                        '&:hover': {
                           bgcolor: '#fec1c1'
                        }
                     }
                     }

                     // onClick={handleReject}
                     >Запросить удаление</Button>
                  </form>

                     // </form>
                  }
               </Box>}
            <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider', pt: { xs: 14, md: 18 } }}>
                  <TabList aria-label="Tabs for book props" onChange={handleChange} textColor="secondary" indicatorColor="secondary" >
                     <Tab sx={{ color: 'system.light', fontSize: '16px', textTransform: 'capitalize' }} label='Описание' value='1' />
                     <Tab sx={{ color: 'system.light', fontSize: '16px', textTransform: 'capitalize' }} label='Адрес' value='2' />
                     {/* <Tab label='Reviews' value='3' /> */}
                  </TabList>
               </Box>
               <TabPanel value='1' sx={{ pt: { xs: 9, md: 12 }, fontSize: '16px', mb: 20 }}>{poster.description}</TabPanel>
               <TabPanel value='2' sx={{ pt: { xs: 9, md: 12 }, fontSize: '16px' }}>
                  <YMaps query={{ apikey: '0a62e602-e671-4320-a847-0c31041bdb2e', suggest_apikey: 'c5bcdde0-db39-444b-831d-07b17c3af76e' }}>

                     <div>
                        Выбранный адрес: {poster.address}
                        Координаты: {+poster.coord0}

                        <Map
                           defaultState={{ center: [+poster.coord0, +poster.coord1], zoom: 13 }}
                           style={{ width: '100%', height: '400px' }}
                        >
                           <Placemark geometry={[poster.coord0, poster.coord1]} />
                        </Map>


                     </div>
                  </YMaps>
               </TabPanel>

            </TabContext>
         </Box >)
   }


   return <><div>no

      {poster !== null ? <p>true</p> : <p>false</p>}
      {status === 'fulfilled' ? <p>true</p> : <p>false</p>}

   </div></>

}
