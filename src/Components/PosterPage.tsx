import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/store";
import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Box, Button, Card, CardContent, CardMedia, Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, Rating, Tab, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { LoadingInfo } from "./LoadingInfo";
import { MapWithPlacemark } from "./MapWithPlacemark";
import { ErrorMessageComp } from "./ErrorMessageComp";
import { DOMAIN, UPLOAD, posterStatuses } from "../types/commonVars";
import { PosterNotFound } from "./PosterNotFound";
import { clearUpdInputs, getNotificationsThunk, getPosterByIdThunk, getPosterDeleteReasonsThunk, setCommentsReadThunk } from "../store/posterSlice";
import { deletePosterByUser, publishPoster, publishUpdatedPoster, rejectPoster, rejectUpdatedPoster } from "../server/getPosters";
import { ErrorPage } from "./ErrorPage";
import { Comment } from "./Comment";
import { error } from "console";
import { getOneUserThunk } from "../store/userSlice";
import { YMaps, Map, SearchControl, Placemark } from '@pbe/react-yandex-maps';
import { CommentAdd } from "./CommentAdd";
import { getCommentsForPosterThunk } from "../store/commentSlice";

interface LocationState {
   tab?: string;
   isUpdated?: string;
}

export const PosterPage = () => {
   // const { isbn13 } = useParams();
   const { id } = useParams();

   const location = useLocation();
   // const [value, setValue] = useState<string>('1');
   const commentsRef = useRef<HTMLDivElement | null>(null);

   const str = window.location.href
   console.log("🚀 ~ PosterPage ~ str:", str)
   const tabValue = (str.split('#')[1] === 'commentsSection' ? '3' : '1')
   console.log("🚀 ~ PosterPage ~ tabValue:", tabValue)

   const [value, setValue] = useState(tabValue)
   const [rejectReason, setRejectReason] = useState<string>('')
   const [isReject, setIsReject] = useState<boolean>(false)

   const [isDeleteUser, setIsDeleteUser] = useState<boolean>(false)
   const [deleteReason, setDeleteReason] = useState('');

   const [error, setError] = useState(false);
   const [helperText, setHelperText] = useState('');

   const isNotAdminStorage = localStorage.getItem('isNotAdmin')
   const isAuthStorage = localStorage.getItem('isAuth')
   const isAuth = useAppSelector(state => state.posters.isAuth)
   const isNotAdmin = useAppSelector(state => state.posters.isNotAdmin)


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
   const rejectUpdMessageStore = useAppSelector(state => state.posters.rejectUpdMessage)
   const posterAuthor = useAppSelector(state => state.posters.posterAuthor)
   // needToGetCommentsOnly


   const commentsArr = useAppSelector((state) => state.comments.comments)
   const responseCodeComments = useAppSelector(state => state.comments.responseCode)
   // const needToGetCommentsOnly = useAppSelector(state => state.comments.needToGetCommentsOnly)

   // const isNotAdmin = localStorage.getItem('isNotAdmin');
   // const isAuth = localStorage.getItem('isAuth');
   const currentUserId = localStorage.getItem('userId');

   const [needToGetCommentsOnly, setNeedToGetCommentsOnly] = useState(false);


   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
      setDeleteReason((event.target as HTMLInputElement).value);
      setHelperText('');
      setError(false);
   };

   const isForAdmin = (): boolean => {
      return isNotAdmin === false || (isNotAdmin === 'no_info' && isNotAdminStorage === 'false')
   }

   const isForCurrentUser = (): boolean => {
      if (poster) {
         // isAuth !== false -> (isAuth === true || (isAuth === 'no_info' && isAuthStorage === 'true'))
         return (isAuth !== false && Number(currentUserId) === poster.userId)
      }
      else {
         return false
      }
   }

   const handleDeleteByUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log("🚀 ~ file: PosterPage.tsx:46 ~ handleDeleteByUserSubmit ~ deleteReason:", deleteReason)

      if (!deleteReason) {
         setHelperText('Выберите причину');
         setError(true);
      }
      else {
         deletePosterByUser(id, deleteReason)
            .then(data => {
               // ! navigate('/posters/my')
               // const state = location.state as LocationState;
               // if (state.isUpdated === 'true') {
               //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
               // } else {
               //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
               // }
               // const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
               // if (isUpdated === 'true') {
               //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
               // } else {
               //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
               // }
               // dispatch(clearUpdInputs())

               dispatch(clearUpdInputs())
               navigate('/posters/my')

            })
            .catch(err => console.log(err))
      }
   };
   const ref = useRef(null);
   // componentDidUpdate(() => {
   //    const element = document.getElementById('commentsSection');

   //    element?.scrollIntoView({ behavior: 'smooth' });
   // })
   // ! не работает при перезагрузке страницы
   // const h2ref = useRef<HTMLHeadingElement | null>(null);
   // useLayoutEffect(() => {
   //    console.log("🚀 ~ useLayoutEffect ~ useLayoutEffect:")
   //    if (h2ref.current) {
   //       console.log("🚀 ~ useLayoutEffect ~ useLayoutEffect:", 'true')
   //       // h2ref.current.scrollIntoView({ behavior: 'smooth' });
   //       if (value === '3') {
   //          console.log("🚀 ~ useLayoutEffect ~ useLayoutEffect:", 'VALUE-3')
   //          h2ref.current.scrollIntoView({ behavior: 'smooth' });
   //       }
   //    }
   //    else console.log("🚀 ~ useLayoutEffect ~ useLayoutEffect:", 'false')
   // }, []);


   const state = location.state as LocationState;
   useEffect(() => {
      // const element = ref.current;
      // console.log('---element---');
      // console.log(element);
      // console.log(typeof element);
      // console.log('---element---');
      // console.log(element?.id);

      console.log("🚀 ~ useEffect ~ responseCodeComments:", responseCodeComments)
      // console.log("🚀 ~ useEffect ~ href:", window.location.href)
      console.log("🚀🚀🚀 ~ useEffect ~ search:", window.location.search)
      dispatch(getPosterDeleteReasonsThunk())
      dispatch(getNotificationsThunk())


      // if (state.isUpdated === 'true') {
      //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
      // } else {
      //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
      // }

      const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
      if (isUpdated === 'true') {
         id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
      } else {
         id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
      }
      // id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
      dispatch(clearUpdInputs())

      id && dispatch(getCommentsForPosterThunk(id))
      const idNum = parseInt('' + id)
      // console.log("🚀 ~ useEffect ~ idNum:", idNum)
      // console.log("🚀 ~ useEffect ~ isNaN(idNum):", isNaN(idNum))
      !isNaN(idNum) && dispatch(setCommentsReadThunk(idNum))
      // // ограничение полной отрисовки страницы при добавлении нового комментария
      // // перерендер только блоков с комментариями
      // if (needToGetCommentsOnly) {
      //    id && dispatch(getCommentsForPosterThunk(id))
      //    // setNeedToGetCommentsOnly(false)
      // }
      // else {
      //    // if (responseCodeComments !== 200) {
      //    dispatch(getPosterDeleteReasonsThunk())
      //    id && dispatch(getPosterByIdThunk(id))
      //    id && dispatch(getCommentsForPosterThunk(id))
      //    // }

      // }

      // // dispatch(getPosterDeleteReasonsThunk())
      // // id && dispatch(getPosterByIdThunk(id))
      // // id && dispatch(getCommentsForPosterThunk(id))

      // // ограничение полной отрисовки страницы при добавлении нового комментария
      // // перерендер только блоков с комментариями
      // if (responseCodeComments === 201) {
      //    id && dispatch(getCommentsForPosterThunk(id))
      // }
      // else {

      //    // if (responseCodeComments !== 200) {
      //    dispatch(getPosterDeleteReasonsThunk())
      //    id && dispatch(getPosterByIdThunk(id))
      //    id && dispatch(getCommentsForPosterThunk(id))
      //    // }
      // }

   }, [id, needToGetCommentsOnly])
   // }, [id, posterStatus])

   // ! тоже не работает
   // useLayoutEffect(() => {
   //    const state = location.state as LocationState;
   //    console.log("🚀 ~ useEffect ~ state.tab === '3' && state?.tab:", state?.tab)
   //    if (state?.tab) {
   //       console.log("🚀 ~ useEffect ~ state.tab === '3' && state?.tab:", state?.tab)
   //       setValue(state.tab);
   //       if (state.tab === '3' && commentsRef.current) {
   //          console.log("🚀 ~ useEffect ~ state.tab === '3' && commentsRef.current:", 'true')
   //          // Используем небольшую задержку для гарантии, что все элементы будут отрендерены
   //          setTimeout(() => {
   //             commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
   //          }, 0);
   //       }
   //       else
   //          console.log("🚀 ~ useEffect ~ state.tab === '3' && commentsRef.current:", 'false')

   //    }
   // }, [location.state]);

   const handleChange = (e: React.SyntheticEvent, newVal: string) => {
      setValue(newVal)
   }

   const handleClickBack = () => {
      navigate(-1)
   }

   const handleDelete = () => {
      // navigate(-1)
      deletePosterByUser(id, deleteReason)
         .then(data => {
            // !
            // const state = location.state as LocationState;
            // if (state.isUpdated === 'true') {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
            // } else {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            // }

            const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
            if (isUpdated === 'true') {
               id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
            } else {
               id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            }
            dispatch(clearUpdInputs())
         })
         .catch(err => console.log(err))
   }

   const handleUpdate = () => {
      // navigate(-1)
      const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
      if (isUpdated === 'true') {
         navigate(`/posters/update/${id}?isupdated=true`)
      } else {
         navigate(`/posters/update/${id}`)
      }

   }

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('form submit')
      rejectPoster(id, rejectReason)
         .then(data => {
            // !
            // const state = location.state as LocationState;
            // if (state.isUpdated === 'true') {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
            // } else {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            // }
            const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
            if (isUpdated === 'true') {
               id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
            } else {
               id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            }
            dispatch(clearUpdInputs())
         })
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
   const handleRejectUpdated = () => {

      console.log("🚀 ~ file: PosterPage.tsx:95 ~ handlePublish ~ id:", id)
      rejectUpdatedPoster(id)
         .then(data => {
            // !
            // const state = location.state as LocationState;
            // if (state.isUpdated === 'true') {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
            // } else {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            // }

            // const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
            // if (isUpdated === 'true') {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
            // } else {
            // id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            // }
            // dispatch(clearUpdInputs())

            dispatch(clearUpdInputs())
            navigate(`/`)

            // navigate(`/posters/${id}`)
            // id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
         })
         .catch(err => console.log(err))
   }

   const handlePublish = () => {

      console.log("🚀 ~ file: PosterPage.tsx:95 ~ handlePublish ~ id:", id)
      publishPoster(id)
         .then(data => {
            // !
            // const state = location.state as LocationState;
            // if (state.isUpdated === 'true') {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
            // } else {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            // }

            const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
            if (isUpdated === 'true') {
               id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
            } else {
               id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            }
            dispatch(clearUpdInputs())
         })
         .catch(err => console.log(err))
   }

   const handlePublishUpdated = () => {

      console.log("🚀 ~ file: PosterPage.tsx:95 ~ handlePublish ~ id:", id)
      publishUpdatedPoster(id)
         .then(data => {
            // !
            // const state = location.state as LocationState;
            // if (state.isUpdated === 'true') {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
            // } else {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            // }

            // const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
            // if (isUpdated === 'true') {
            //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
            // } else {
            // id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
            // }
            // dispatch(clearUpdInputs())
            navigate(`/posters/${id}`)
            id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
         })
         .catch(err => console.log(err))
   }

   const handleSendingComment = () => {
      id && dispatch(getCommentsForPosterThunk(id))
   }

   const handleReject = () => {
      // ! Отклонить объявление
   }


   const AboutUserSection = poster !== null ? <>
      <Typography variant="h6" component="h6" sx={{ pt: 4, textAlign: 'center', pb: 5 }} >
         О пользователе
      </Typography>
      <Box sx={{ display: 'flex', pb: 4 }}>
         {/* sx={{ color: 'system.light' }} */}
         <Typography variant="body1" component="p" sx={{ pr: 4 }} >
            Имя:
         </Typography>
         <Typography maxWidth='200px' variant="body1" component="p" >
            {poster.Users?.name}
         </Typography>
      </Box>
      <Box sx={{ display: 'flex', pb: 4 }}>
         {/* sx={{ color: 'system.light' }} */}
         <Typography variant="body1" component="p" sx={{ pr: 4 }} >
            Email:
         </Typography>
         <Typography maxWidth='200px' variant="body1" component="p" >
            {poster.Users?.email}
         </Typography>
      </Box>
      {/* <Box sx={{ display: 'flex', pb: 4 }}>
      //sx={{ color: 'system.light' }} 
      <Typography variant="body1" component="p" sx={{ pr: 4 }} >
         Телефон:
      </Typography>
      <Typography maxWidth='200px' variant="body1" component="p" >
         {posterAuthor?.phone}
      </Typography>
   </Box> */}
   </> : <></>



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
            <Button onClick={handleClickBack}
               sx={{ mt: { xs: 14, md: 18 } }}
            >
               <KeyboardBackspaceIcon fontSize="large" sx={{ color: "system.main" }} />
            </Button>

            <Typography variant="h1" component='h1' sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 9, md: 8 } }}>{poster.item}</Typography>
            {(isForAdmin() || isForCurrentUser()) && <Typography variant="h3" component='h3' sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 9, md: 12 }, color: '#3817D8' }}>{poster.PosterStatuses?.statusName}</Typography>}
            {/* <a href="#commentsSection">commentsSection</a>
            <Button onClick={() => {
               navigate('/posters/5#commentsSection')
            }}>Click</Button> */}
            {/* <h2 ref={ref} id="box"></h2> */}
            <Box sx={{
               display: 'flex',
               justifyContent: { xs: 'normal', xl: 'space-between' },
               flexDirection: { xs: 'column', xl: 'row' }
            }}>
               <Card
                  sx={{
                     // display: 'flex',
                     // justifyContent: 'center',
                     bgcolor: 'tertiary2.light',
                     width: { xs: '100%', xl: '440px' },
                     marginBottom: { xs: 9, md: 12, xl: 0 }
                  }}
               >
                  <CardMedia
                     component="img"
                     image={DOMAIN + UPLOAD + '/' + poster.photoLink}
                     alt="poster"
                     sx={{
                        // width: '80%',
                        maxHeight: '450px',
                        marginX: 'auto',
                        marginY: '0'
                     }}
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
                     {/* {isNotAdmin === 'true' &&
                        <Box sx={{ display: 'flex', pb: 4 }}>
                           
                           <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                              Пользователь:
                           </Typography>
                           <Typography maxWidth='200px' variant="body1" component="p" >
                              {poster.Users?.name}
                           </Typography>
                        </Box>}
                     {isNotAdmin === 'true' && <Box sx={{ display: 'flex', pb: 4 }}>
                        
                        <Typography variant="body1" component="p" sx={{ pr: 4 }} >
                           Email:
                        </Typography>
                        <Typography maxWidth='200px' variant="body1" component="p" >
                           {poster.Users?.email}
                        </Typography>
                     </Box>} */}

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
                     {AboutUserSection}
                     {/* {isNotAdmin === 'false' && AboutUserSection} */}

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

            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitPublication) && isForAdmin() &&
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
                        // bgcolor: 'system.main',
                        // color: '#fff',
                        // color: 'system.main',
                        // bgcolor: '#fff',
                        bgcolor: '#ff5b5b',
                        color: '#fff',
                        textTransform: 'uppercase',
                        '&:hover': {
                           // bgcolor: 'system.dark'
                           bgcolor: '#fec1c1'
                        }
                     }
                     }
                        type="submit"
                     // onClick={handleReject}
                     >Отклонить</Button>
                  </form>
                  }
               </Box>}

            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.updated) && isForAdmin() &&
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
                     // onClick={handlePublish}
                     onClick={handlePublishUpdated}
                  >Опубликовать</Button>

                  <Button variant='contained' sx={{
                     width: '30%',
                     marginTop: 12,
                     marginBottom: 12,
                     paddingY: 3,
                     // color: 'system.main',
                     // bgcolor: '#fff',
                     bgcolor: '#ff5b5b',
                     color: '#fff',
                     textTransform: 'uppercase',
                     '&:hover': {
                        // bgcolor: '#E5E9F2'
                        bgcolor: '#fec1c1'
                     }
                  }
                  }
                     onClick={handleRejectUpdated}
                  >Отклонить</Button>

                  {/* {isReject && <form onSubmit={handleFormSubmit}>
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
                  }*/}
               </Box>}
            {rejectUpdMessageStore && (('' + poster.userId) === currentUserId) &&
               <Box sx={{ display: 'flex' }}>

                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 12 }, pr: { xs: 1, md: 2 } }}>Сообщение по изменениям: </Typography>
                  <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 12 }, pb: { xs: 9, md: 2 } }}>{rejectUpdMessageStore}</Typography>
               </Box>
            }
            {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitPublication || poster.PosterStatuses.statusName === posterStatuses.published || poster.PosterStatuses.statusName === posterStatuses.updated) && poster.userId === Number(currentUserId) &&
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
            {/* {poster.userId + ' '}
            {currentUserId}
            {rejectUpdMessageStore} */}

            {
               poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitDelete || poster.PosterStatuses.statusName === posterStatuses.deleted) && (isForAdmin() || isForCurrentUser()) &&

               <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 12 }, pr: { xs: 1, md: 2 } }}>Причина удаления: </Typography>
                  <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 12 }, pb: { xs: 9, md: 2 } }}>{deleteReasonStore}</Typography>
               </Box>
            }

            {/* Удалить навсегда до публикации для админа */}
            {/* {poster.PosterStatuses !== null && (poster.PosterStatuses.statusName === posterStatuses.waitPublication) && isForAdmin() &&
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
               </Box>
            } */}

            {/* && (poster.PosterStatuses.statusName === posterStatuses.waitPublication || poster.PosterStatuses.statusName === posterStatuses.published || poster.PosterStatuses.statusName === posterStatuses.updated) && (isForAdmin() || isForCurrentUser()) */}
            {
               poster.PosterStatuses !== null && (isForCurrentUser()) &&
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
                           {/* <FormControlLabel value='найдено' control={<Radio />} label='найдено' /> */}
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
                     >Удалить</Button>
                  </form>

                     // </form>
                  }
               </Box>
            }

            {/* <div ref={commentsRef}></div> */}
            {/* <a href='#Topic1'>Click to jump to the First Topic</a> */}
            <p id='commentsSection'></p>

            {/* <h2 ref={h2ref} id="commentsSection"></h2> */}
            {/* <h2 ref={h2ref}>2. Start editing to see some magic happen!</h2> */}
            {/* <div className="App">
               <h1>Hello CodeSandbox</h1>
               <h2>1. Start editing to see some magic happen!</h2>

               <h2 ref={h2ref}>2. Start editing to see some magic happen!</h2>
               <p style={{ height: "300px" }}></p>
               <h2>3. Start editing to see some magic happen!</h2>
               <p style={{ height: "300px" }}></p>
               <h2>4. Start editing to see some magic happen!</h2>
               <p style={{ height: "300px" }}></p>
               <h2>5. Start editing to see some magic happen!</h2>
               <p style={{ height: "300px" }}></p>
            </div> */}
            <TabContext value={value}>
               <Box sx={{ borderBottom: 1, borderColor: 'divider', pt: { xs: 14, md: 18 } }}>
                  <TabList aria-label="Tabs for book props" onChange={handleChange} textColor="secondary" indicatorColor="secondary" >
                     <Tab sx={{ color: 'system.light', fontSize: '16px', textTransform: 'capitalize' }} label='Описание' value='1' />
                     <Tab sx={{ color: 'system.light', fontSize: '16px', textTransform: 'capitalize' }} label='Адрес' value='2' />
                     {/* <Tab sx={{ color: 'system.light', fontSize: '16px', textTransform: 'capitalize' }} label='Комментарии' value='3' /> */}
                     <Tab sx={{ color: 'system.light', fontSize: '16px', textTransform: 'capitalize' }} label='Комментарии' value='3' />
                     {/* <Tab label='Reviews' value='3' /> */}
                     {/* <LinkTab label="Page One" /> */}
                  </TabList>
               </Box>
               <TabPanel value='1' sx={{ pt: { xs: 9, md: 12 }, fontSize: '16px', mb: 20 }}>{poster.description}</TabPanel>
               <TabPanel value='2' sx={{ pt: { xs: 9, md: 12 }, fontSize: '16px' }}>
                  <MapWithPlacemark address={poster.address} coord0={poster.coord0} coord1={poster.coord1} />

                  {/* <YMaps query={{ apikey: '0a62e602-e671-4320-a847-0c31041bdb2e', suggest_apikey: 'c5bcdde0-db39-444b-831d-07b17c3af76e' }}>

                     <div>
                        Выбранный адрес: {poster.address}

                        <Map
                           defaultState={{ center: [+poster.coord0, +poster.coord1], zoom: 13 }}
                           style={{ width: '100%', height: '400px' }}
                        >
                           <Placemark geometry={[poster.coord0, poster.coord1]} />
                        </Map>


                     </div>
                  </YMaps> */}
               </TabPanel>
               <TabPanel ref={commentsRef} value='3' sx={{ pt: { xs: 9, md: 12 }, fontSize: '16px', mb: 20 }}>
                  {(isAuthStorage === 'true' && isAuthStorage === 'true' && poster.PosterStatuses?.statusName === posterStatuses.published) ? <CommentAdd posterId={poster.id} handleSendingNewComment={handleSendingComment} /> : ''}
                  {/* {(isAuth === 'true' && isNotAdmin === 'true') ?? 'true'} */}
                  {/* <CommentAdd posterId={poster.id} /> */}
                  {/* <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', mb: 5 }}>
                     <TextField sx={{
                        width: { xs: '100%', md: '80%' },
                        bgcolor: '#fff',
                        marginBottom: { xs: 6, md: 0 }
                     }}
                        label="Ваш комментарий" variant="outlined"
                     // value={email} 
                     // onChange={handleEmailChange} 
                     />

                     <Button variant='contained' sx={{
                        width: { xs: '100%', md: '20%' },
                        paddingY: { xs: 4, md: 'inherit' },
                        bgcolor: 'system.main',
                        color: '#fff',
                        textTransform: 'uppercase',
                        '&:hover': {
                           bgcolor: 'system.dark'
                        }
                     }}
                     // onClick={handleSubscribe}
                     >Отправить</Button>
                  </Box> */}

                  {/* {commentsArr.map((comment) => <Comment comment={comment} key={comment.id} />)} */}
                  {/* <a name="#commentsSection"></a> */}

                  {commentsArr.map((comment) => comment.complaintsCount <= 5 && <Comment page="posters" comment={comment} key={comment.id} />)}

                  {/* <Comment comment={commentsArr[1]} id={100000} userId={100000} username="user2" datetime="08/04/2024 18:48" text="comment body 2" /> */}
                  {/* <Box sx={{
                     p: 4,
                     pt: 2,
                     border: 1,
                     borderStyle: 'solid',
                     borderColor: 'system.light',
                     borderRadius: 3,
                     boxShadow: '3px 3px 4px 0px #DDDDDD',
                  }}>
                     <Typography variant="body1" component="p"
                        sx={{ fontWeight: 700 }}
                     >
                        user
                     </Typography>
                     <Typography variant="body1" component="p"
                        sx={{
                           fontSize: 14,
                           color: "#47a",
                        }}
                     >
                        03/04/2024 18:48
                     </Typography>
                     <Typography
                        variant="body1" component="p"
                        sx={{ mt: 2 }}
                     >
                        comment body
                     </Typography>
                  </Box> */}
               </TabPanel>

            </TabContext>
         </Box >)
   }
   else {
      return <><div>no

         {poster !== null ? <p>true</p> : <p>false</p>}
         {status === 'fulfilled' ? <p>true</p> : <p>false</p>}

      </div></>
   }
}
