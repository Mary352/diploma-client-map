import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { handleAuthThunk, setPhone, setEmail, setName, setPassword, setAddress, regUserThunk, setResponseCode, setErrorMsg } from "../store/accountSlice";
import { useNavigate } from "react-router-dom";
import { YMaps, Map, SearchControl } from "@pbe/react-yandex-maps";
import { MapWithSearch } from "./MapWithSearch";

export const Register = () => {
   // const [email, setEmail] = useState('');
   // const [pass, setPass] = useState('');
   // ---YMaps
   const [selectedAddressCoords, setSelectedAddressCoords] = useState<number[]>([]);
   const [selectedTextAddress, setSelectedTextAddress] = useState<string>('');


   const email = useAppSelector(state => state.account.emailInput)
   const pass = useAppSelector(state => state.account.passInput)
   const name = useAppSelector(state => state.account.nameInput)
   const phone = useAppSelector(state => state.account.phoneInput)
   const address = useAppSelector(state => state.account.addressInput)
   const responseCode = useAppSelector(state => state.account.responseCode)
   const isAuthorizedState = useAppSelector(state => state.account.isAuthorized)

   const [isValidEmail, setIsValidEmail] = useState(true);
   const [isValidEmailText, setIsValidEmailText] = useState('');

   const errorMsg = useAppSelector(state => state.account.errorMsg)

   const isAuthorized = localStorage.getItem('isAuth')
   const isNotAdmin = localStorage.getItem('isNotAdmin')
   // const users = useAppSelector(state => state.account.users)

   // const [errorTextEmail, setErrorTextEmail] = useState('');
   const maxLength60 = 60;
   const maxLength18 = 18;
   const maxLength175 = 175;
   // const emailMaxLength = 3;
   // const emailCharacterCount = email.length;
   // const emailHelperText = `${emailCharacterCount} / ${emailMaxLength} символов`

   const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

   const handleSearchChange = (event: any) => {
      // setAddress(event.target?.value);
      console.log('--------1----------')
      // console.log('handleSearchChange', event.target?.value)
      // console.log('handleSearchChange target', event.target)
      console.log('handleSearchChange event', event)
      console.log('handleSearchChange typeof event', typeof event)
      const selectedItem = event.get('target').getResultsArray()[0];
      console.log("🚀 ~ file: newch.html:42 ~ selectedItem:", selectedItem)
      const selectedAddress2 = selectedItem?.properties.get('text');
      setSelectedTextAddress(selectedAddress2)
      console.log("🚀 ~ file: newch.html:44 ~ selectedAddress:", selectedAddress2)

      // const coords = event.geometry?._coordinates;
      // console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ coords:", coords)
      if (selectedItem) {
         const coords = selectedItem.geometry?._coordinates;
         setSelectedAddressCoords(coords)
         console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ coords:", coords)
         console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ typeof coords:", typeof coords)
         console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ typeof selectedAddressCoords:", typeof selectedAddressCoords)
         console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ selectedAddressCoords:", selectedAddressCoords)
      }
      console.log('--------1----------')
   };

   const dispatch = useAppDispatch()

   const navigate = useNavigate()

   const handleFocus = () => {
      dispatch(setErrorMsg(''))
   };

   const isEmailValid = (email: string) => {
      return emailRegex.test(email);
   };

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // const inputValue = e.target.value;
      // // setEmail(e.target.value)
      // dispatch(setEmail(inputValue))

      const inputValue = e.target.value;
      // if (isEmailValid(inputValue)) {
      dispatch(setEmail(inputValue))
      // }
      // setIsValidEmail(isEmailValid(inputValue));
      if (isEmailValid(inputValue)) {
         setIsValidEmail(isEmailValid(inputValue))
         setIsValidEmailText('')
      }
   }

   const handlePassChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // setPass(e.target.value)
      dispatch(setPassword(e.target.value))
   }
   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setName(e.target.value))
   }
   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setPhone(e.target.value))
   }
   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setAddress(e.target.value))
   }

   const handleAuth = () => {
      navigate('/signin')

      dispatch(setEmail(''))
      dispatch(setPassword(''))
      dispatch(setName(''))
      dispatch(setPhone(''))
      dispatch(setAddress(''))
   }

   // const handleReg = () => {

   //    dispatch(regUserThunk({
   //       email: email,
   //       password: pass,
   //       name: name,
   //       phone: phone,
   //       address: address
   //    }))
   // }

   const handleFormSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!isEmailValid(email)) {
         setIsValidEmail(false);
         setIsValidEmailText('Введите правильный email')
      }
      else {
         setIsValidEmail(true);
         setIsValidEmailText('')

         dispatch(regUserThunk({
            email: email,
            password: pass,
            name: name,
            phone: phone,
            address: selectedTextAddress,
            coord0: '' + selectedAddressCoords[0],
            coord1: '' + selectedAddressCoords[1]
         }))
      }
   }

   useEffect(() => {
      // if (isAuthorizedState || isAuthorized === 'true') {
      //    navigate('/')
      // }

      if (responseCode === 201 || isAuthorizedState || isAuthorized === 'true') {
         navigate('/signin')

         dispatch(setResponseCode(0))
         dispatch(setEmail(''))
         dispatch(setPassword(''))
         dispatch(setName(''))
         dispatch(setPhone(''))
         dispatch(setAddress(''))
      }

   }, [responseCode])
   // !
   // if (isAuthorized) navigate('/') 
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

         <form onSubmit={handleFormSubmitRegister}>
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
               Регистрация
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
               inputProps={{ maxLength: maxLength60 }}
               // error={emailHelperText !== ''}
               // helperText={emailHelperText}
               error={!isValidEmail}
               helperText={isValidEmailText}
               label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
            <TextField sx={{
               pb: 6,
               width: '100%',
               // width: { xs: '100%', md: '80%' },
               bgcolor: '#fff',
               // marginBottom: { xs: 6, md: 0 }
            }}
               required
               onFocus={handleFocus}
               type='password'
               label="Пароль" variant="outlined" value={pass} onChange={handlePassChange} />
            <TextField sx={{
               pb: 6,
               width: '100%',
               // width: { xs: '100%', md: '80%' },
               bgcolor: '#fff',
               // marginBottom: { xs: 6, md: 0 }
            }}
               required
               onFocus={handleFocus}
               inputProps={{ maxLength: maxLength60 }}
               label="Имя" variant="outlined" value={name} onChange={handleNameChange} />
            <TextField sx={{
               pb: 6,
               width: '100%',
               // width: { xs: '100%', md: '80%' },
               bgcolor: '#fff',
               // marginBottom: { xs: 6, md: 0 }
            }}
               required
               onFocus={handleFocus}
               inputProps={{ maxLength: maxLength18 }}
               placeholder="375291285623"
               label="Телефон" variant="outlined" value={phone} onChange={handlePhoneChange} />
            {/* <TextField sx={{

               pb: 14,
               width: '100%',
               // width: { xs: '100%', md: '80%' },
               bgcolor: '#fff',
               // marginBottom: { xs: 6, md: 0 }
            }}
               required
               onFocus={handleFocus}
               inputProps={{ maxLength: maxLength175 }}
               placeholder="г. Минск, ул. К. Цеткин, 54-80"
               label="Адрес" variant="outlined" value={address} onChange={handleAddressChange} /> */}

            {/* <YMaps query={{ apikey: '0a62e602-e671-4320-a847-0c31041bdb2e', suggest_apikey: 'c5bcdde0-db39-444b-831d-07b17c3af76e' }}>
               <div>
                  Выбранный адрес: {selectedTextAddress}

                  <Map
                     defaultState={{ center: [53.90880299307702, 27.558588205078124], zoom: 9 }}
                     style={{ width: '100%', height: '400px' }}>
                     <SearchControl
                        options={{ float: 'right', provider: 'yandex#map' }}
                        onChange={handleSearchChange} />
                  </Map>
               </div>
            </YMaps> */}

            <MapWithSearch handleSearchChange={handleSearchChange} selectedTextAddress={selectedTextAddress} />
            <Button variant='contained' sx={{
               width: '100%',
               marginY: 3,
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
            // onClick={handleReg}
            >Зарегистрироваться</Button>
         </form>
         <Button variant='contained' sx={{
            width: '100%',
            // marginTop: 3,
            paddingY: 3,
            bgcolor: '#fff',
            color: 'system.main',
            textTransform: 'uppercase',
            '&:hover': {
               bgcolor: '#E5E9F2'
            }
         }
         }
            onClick={handleAuth}
         >Вход</Button>
      </Box>
   </Box>)
} 