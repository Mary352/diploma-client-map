import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Button, Drawer, SvgIcon, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

export const Header = () => {
   const navigate = useNavigate()

   const isAuthorized = useAppSelector(state => state.account.isAuthorized)

   const navigateToAccount = () => {
      const isAuth = localStorage.getItem('isAuth')
      // console.log("🚀 ~ file: Header.tsx:52 ~ navigateToAccount ~ isAuth:", isAuth)
      const currentUserId = localStorage.getItem('userId')
      // console.log("🚀 ~ file: Header.tsx:53 ~ navigateToAccount ~ currentUserId:", currentUserId)
      if (isAuth === 'true') {
         navigate(`/users/${currentUserId}`)
      }
      else {
         navigate('/signin')
      }
   }

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
                  iFind
               </Typography>

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
         </Box>
      </Box>
   );
}
