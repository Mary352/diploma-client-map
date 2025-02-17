import { Box, Button, FormControl, InputLabel, NativeSelect, TextField, Typography, Select, SelectChangeEvent, Checkbox, FormControlLabel, MenuItem } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../store/store"
import { Link, useNavigate, useParams } from "react-router-dom"
import { clearUpdInputs, createPosterThunk, getItemCategoriesThunk, getPosterByIdThunk, setAddress, setBreed, setDateOfAction, setDescription, setIsPet, setItem, setItemStatus, setObjectCategory, setPhone, setPhotoFile, setResponseCode, updatePosterThunk } from "../store/posterSlice"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form';
import { PosterToCreate } from "../types/types"
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MapWithSearch } from "./MapWithSearch"
import { isPhoneValid } from "../types/commonFunctions"
import { HELPER_PHONE_TEXT } from "../types/commonVars"
import { HashLink } from "react-router-hash-link"

// type Props = {
//    errorMessage: string
// }

export const PosterUpdatePage = () => {
   // !
   // const item = useAppSelector(state => state.posters.itemInput)
   const breed = useAppSelector(state => state.posters.breedInput)
   // const isPet = useAppSelector(state => state.posters.isPetInput)
   const objectCategory = useAppSelector(state => state.posters.objectCategoryInput)
   const description = useAppSelector(state => state.posters.descriptionInput)
   // const itemStatus = useAppSelector(state => state.posters.itemStatusInput)
   // const dateOfAction = useAppSelector(state => state.posters.dateOfActionInput)
   // const photoFile = useAppSelector(state => state.posters.photoFileInput)
   const phone = useAppSelector(state => state.posters.phoneInput)
   // const selectedTextAddress = useAppSelector(state => state.posters.addressInput)
   // const selectedAddressCoords = useAppSelector(state => state.posters.coordsInput)

   // ---YMaps
   const [selectedAddressCoords, setSelectedAddressCoords] = useState<number[]>([]);
   const [selectedTextAddress, setSelectedTextAddress] = useState<string>('');

   const [isValidPhone, setIsValidPhone] = useState(true);
   const [isValidPhoneText, setIsValidPhoneText] = useState('');

   const { id } = useParams();

   const poster = useAppSelector((state) => state.posters.poster)

   // const [item, setItem] = useState<string>('')
   // const [isPet, setIsPet] = useState<boolean>(false)
   // const [itemStatus, setItemStatus] = useState<string>('')
   // const [dateOfAction, setDateOfAction] = useState<string>('')

   // const [breed, setBreed] = useState<string | null | undefined>(poster?.breed)
   // const [objectCategory, setObjectCategory] = useState<string | undefined>(poster?.ObjectCategories?.category)
   // const [description, setDescription] = useState<string | undefined>(poster?.description)
   const [photoFile, setPhotoFile] = useState<File | null>(null)
   // const [phone, setPhone] = useState<string | undefined>(poster?.phone)
   const [address, setAddress] = useState<string | undefined>(poster?.address)

   const maxLength60 = 60;
   const maxLength100 = 100;
   const maxLength1000 = 1000;
   const maxLength175 = 175;
   const maxLength18 = 13;

   // const item = useAppSelector(state => state.posters.itemInput)
   // const breed = useAppSelector(state => state.posters.breedInput)
   // const isPet = useAppSelector(state => state.posters.isPetInput)
   // const objectCategory = useAppSelector(state => state.posters.objectCategoryInput)
   // const description = useAppSelector(state => state.posters.descriptionInput)
   // const itemStatus = useAppSelector(state => state.posters.itemStatusInput)
   // const dateOfAction = useAppSelector(state => state.posters.dateOfActionInput)
   // const photoFile = useAppSelector(state => state.posters.photoFileInput)
   // const phone = useAppSelector(state => state.posters.phoneInput)
   // const address = useAppSelector(state => state.posters.addressInput)

   // const posterCategories = useAppSelector(state => state.posters.posterCategories)
   const petCategories = useAppSelector(state => state.posters.petCategories)
   const itemCategories = useAppSelector(state => state.posters.itemCategories)

   const responseCode = useAppSelector(state => state.posters.responseCode)
   // const isAuthorizedState = useAppSelector(state => state.posters.isAuthorized)

   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   // const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   //    dispatch(setItem(e.target.value))
   // }
   const handleBreedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setBreed(e.target.value))
      // setBreed(e.target.value)
   }
   // const handleIsPetChange = (e: ChangeEvent<HTMLInputElement>) => {
   //    dispatch(setIsPet(e.target.checked))
   //    if (!e.target.checked) {
   //       dispatch(setBreed(null))
   //    }
   // }
   // ChangeEvent<HTMLSelectElement>
   const handleObjectCategoryChange = (event: SelectChangeEvent<string>) => {
      dispatch(setObjectCategory(event.target.value as string))
      // setObjectCategory(event.target.value as string)
      // dispatch(setObjectCategory(e.target.value))
   }
   const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setDescription(e.target.value))
      // setDescription(e.target.value)
   }
   // const handleItemStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
   //    dispatch(setItemStatus(event.target.value as string))
   // }
   const handleDateOfActionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // dispatch(setDateOfAction(e.target.value))
   }
   // const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
   //    const file = event.target.files && event.target.files[0];
   //    if (file) {
   //       setSelectedFile(file);
   //    }
   // };
   const handlePhotoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      // dispatch(setPhotoFile(e.target.value))
      // const file = event.target.files && event.target.files[0];
      // if (file) {
      //    console.log("🚀 ~ file: PosterCreatePage.tsx:73 ~ handlePhotoFileChange ~ file:", file.name)
      //    console.log("🚀 ~ file: PosterCreatePage.tsx:73 ~ photoFile ~ photoFile name:", photoFile?.name)
      //    dispatch(setPhotoFile(file))
      // }
      console.log("🚀 ~ file: PosterCreatePage.tsx:80 ~ handleChange ~ file:", event.target.files)
      const file = event.target.files && event.target.files[0];
      if (file) setSelectedFile(file)
   }

   // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
   //    console.log("🚀 ~ file: PosterCreatePage.tsx:80 ~ handleChange ~ file:", event.target.files)
   //    const file = event.target.files && event.target.files[0];
   //    if (file) setSelectedFile(file)
   // }

   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // // dispatch(setPhone(e.target.value))
      // setPhone(e.target.value)
      const inputValue = e.target.value;

      dispatch(setPhone(inputValue))

      // setPhone(inputValue)

      if (isPhoneValid(inputValue)) {
         setIsValidPhone(isPhoneValid(inputValue))
         setIsValidPhoneText('')
      }
   }
   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // dispatch(setAddress(e.target.value))
      setAddress(e.target.value)
   }

   const handleNavPosters = () => {
      navigate('/posters')

      // dispatch(setResponseCode(0))
      // dispatch(setItem(''))
      // dispatch(setBreed(null))
      // dispatch(setIsPet(false))
      // dispatch(setObjectCategory(''))
      // dispatch(setDescription(''))
      // dispatch(setItemStatus('потеряно'))
      // dispatch(setDateOfAction(null))
      // dispatch(setPhotoFile(null))
      // dispatch(setPhone(''))
      // dispatch(setAddress(''))
   }

   const handleSearchChange = (event: any) => {
      // setAddress(event.target?.value);
      console.log('--------1----------')
      // console.log('handleSearchChange', event.target?.value)
      // console.log('handleSearchChange target', event.target)
      // console.log('handleSearchChange event', event)
      // console.log('handleSearchChange typeof event', typeof event)
      const selectedItem = event.get('target').getResultsArray()[0];
      // console.log("🚀 ~ file: newch.html:42 ~ selectedItem:", selectedItem)
      const selectedAddress2 = selectedItem?.properties.get('text');
      setSelectedTextAddress(selectedAddress2)
      // console.log("🚀 ~ file: newch.html:44 ~ selectedAddress:", selectedAddress2)

      // const coords = event.geometry?._coordinates;
      // console.log("🚀 ~ file: MapWithSearch.tsx:32 ~ handleSearchChange ~ coords:", coords)
      if (selectedItem) {
         const coords = selectedItem.geometry?._coordinates;
         setSelectedAddressCoords(coords)
         console.log("🚀 ~ handleSearchChange ~ coords:", coords)


      }
      console.log('--------1----------')
   };

   const selectItemCategoryInput = <FormControl fullWidth sx={{ pt: 4, pb: 6, }}>
      <InputLabel variant="standard" htmlFor="objectCategory">
         Категория объекта
      </InputLabel>
      <Select
         // required
         onChange={handleObjectCategoryChange}
         value={objectCategory}
         inputProps={{
            name: 'objectCategory',
            id: 'objectCategory',
         }}
      >
         {/* <option value='потеряно'>потеряно</option> */}
         {/* <MenuItem value={10}>Ten</MenuItem> */}
         {itemCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
         {/* <option value='потеряно'>потеряно</option>
<option value='найдено'>найдено</option> */}
      </Select>
      {/* {menuItems} */}
   </FormControl>

   const selectPetCategoryInput = <FormControl fullWidth sx={{ pt: 4, pb: 6, }}>
      <InputLabel variant="standard" htmlFor="objectCategory">
         Категория объекта
      </InputLabel>
      <Select
         // required
         onChange={handleObjectCategoryChange}
         value={objectCategory}
         inputProps={{
            name: 'objectCategory',
            id: 'objectCategory',
         }}
      >
         {/* <option value='потеряно'>потеряно</option> */}
         {/* <MenuItem value={10}>Ten</MenuItem> */}
         {petCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
         {/* <option value='потеряно'>потеряно</option>
<option value='найдено'>найдено</option> */}
      </Select>
      {/* {menuItems} */}
   </FormControl>

   useEffect(() => {
      // if (isAuthorizedState || isAuthorized === 'true') {
      //    navigate('/')
      // }
      console.log('!!!!!!!!!!! useEffect UPD POSTER')
      dispatch(clearUpdInputs())
      // ! from wind loc search check
      const isUpdated = new URL(window.location.href).searchParams.get('isupdated')
      if (isUpdated === 'true') {
         id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))
      } else {
         id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
      }
      // id && dispatch(getPosterByIdThunk({ id: id, isUpdated: 'true' }))

      // const state = location.state as LocationState;
      // if (state.isUpdated === 'true') {
      //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: state.isUpdated }))
      // } else {
      //    id && dispatch(getPosterByIdThunk({ id: id, isUpdated: undefined }))
      // }


      console.log('Category ', poster?.ObjectCategories?.category)
      console.log('Category ', poster?.item)

      dispatch(getItemCategoriesThunk())

      // setItem(poster?.item || '')
      // setIsPet(poster?.isPet || false)
      // setItemStatus(poster?.itemStatus || '')
      // setDateOfAction(poster?.dateOfAction || '')
      // dispatch(setItemStatus('потеряно'))
      // setBreed(poster?.breed)
      // if (poster?.isPet) {
      //    setObjectCategory(poster?.ObjectCategories?.category || 'Прочие')
      // } else {
      //    setObjectCategory(poster?.ObjectCategories?.category || 'Другое')
      // }
      // setDescription(poster?.description)
      // setPhone(poster?.phone)
      // setAddress(poster?.address)

      // console.log('123', poster?.ObjectCategories?.category)

      // if (poster?.ObjectCategories?.category) {
      //    dispatch(setObjectCategory(poster?.ObjectCategories?.category))
      // }

      if (responseCode === 201) {
         navigate('/posters/my')

         // dispatch(setResponseCode(0))
         // dispatch(setItem(''))
         // dispatch(setBreed(null))
         // dispatch(setIsPet(false))
         // dispatch(setObjectCategory(''))
         // dispatch(setDescription(''))
         // dispatch(setItemStatus('потеряно'))
         // dispatch(setDateOfAction(null))
         // dispatch(setPhotoFile(null))
         // dispatch(setPhone(''))
         // dispatch(setAddress(''))
      }

   }, [id, responseCode])

   const [selectedFile, setSelectedFile] = useState<File | null>(null)

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('form submit')
      // dispatch()
      // const formattedDateOfAction = dateOfAction ? dateOfAction.format('YYYY-MM-DD') : '';
      // console.log("🚀 ~ file: PosterCreatePage.tsx:180 ~ handleFormSubmit ~ formattedDateOfAction:", formattedDateOfAction)
      // console.log("🚀 ~ file: PosterCreatePage.tsx:180 ~ handleFormSubmit ~ formattedDateOfAction:", new Date(formattedDateOfAction))

      // console.log("🚀 ~ file: PosterUpdatePage.tsx:194 ~ handleFormSubmit ~ id:", id)
      if (phone && !isPhoneValid(phone)) {
         setIsValidPhone(false);
         setIsValidPhoneText(HELPER_PHONE_TEXT)
         return
      }

      setIsValidPhone(true);
      setIsValidPhoneText('');

      dispatch(updatePosterThunk({
         id: id,
         breed: breed,
         objectCategory: objectCategory,
         description: description,
         photo: selectedFile,
         // address: address,
         address: selectedTextAddress,
         phone: phone,
         coord0: '' + selectedAddressCoords[0],
         coord1: '' + selectedAddressCoords[1]
      }))
   }

   return (
      <Box sx={{
         maxWidth: '1200px',
         marginX: 'auto',
         marginY: '0',
         paddingX: { xs: '25px', md: '35px', xl: '40px' },
      }}
      >
         <Typography
            variant="h2"
            // noWrap
            component="h2"
            sx={{
               marginTop: 6,
               pb: { xs: 3, md: 10 },
               textTransform: 'uppercase',
               textAlign: 'center'
            }}
         >
            Изменение объявления
         </Typography>
         <Box sx={{
            maxWidth: '800px',
            marginX: 'auto',
            marginY: '0',
            paddingX: { xs: '25px', md: '35px', xl: '40px' },
         }}
         >
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
               <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Тема: </Typography>
                  <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 } }}>{poster?.item}</Typography>
               </Box>
               {/* {selectItemStatusInput} */}
               <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Статус: </Typography>
                  <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 } }}>{poster?.itemStatus}</Typography>
               </Box>
               <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Дата события: </Typography>
                  <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 } }}>{poster?.dateOfAction}</Typography>
               </Box>
               {/* handleIsPetChange */}

               {/* {isPet ? 'y' : 'n'} */}
               {poster?.isPet ? <FormControlLabel
                  sx={{ pb: 6 }}
                  disabled
                  label="Это животное?"
                  control={<Checkbox checked={true} />}
               /> :
                  <FormControlLabel
                     sx={{ pb: 6 }}
                     disabled
                     label="Это животное?"
                     control={<Checkbox checked={false} />}
                  />
               }

               {poster?.isPet && <Box>
                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Порода: </Typography>
                  <TextField sx={{
                     pb: 6,
                     width: '100%',
                     // width: { xs: '100%', md: '80%' },
                     bgcolor: '#fff',
                     // marginBottom: { xs: 6, md: 0 }
                  }}

                     // label="Порода" 
                     inputProps={{ maxLength: maxLength60 }}
                     variant="outlined" value={breed} onChange={handleBreedChange} />
               </Box>}

               <Box sx={{ display: 'flex' }}>
                  <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Текущая категория (оставьте поле пустым, если не меняете категорию): </Typography>
                  <Typography variant="body1" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 } }}>{objectCategory}</Typography>
               </Box>

               {poster?.isPet ? selectPetCategoryInput : selectItemCategoryInput}
               {/* <FormControl fullWidth sx={{ pt: 12, pb: 6, }}>
                  <InputLabel variant="standard" htmlFor="objectCategory">
                     Категория объекта
                  </InputLabel>
                  <Select
                     // required
                     onChange={handleObjectCategoryChange}
                     value={objectCategory}
                     inputProps={{
                        name: 'objectCategory',
                        id: 'objectCategory',
                     }}
                  >
                     {posterCategories.map((category, i) => <MenuItem key={i} value={category}>{category}</MenuItem>)}
                     
                  </Select>
               </FormControl> */}
               <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Описание: </Typography>
               <TextField sx={{
                  pb: 6,
                  width: '100%',
                  // width: { xs: '100%', md: '80%' },
                  bgcolor: '#fff',
                  // marginBottom: { xs: 6, md: 0 }
               }}
                  // required
                  // label="Описание" 
                  inputProps={{ maxLength: maxLength1000 }}
                  variant="outlined" value={description} onChange={handleDescriptionChange} />
               {/* <TextField sx={{
               pb: 6,
               width: '100%',
               // width: { xs: '100%', md: '80%' },
               bgcolor: '#fff',
               // marginBottom: { xs: 6, md: 0 }
            }}
               label="Описание" variant="outlined" required value={itemStatus} onChange={handleItemStatusChange} /> */}
               {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                     <DatePicker
                        sx={{ pb: 6 }}
                        label="Выберите дату события"
                        value={dayjs(dateOfAction)}
                        maxDate={dayjs()}
                        onChange={(newValue) => dispatch(setDateOfAction(newValue))}
                     />
                  </DemoContainer>
               </LocalizationProvider> */}
               <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Телефон: </Typography>
               <TextField sx={{
                  pb: 6,
                  width: '100%',
                  // width: { xs: '100%', md: '80%' },
                  bgcolor: '#fff',
                  // marginBottom: { xs: 6, md: 0 }
               }}

                  // label="Телефон"
                  inputProps={{ maxLength: maxLength18 }}
                  error={!isValidPhone}
                  helperText={isValidPhoneText}
                  variant="outlined" value={phone} onChange={handlePhoneChange} />
               {/* <TextField sx={{
                  pb: 6,
                  width: '100%',
                  // width: { xs: '100%', md: '80%' },
                  bgcolor: '#fff',
                  // marginBottom: { xs: 6, md: 0 }
               }}
                  // required
                  placeholder="375291285623"
                  label="Телефон" variant="outlined" value={phone} onChange={handlePhoneChange} /> */}
               <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Адрес: </Typography>
               {/* <TextField sx={{

                  pb: 14,
                  width: '100%',
                  // width: { xs: '100%', md: '80%' },
                  bgcolor: '#fff',
                  // marginBottom: { xs: 6, md: 0 }
               }}
                  // required
                  inputProps={{ maxLength: maxLength175 }}
                  placeholder="г. Минск, ул. К. Цеткин, 54-80"
                  // label="Адрес" 
                  variant="outlined" value={address} onChange={handleAddressChange} /> */}

               {/* <input type="file" onChange={handleChange} /> */}
               {/* {selectedFile && selectedFile.name} */}
               Ранее назначенный адрес: {poster?.address}
               <MapWithSearch handleSearchChange={handleSearchChange} selectedTextAddress={selectedTextAddress} />

               <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Выберите фото (или отставьте пустым, если не меняете): </Typography>
               <input style={{ marginBottom: '56px' }} type="file" onChange={handlePhotoFileChange} />

               <Button type="submit" variant='contained' sx={{
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
               // onClick={handleReg}
               >Подтвердить изменения</Button>
               <Button variant='contained' sx={{
                  width: '100%',
                  marginTop: 9,
                  marginBottom: 7,
                  paddingY: 3,
                  bgcolor: '#fff',
                  color: 'system.main',
                  textTransform: 'uppercase',
                  '&:hover': {
                     bgcolor: 'system.dark'
                  }
               }
               }
                  onClick={handleNavPosters}
               >Перейти на страницу объявлений</Button>
               {/* <Link to='/posters'>Объявления</Link> */}
            </form>
         </Box>
      </Box>)
}