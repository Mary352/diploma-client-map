import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, ListItemButton, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ErrorMessageComp } from './ErrorMessageComp';
import { ErrorPage } from './ErrorPage';
import { LoadingInfo } from './LoadingInfo';
import { getUsersFilteredThunk, getUsersThunk } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { Comment } from "./Comment";
import { getAllCommentsThunk } from '../store/commentSlice';

export const SuspiciousCommentsList = () => {

   const commentsArr = useAppSelector(state => state.comments.comments)
   const status = useAppSelector(state => state.comments.status)
   const resCode = useAppSelector(state => state.comments.responseCode)
   const errMsg = useAppSelector(state => state.comments.errorMsg)



   const isNotAdmin = localStorage.getItem('isNotAdmin');

   // const [userRole, setUserRole] = useState<string>('any_role')

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   // const handleUserRoleChange = (event: SelectChangeEvent<string>) => {
   //    setUserRole(event.target.value as string)
   // }

   // const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   //    e.preventDefault()
   //    console.log('form submit')
   //    dispatch(getUsersFilteredThunk(userRole))
   // }

   useEffect(() => {

      dispatch(getAllCommentsThunk())

   }, [])

   if (status === 'loading')
      return <LoadingInfo />

   // !
   if (resCode !== 0 && resCode !== 200 && resCode !== 201 && errMsg && status === 'fulfilled')
      return <ErrorPage errorMessage={errMsg} />

   // if (posters.length === 0 && status === 'fulfilled')
   //    return <PosterNotFound />

   if (status === 'rejected')
      return <ErrorMessageComp />

   return (<Box sx={{
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
         Подозрительные комментарии
      </Typography>
      {commentsArr.map((comment) => comment.complaintsCount > 0 && <Comment page='comments' comment={comment} key={comment.id} />)}
      {/* <Box sx={{
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

            <FormControl fullWidth sx={{ pt: 6, pb: 6 }}>
               <InputLabel variant="standard" htmlFor="objectCategory">
                  Роль
               </InputLabel>
               <Select
                  // required
                  onChange={handleUserRoleChange}
                  value={userRole || 'any_role'}
                  inputProps={{
                     name: 'objectCategory',
                     id: 'objectCategory',
                  }}
               >
                  <MenuItem value='any_role'>Не выбрано</MenuItem>
                  <MenuItem value='admin'>admin</MenuItem>
                  <MenuItem value='user'>user</MenuItem>
               </Select>
            </FormControl>

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
            >Подобрать пользователей</Button>
         </form>
      </Box>

      <List sx={{
         width: '100%',
         // maxWidth: 360, 
         bgcolor: 'background.paper',
         mb: 6,
      }}>

         {users.map((user, i) => <ListItemButton key={i}
            sx={{
               // border: '1px solid #000',
               mb: 3,
               borderRadius: '4px',
               boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
            }}
            onClick={() => navigate(`/users/${user.id}`)}
            // onClick={() => console.log('align ok')}
            alignItems="flex-start">
            <ListItemText
               primary={user.name}
               secondary={
                  <React.Fragment>
                     <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body1"
                     // color="text.primary"
                     >
                        Роль: {user.role}
                     </Typography>

                  </React.Fragment>
               }
            />
         </ListItemButton>)}
      </List> */}
   </Box >
   );
}