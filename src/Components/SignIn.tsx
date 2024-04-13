import { Box, Button, TextField, Typography } from "@mui/material"
import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { handleAuthThunk, setEmail, setErrorMsg, setPassword } from "../store/accountSlice";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
   // const [email, setEmail] = useState('');
   // const [pass, setPass] = useState('');

   const errorMsg = useAppSelector(state => state.account.errorMsg)
   const email = useAppSelector(state => state.account.emailInput)
   const pass = useAppSelector(state => state.account.passInput)
   const isAuthorizedState = useAppSelector(state => state.account.isAuthorized)

   const isAuthorized = localStorage.getItem('isAuth')
   const isNotAdmin = localStorage.getItem('isNotAdmin')
   // const isNotAdmin = useAppSelector(state => state.account.isNotAdmin)
   // const users = useAppSelector(state => state.account.users)
   // const users = use
   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   const handleFocus = () => {
      dispatch(setErrorMsg(''))
   };

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // setEmail(e.target.value)
      dispatch(setEmail(e.target.value))
   }

   const handlePassChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // setPass(e.target.value)
      dispatch(setPassword(e.target.value))
   }

   const handleReg = () => {

      navigate('/register')

      dispatch(setEmail(''))
      dispatch(setPassword(''))

   }

   // const handleAuth = () => {
   //    // const foundUser = users.find(user => pass === user.password && email === user.email)

   //    // if (foundUser) {
   //    // dispatch(setCurrentUser(foundUser))
   //    dispatch(handleAuthThunk({
   //       email: email,
   //       password: pass
   //    }))

   //    // !
   //    // navigate('/')

   //    // }
   //    // else {
   //    //    return <></>
   //    // }

   //    dispatch(setEmail(''))
   //    dispatch(setPassword(''))
   // }

   const handleFormSubmitAuth = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // const foundUser = users.find(user => pass === user.password && email === user.email)

      // if (foundUser) {
      // dispatch(setCurrentUser(foundUser))
      dispatch(handleAuthThunk({
         email: email,
         password: pass
      }))

      // !
      // navigate('/')

      // }
      // else {
      //    return <></>
      // }

      dispatch(setEmail(''))
      dispatch(setPassword(''))
   }

   useEffect(() => {
      if (isAuthorizedState || isAuthorized === 'true') {
         navigate('/')
      }

   }, [isAuthorizedState])
   // !
   // if (isAuthorized === 'true') navigate('/')
   //или return <MainPage />

   return (<Box
      sx={{
         maxWidth: '1200px',
         marginX: 'auto',
         // marginY: '0',
         mt: { xs: 14, md: 42, xl: 49 },
         mb: { xs: 14, md: 42, xl: 51 },
         paddingX: { xs: '25px', md: '35px', xl: '40px' }
      }}
   >
      <Box
         sx={{
            maxWidth: '790px',
            marginX: 'auto',
            marginY: '0',
            p: { xs: 0, md: 8 },
            pb: { xs: 0, md: 10 },
            width: { xs: '100%', md: '70%' },
            // pb: { xs: 14, md: 42, xl: 51 },
            border: { md: '1px solid' },
            borderColor: { md: 'bgColor.dark' },
         }}
      >
         <form onSubmit={handleFormSubmitAuth}>
            <Typography
               variant="h2"
               // noWrap
               component="h2"
               sx={{
                  pb: { xs: 3, md: 6 },
                  textTransform: 'uppercase',
                  textAlign: 'center'
               }}
            >
               Вход
            </Typography>

            {errorMsg && <Typography variant="body1" component="p"
               sx={{
                  pb: 6,
                  color: 'red'
               }} >
               {errorMsg}
            </Typography>}
            <TextField sx={{
               pb: 6,
               width: '100%',
               // width: { xs: '100%', md: '80%' },
               bgcolor: '#fff',
               // marginBottom: { xs: 6, md: 0 }
            }}
               required
               onFocus={handleFocus}
               label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
            <TextField sx={{
               pb: 14,
               width: '100%',
               // width: { xs: '100%', md: '80%' },
               bgcolor: '#fff',
               // marginBottom: { xs: 6, md: 0 }
            }}
               required
               onFocus={handleFocus}
               type='password'
               label="Пароль" variant="outlined" value={pass} onChange={handlePassChange} />


            <Button variant='contained' sx={{
               width: '100%',
               paddingY: 3,
               bgcolor: 'system.main',
               color: '#fff',
               textTransform: 'uppercase',
               '&:hover': {
                  bgcolor: 'system.dark'
               }
            }
            }
               // onClick={handleAuth}
               type="submit"
            >Войти</Button>
         </form>
         <Button variant='contained' sx={{
            width: '100%',
            marginTop: 3,
            paddingY: 3,
            bgcolor: '#fff',
            color: 'system.main',
            textTransform: 'uppercase',
            '&:hover': {
               bgcolor: '#E5E9F2'
            }
         }
         }
            onClick={handleReg}
         >Регистрация</Button>
      </Box>
   </Box>)
} 