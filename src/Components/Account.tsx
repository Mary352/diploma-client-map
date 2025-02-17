import { Box, Button, TextField, Typography, InputBase, MenuItem, InputLabel, Select, SelectChangeEvent, FormControl, NativeSelect } from "@mui/material"
import { ChangeEvent, useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleLogoutThunk, } from "../store/accountSlice";
import { useAppSelector, useAppDispatch } from "../store/store";
import { getOneUserThunk, setHiddenData, setRole, setAddress, setName, setPhone, clearInputs, updateUserThunk } from "../store/userSlice";
import { LoadingInfo } from "./LoadingInfo";
import { ErrorMessageComp } from "./ErrorMessageComp";
import { ErrorPage } from "./ErrorPage";
import { deleteUser } from "../server/getUsers";
// import InputBase from '@mui/material/InputBase';
import { MapWithSearch } from "./MapWithSearch"
import { isPhoneValid } from "../types/commonFunctions"
import { HELPER_PHONE_TEXT } from "../types/commonVars"

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   border: '1px solid',
   // borderRight: 'none',
   borderColor: theme.palette.bgColor.dark,
   backgroundColor: '#fff',
   // height: '56px',
   width: '85%',
   [theme.breakpoints.up('xl')]: {
      width: '35%',
   },

   padding: 0,
   // margin: '0 auto',
   '& .MuiInputBase-input': {
      padding: `${theme.spacing(3)} 0px ${theme.spacing(3)} ${theme.spacing(5)}`,
      width: '100%',
   },
}));

