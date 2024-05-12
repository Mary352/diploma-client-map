import React, { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, Drawer, SvgIcon, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { getNotificationsThunk } from '../store/posterSlice';

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="up" ref={ref} {...props} />;
});

export const Header = () => {
   const navigate = useNavigate()

   const isAuthorized = useAppSelector(state => state.account.isAuthorized)
   const notificationsInfo = useAppSelector(state => state.posters.notificationsInfo)

   const [openNotifications, setOpenNotifications] = React.useState(false);

   const dispatch = useAppDispatch()

   const navigateToAccount = () => {
      const isAuth = localStorage.getItem('isAuth')
      console.log("🚀🚀 ~ file: Header.tsx:52 ~ navigateToAccount ~ isAuth:", isAuth)
      const currentUserId = localStorage.getItem('userId')
      console.log("🚀🚀 ~ file: Header.tsx:53 ~ navigateToAccount ~ currentUserId:", currentUserId)
      if (isAuth === 'true') {
         navigate(`/users/${currentUserId}`)
      }
      else {
         navigate('/signin')
      }
   }

   const handleClickOpenNotifications = () => {
      setOpenNotifications(true);
   };

   const handleCloseNotifications = () => {
      setOpenNotifications(false);
   };

   useEffect(() => {
      dispatch(getNotificationsThunk())
   }, [])

   const NotificationsIconWithBadge = <Badge color="error" variant="dot">
      <NotificationsIcon sx={{ fill: '#313037' }} />
   </Badge>

   return (
      <Box sx={{
         display: 'flex',
         justifyContent: {
            xs: 'space-between',
            // xl: 'normal'
         },
         maxWidth: '1200px',
         marginX: 'auto',
         marginY: '0',
         paddingX: { xs: '25px', md: '35px', xl: '40px' },
         borderBottom: '1px solid',
         borderColor: 'bgColor.dark',
         paddingY: 2
      }}
      >

         <Box sx={{ alignSelf: 'center' }}>
            <Button onClick={() => navigate('/')} sx={{
               width: '100%',
            }}>

               <Typography variant="h2" component='h2'
                  sx={{
                     // pt: { xs: 6, md: 8 },
                     // pb: { xs: 9, md: 12 }
                     padding: 0,
                     margin: 0,
                     textTransform: 'initial'
                  }}
               >
                  {process.env.REACT_APP_NAME}
               </Typography>

            </Button>
         </Box>

         <Box
            sx={{
               display: 'flex',
               // alignSelf: 'center'
            }}>
            {localStorage.getItem('isAuth') === 'true' && localStorage.getItem('isNotAdmin') === 'true' &&
               <><Button onClick={handleClickOpenNotifications}>
                  {notificationsInfo.length > 0 ? NotificationsIconWithBadge : <NotificationsIcon sx={{ fill: '#313037' }} />}
                  {/* <NotificationsIcon sx={{ fill: '#313037' }} /> */}
                  {/* {NotificationsIconWithBadge} */}
                  {/* <Badge color="error" variant="dot">
                  <NotificationsIcon sx={{ fill: '#313037' }} />
               </Badge> */}
               </Button>
                  <Dialog
                     fullScreen
                     open={openNotifications}
                     onClose={handleCloseNotifications}
                     TransitionComponent={Transition}
                  >
                     <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                           <IconButton
                              edge="start"
                              color="inherit"
                              onClick={handleCloseNotifications}
                              aria-label="close"
                           >
                              <CloseIcon />
                           </IconButton>
                           <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                              Уведомления
                           </Typography>
                           {/* <Button autoFocus color="inherit" onClick={handleCloseNotifications}>
                        save
                     </Button> */}
                        </Toolbar>
                     </AppBar>
                     {/* <Box sx={{
                  // display: 'flex', 
                  maxWidth: '1200px',
                  marginX: 'auto',
                  marginY: '0',
                  p: 4,
                  pt: 2,
                  // mb: 4,
                  border: 1,
                  borderStyle: 'solid',
                  borderColor: 'system.light',
                  borderRadius: 3,
                  boxShadow: '3px 3px 4px 0px #DDDDDD',
               }}>
                  <Typography variant="body1" component="p"
                     sx={{
                        // fontWeight: 700,
                        // alignSelf: 'end' 
                        alignSelf: 'center'
                     }}
                  >
                     У вас новый комментарий под объявлением "ирыварви рапгвшп выгшпаруквпаи". Перейти по ссылке: <a href='#'>http://localhost:3000/posters/3</a>
                  </Typography>
               </Box> */}
                     <List
                     // sx={{
                     //    maxWidth: '1200px',
                     //    marginX: 'auto',
                     //    marginY: '0',
                     //    paddingX: { xs: '25px', md: '35px', xl: '40px' }
                     // }}
                     >
                        {/* {console.log()} */}
                        {notificationsInfo && notificationsInfo.length > 0 && notificationsInfo.map((notif, i) => <ListItemButton key={i}
                           sx={{
                              // border: '1px solid #000',
                              mb: 3,
                              borderRadius: '4px',
                              boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                           }}
                           onClick={() => {
                              setOpenNotifications(false);
                              navigate(`/posters/${notif.posterId}`)
                           }}
                           // onClick={() => console.log('align ok')}
                           alignItems="flex-start">
                           <ListItemText
                              primary={'Новые комментарии под объявлением "' + notif.posterItem + '"'}
                           />
                        </ListItemButton>)}

                        {/* <ListItemButton>
                           <ListItemText primary="У вас новый комментарий под объявлением 'ирыварви рапгвшп выгшпаруквпаи'." />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton>
                           <ListItemText
                              primary="Default notification ringtone"
                              secondary="Tethys"
                           />
                        </ListItemButton> */}
                     </List>
                  </Dialog></>}
            <Button onClick={navigateToAccount}>
               <PersonOutlineOutlinedIcon sx={{ fill: '#313037' }} />
            </Button>
         </Box>

         {/* <Box sx={{
            display: {
               // xs: 'none',
               xl: 'block'
            },

            alignSelf: 'center'
         }}
         > 
         <Button onClick={navigateToAccount}>
            <NotificationsIcon sx={{ fill: '#313037' }} />
         </Button>
 </Box> 
  <Box sx={{
            display: {
               // xs: 'none',
               xl: 'block'
            },

            alignSelf: 'center'
         }}
         > 
         <Button onClick={navigateToAccount}>
            <PersonOutlineOutlinedIcon sx={{ fill: '#313037' }} />
         </Button>
         {/* </Box> */}
      </Box >
   );
}