// ! rename UserPage
export const Account = () => {
   const { id } = useParams();

   const maxLength60 = 60;
   const maxLength18 = 13;
   const maxLength175 = 175;

   // const [email, setEmail] = useState('');
   // const [hiddenData, setHiddenData] = useState(false);
   const isNotAdmin = localStorage.getItem('isNotAdmin');
   const currentUserId = localStorage.getItem('userId');

   const [selectedAddressCoords, setSelectedAddressCoords] = useState<number[]>([]);
   const [selectedTextAddress, setSelectedTextAddress] = useState<string>('');
   const [isValidPhone, setIsValidPhone] = useState(true);
   const [isValidPhoneText, setIsValidPhoneText] = useState('');

   const isAuthorizedState = useAppSelector(state => state.account.isAuthorized)
   const isLogout = useAppSelector(state => state.account.logout)

   const isAuthorized = localStorage.getItem('isAuth')


   const hiddenData = useAppSelector(state => state.user.hiddenData)
   const user = useAppSelector(state => state.user.user)
   const userEmail = useAppSelector(state => state.user.user?.email)
   const userName = useAppSelector(state => state.user.user?.name)
   const userPhone = useAppSelector(state => state.user.user?.phone)
   const userAddress = useAppSelector(state => state.user.user?.address)
   const userRole = useAppSelector(state => state.user.user?.role)

   const errMsg = useAppSelector(state => state.user.errorMsg)
   const resCode = useAppSelector(state => state.user.responseCode)

   const name = useAppSelector(state => state.user.nameInput)
   const phone = useAppSelector(state => state.user.phoneInput)
   const address = useAppSelector(state => state.user.addressInput)
   const role = useAppSelector(state => state.user.roleInput)


   // const isNotAdminStore = useAppSelector(state => state.account.isNotAdmin)


   const status = useAppSelector(state => state.user.status)

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

   // const name = useAppSelector(state => state.account.nameInput)
   // const email = useAppSelector(state => state.account.emailInput)
   // const pass = useAppSelector(state => state.account.passInput)

   // const users = useAppSelector(state => state.account.users)
   // const currentUser = useAppSelector(state => state.account.currentUser) || (JSON.parse(localStorage.getItem('currentUser') || ''))
   // const users = use
   const dispatch = useAppDispatch()

   const navigate = useNavigate()



   // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   //    // setEmail(e.target.value)
   //    dispatch(setEmail(e.target.value))
   // }

   // const handlePassChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   //    // setPass(e.target.value)
   //    dispatch(setPassword(e.target.value))
   // }

   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // setPass(e.target.value)
      dispatch(setName(e.target.value))
   }

   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = e.target.value;

      dispatch(setPhone(inputValue))

      if (isPhoneValid(inputValue)) {
         setIsValidPhone(isPhoneValid(inputValue))
         setIsValidPhoneText('')
      }
   }

   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setAddress(e.target.value))
   }

   const handleLogout = () => {

      // dispatch(setIsAuth(true))
      dispatch(handleLogoutThunk())
   }
   const handleClickBack = () => {
      navigate(-1)
      dispatch(clearInputs())
      dispatch(setHiddenData(false))
   }

   const showInputs = () => {
      dispatch(setHiddenData(true))
      userRole && dispatch(setRole(userRole))
      userName && dispatch(setName(userName))
      userPhone && dispatch(setPhone(userPhone))

      setIsValidPhone(true);
      setIsValidPhoneText('');
      // setHiddenData(true)
   }
   const hideInputs = () => {
      dispatch(setHiddenData(false))
      dispatch(clearInputs())
      // setHiddenData(true)
      // user?.name && dispatch(setName(user?.name))
      // user?.phone && dispatch(setPhone(user?.phone))
      // selectedTextAddress && dispatch(setAddress(selectedTextAddress))
      // user?.address && dispatch(setAddress(user?.address))
   }

   const saveUserData = () => {
      if (isNotAdmin !== 'false' && phone && !isPhoneValid(phone)) {
         setIsValidPhone(false);
         setIsValidPhoneText(HELPER_PHONE_TEXT)
         return
      }

      setIsValidPhone(true);
      setIsValidPhoneText('');

      dispatch(updateUserThunk({
         id: '' + user?.id,
         name: name,
         phone: phone,
         role: role,
         // address: address,
         address: selectedTextAddress,
         coord0: '' + selectedAddressCoords[0],
         coord1: '' + selectedAddressCoords[1]
      }))
      dispatch(setHiddenData(false))
      dispatch(clearInputs())
      // setHiddenData(true)
   }

   const handleDelete = () => {
      deleteUser('' + user?.id)
         .then(data => { navigate('/users') })
         .catch(err => { console.log(err); navigate('/users') })
      // console.log('delete ok')
   }

   const nameData = <Typography variant="h2" component='h2' sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 9, md: 12 } }}>{user?.name}</Typography>

   const nameInput = (
      <Box>
         <TextField sx={{
            mt: { xs: 6, md: 4 }, mb: { xs: 9, md: 2 },
            width: '45%',
            // width: { xs: '100%', md: '80%' },
            bgcolor: '#fff',
            // marginBottom: { xs: 6, md: 0 }
         }}
            inputProps={{ maxLength: maxLength60 }}
            label="Имя" variant="outlined" value={name} onChange={handleNameChange} />
      </Box>
   )

   const emailData = (
      <Box sx={{ display: 'flex' }}>
         <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Email: </Typography>
         <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 } }}>{userEmail}</Typography>
      </Box>
   )

   // const emailInput = (
   //    <Box>
   //       <TextField sx={{
   //          mt: { xs: 6, md: 4 }, mb: { xs: 9, md: 2 },
   //          width: '45%',
   //          // width: { xs: '100%', md: '80%' },
   //          bgcolor: '#fff',
   //          // marginBottom: { xs: 6, md: 0 }
   //       }}
   //          label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
   //    </Box>
   // )

   const phoneData = (
      <Box sx={{ display: 'flex' }}>
         <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Телефон: </Typography>
         <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 } }}>{userPhone}</Typography>
      </Box>
   )

   const phoneInput = (
      <Box>
         <TextField sx={{
            mt: { xs: 6, md: 4 }, mb: { xs: 9, md: 2 },
            width: '45%',
            // width: { xs: '100%', md: '80%' },
            bgcolor: '#fff',
            // marginBottom: { xs: 6, md: 0 }
         }}
            inputProps={{ maxLength: maxLength18 }}
            error={!isValidPhone}
            helperText={isValidPhoneText}
            label="Телефон" variant="outlined" value={phone} onChange={handlePhoneChange} />
      </Box>
   )

   const addressData = (
      <Box sx={{ display: 'flex' }}>
         <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Адрес: </Typography>
         <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 } }}>{userAddress}</Typography>
      </Box>
   )

   const addressInput = (
      // <Box>
      //    <TextField sx={{
      //       mt: { xs: 6, md: 4 }, mb: { xs: 9, md: 2 },
      //       width: '45%',
      //       // width: { xs: '100%', md: '80%' },
      //       bgcolor: '#fff',
      //       // marginBottom: { xs: 6, md: 0 }
      //    }}
      //       inputProps={{ maxLength: maxLength175 }}
      //       label="Адрес" variant="outlined" value={address} onChange={handleAddressChange} />
      // </Box>

      <>
         Ранее назначенный адрес: {userAddress}
         <MapWithSearch handleSearchChange={handleSearchChange} selectedTextAddress={selectedTextAddress} />

      </>
   )

   const roleData = (
      <Box sx={{ display: 'flex' }}>
         <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Роль: </Typography>
         <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 } }}>{userRole}</Typography>
      </Box>
   )

   const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setRole(event.target.value as string))
   };

   const roleInput = (
      <Box>
         <FormControl>
            <InputLabel variant="standard" htmlFor="role">
               Роль
            </InputLabel>
            <NativeSelect
               onChange={handleRoleChange}
               defaultValue={userRole}
               // value={age}
               inputProps={{
                  name: 'role',
                  id: 'role',
               }}
            >
               <option value='admin'>admin</option>
               <option value='user'>user</option>
            </NativeSelect>
            {/* {menuItems} */}
         </FormControl>
      </Box >
   )

   let userDataBox;
   let userNameBox;

   useEffect(() => {
      dispatch(setHiddenData(false))

      id && id !== 'null' && id !== null && dispatch(getOneUserThunk(id))
      console.log("🚀 ~ file: Account.tsx:212 ~ useEffect ~ id:", id)
      // isNotAdmin = localStorage.getItem('isNotAdmin')
      // console.log("🚀 ~ file: Account.tsx:157 ~ useEffect ~ isNotAdmin:", isNotAdmin)
      // currentUserId = localStorage.getItem('userId')
      // console.log("🚀 ~ file: Account.tsx:159 ~ useEffect ~ currentUserId:", currentUserId)

      // isAuthorized === 'false' || isAuthorized === null
      if (isLogout || isAuthorized === 'false' || isAuthorized === null) {
         console.log("🚀 ~ file: Account.tsx:250 ~ useEffect ~ isLogout:", isLogout)
         navigate('/signin')
      }

   }, [id, isLogout])

   const createPosterLink = <p><Link to='/posters/create'>Создать объявление</Link></p>
   const userPostersLink = <p><Link to='/posters/my'>Мои объявления</Link></p>

   // console.log('isNotAdmin - ' + isNotAdmin)
   // console.log('id === currentUserId - ', id === currentUserId)
   // юзер себя
   if (isNotAdmin === 'true') {
      console.log("🚀 ~ file: Account.tsx:168 ~ Account ~ isNotAdmin:", isNotAdmin)
      userDataBox = <>
         {!hiddenData && createPosterLink}
         {!hiddenData && userPostersLink}
         {emailData}
         {/* {hiddenData ? emailInput : emailData} */}
         {hiddenData ? phoneInput : phoneData}
         {hiddenData ? addressInput : addressData}
         {/* {isNotAdmin} */}
      </>

      userNameBox = <>{hiddenData ? nameInput : nameData}</>

   } else {
      //    userDataBox = <>
      //    {hiddenData ? emailInput : emailData}
      //    {hiddenData ? phoneInput : phoneData}
      //    {hiddenData ? addressInput : addressData}
      // </>
      // админ себя
      if (isNotAdmin === 'false' && id === currentUserId) {
         userDataBox = <>
            {emailData}
            {/* {hiddenData ? emailInput : emailData} */}
            {hiddenData ? phoneInput : phoneData}
            {hiddenData ? addressInput : addressData}
            {roleData}
         </>
         userNameBox = <>{hiddenData ? nameInput : nameData}</>
      }
      else {   // админ юзера
         userDataBox = <>
            {emailData}
            {/* {hiddenData ? emailInput : emailData} */}
            {phoneData}
            {addressData}
            {hiddenData ? roleInput : roleData}
         </>
      }

   }
   // console.log("🚀 ~ file: Account.tsx:180 ~ useEffect ~ userDataBox:", userDataBox)

   const buttonsToStartUpdate = <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button variant='contained' sx={{
         width: '30%',
         paddingY: 3,
         mt: 7,
         bgcolor: 'system.main',
         color: '#fff',
         textTransform: 'uppercase',
         '&:hover': {
            bgcolor: 'system.dark'
         }
      }
      }
         onClick={showInputs}
      >Редактировать</Button>
      {/* <Button variant='contained' sx={{
         width: '30%',
         paddingY: 3,
         mt: 7,
         bgcolor: '#fff',
         color: 'system.main',
         textTransform: 'uppercase',
         '&:hover': {
            bgcolor: 'system.dark'
         }
      }
      }
         onClick={hideInputs}
      >Отмена</Button> */}

      {isNotAdmin === 'false' && userRole !== 'admin' && <Button variant='contained' sx={{
         width: '30%',
         marginTop: 7,
         // marginBottom: 12,
         paddingY: 3,
         bgcolor: '#FC8F32',
         color: '#fff',
         textTransform: 'uppercase',
         '&:hover': {
            bgcolor: '#ec8253'
         }
      }
      }
         onClick={handleDelete}
      >Удалить</Button>}

      {id === currentUserId && <Button variant='contained' sx={{
         width: '30%',
         paddingY: 3,
         mt: 12,
         bgcolor: '#ff5b5b',
         color: '#fff',
         textTransform: 'uppercase',
         '&:hover': {
            bgcolor: '#fec1c1'
         }
      }
      }
         onClick={handleLogout}
      >Выйти</Button>}
   </Box>

   const buttonsToEndUpdate = <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Button variant='contained' sx={{
         width: '30%',
         paddingY: 3,
         mt: 7,
         bgcolor: 'system.main',
         color: '#fff',
         textTransform: 'uppercase',
         '&:hover': {
            bgcolor: 'system.dark'
         }
      }
      }
         onClick={saveUserData}
      >Сохранить</Button>
      <Button variant='contained' sx={{
         width: '30%',
         paddingY: 3,
         mt: 7,
         bgcolor: '#fff',
         color: 'system.main',
         textTransform: 'uppercase',
         '&:hover': {
            bgcolor: 'system.dark'
         }
      }
      }
         type="reset"
         onClick={hideInputs}
      >Отмена</Button>
   </Box>

   if (status === 'loading')
      return <LoadingInfo />

   if ((!user || user === null) && resCode !== 0 && resCode !== 200 && resCode !== 201 && errMsg && status === 'fulfilled') {
      return <ErrorPage errorMessage={errMsg} />
   }

   // let errMsgBox;
   // if (resCode !== 0 && resCode !== 200 && resCode !== 201 && errMsg && status === 'fulfilled') {
   //    errMsgBox = <></>
   // }

   // if ((!user || user === null) && status === 'fulfilled') {
   //    // ! UserNotFound
   //    return <PosterNotFound />
   // }

   if (status === 'rejected')
      return <ErrorMessageComp />

   return (
      <Box sx={{
         maxWidth: '1200px',
         marginX: 'auto',
         marginY: '0',
         paddingX: { xs: '25px', md: '35px', xl: '40px' },
         paddingY: { xs: 14, md: 18 },
      }}>
         <Button onClick={handleClickBack}
            sx={{ mt: { xs: 14, md: 18 } }}
         >
            <KeyboardBackspaceIcon fontSize="large" sx={{ color: "system.main" }} />
         </Button>
         <Typography variant="h1" component='h1' sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 9, md: 12 } }}>
            {(isNotAdmin === 'false' && id !== currentUserId) ? 'Страница пользователя' : 'Профиль'}

         </Typography>

         {/* {nameData} */}
         {userNameBox}
         {/* <Typography variant="h2" component='h2' sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 9, md: 12 } }}>{user?.name}</Typography> */}
         <Box>
            {userDataBox}
         </Box>

         {!hiddenData ? buttonsToStartUpdate : buttonsToEndUpdate}

      </Box>
   )
}