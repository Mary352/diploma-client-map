import { Box, Button, FormControl, InputLabel, NativeSelect, TextField, Typography, Select, SelectChangeEvent, Checkbox, FormControlLabel, MenuItem } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../store/store"
import { Link, useNavigate } from "react-router-dom"
import { createPosterThunk, getItemCategoriesThunk, setAddress, setBreed, setDateOfAction, setDescription, setIsPet, setItem, setItemStatus, setObjectCategory, setPhone, setPhotoFile, setResponseCode } from "../store/posterSlice"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm, SubmitHandler } from 'react-hook-form';
import { PosterToCreate } from "../types/types"
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MapWithSearch } from "./MapWithSearch"
import { YMaps, Map, SearchControl, Placemark } from '@pbe/react-yandex-maps';

// type Props = {
//    errorMessage: string
// }

export const PosterCreatePage = () => {
   const item = useAppSelector(state => state.posters.itemInput)
   const breed = useAppSelector(state => state.posters.breedInput)
   const isPet = useAppSelector(state => state.posters.isPetInput)
   const objectCategory = useAppSelector(state => state.posters.objectCategoryInput)
   const description = useAppSelector(state => state.posters.descriptionInput)
   const itemStatus = useAppSelector(state => state.posters.itemStatusInput)
   const dateOfAction = useAppSelector(state => state.posters.dateOfActionInput)
   const photoFile = useAppSelector(state => state.posters.photoFileInput)
   const phone = useAppSelector(state => state.posters.phoneInput)
   const address = useAppSelector(state => state.posters.addressInput)

   // const [petCategories, setPetCategories] = useState<string[]>([])
   // const [itemCategories, setItemCategories] = useState<string[]>([])

   // const posterCategories = useAppSelector(state => state.posters.posterCategories)
   const petCategories = useAppSelector(state => state.posters.petCategories)
   const itemCategories = useAppSelector(state => state.posters.itemCategories)

   const responseCode = useAppSelector(state => state.posters.responseCode)
   // const isAuthorizedState = useAppSelector(state => state.posters.isAuthorized)

   const [showDateEmptyError, setShowDateEmptyError] = useState(false)
   const [showAddressEmptyError, setShowAddressEmptyError] = useState(false)

   const maxLength60 = 60;
   const maxLength100 = 100;
   const maxLength1000 = 1000;
   const maxLength175 = 175;
   const maxLength18 = 18;

   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const handleItemChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setItem(e.target.value))
   }
   const handleBreedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setBreed(e.target.value))
   }
   const handleIsPetChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setIsPet(e.target.checked))
      if (!e.target.checked) {
         dispatch(setBreed(null))
         dispatch(setObjectCategory('Другое'))
      }
      if (e.target.checked) {
         dispatch(setObjectCategory('Прочие'))
      }
   }
   // ChangeEvent<HTMLSelectElement>
   const handleObjectCategoryChange = (event: SelectChangeEvent<string>) => {
      dispatch(setObjectCategory(event.target.value as string))
      // dispatch(setObjectCategory(e.target.value))
   }
   const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setDescription(e.target.value))
   }
   const handleItemStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch(setItemStatus(event.target.value as string))
   }

   const handlePhotoFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      // dispatch(setPhotoFile(e.target.value))
      // const file = event.target.files && event.target.files[0];
      // if (file) {
      //    console.log("🚀 ~ file: PosterCreatePage.tsx:73 ~ handlePhotoFileChange ~ file:", file.name)
      //    console.log("🚀 ~ file: PosterCreatePage.tsx:73 ~ photoFile ~ photoFile name:", photoFile?.name)
      //    dispatch(setPhotoFile(file))
      // }
      // console.log("🚀 ~ file: PosterCreatePage.tsx:80 ~ handleChange ~ file:", event.target.files)
      const file = event.target.files && event.target.files[0];
      if (file) setSelectedFile(file)
   }

   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch(setPhone(e.target.value))
   }
   // const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   //    dispatch(setAddress(e.target.value))
   // }

   const handleNavPosters = () => {
      navigate('/posters')

      dispatch(setResponseCode(0))
      dispatch(setItem(''))
      dispatch(setBreed(null))
      dispatch(setIsPet(false))
      dispatch(setObjectCategory(''))
      dispatch(setDescription(''))
      dispatch(setItemStatus('потеряно'))
      dispatch(setDateOfAction(null))
      dispatch(setPhotoFile(null))
      dispatch(setPhone(''))
      // dispatch(setAddress(''))
   }

   // ---YMaps
   const [selectedAddressCoords, setSelectedAddressCoords] = useState<number[]>([]);
   const [selectedTextAddress, setSelectedTextAddress] = useState<string>('');

   // const searchControlRef = useRef<any>(null);

   // const onResultShow = () => {
   //    if (searchControlRef.current) {
   //       // Тут вызвать метод который наиболее подходит
   //       // https://tech.yandex.ru/maps/jsapi/doc/2.1/ref/reference/control.SearchControl-docpage/
   //       console.log('-------SHOW--------');
   //       console.log(searchControlRef.current.getResultsArray());
   //       console.log('-------SHOW end--------');
   //    }
   // };

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

         setShowAddressEmptyError(false)
      }
      console.log('--------1----------')
   };

   // const handleSearchSubmit = (ymaps: any, map: any) => {
   //    ymaps.geocode(address).then((res: any) => {
   //       const firstGeoObject = res.geoObjects.get(0);
   //       const coordinates = firstGeoObject.geometry.getCoordinates();
   //       map.panTo(coordinates, { flying: true });
   //    });
   // };
   // ---YMaps end

   useEffect(() => {
      // if (isAuthorizedState || isAuthorized === 'true') {
      //    navigate('/')
      // }
      dispatch(setItemStatus('потеряно'))
      dispatch(getItemCategoriesThunk())
      dispatch(setObjectCategory('Другое'))

      if (responseCode === 201) {
         navigate('/posters')

         dispatch(setResponseCode(0))
         dispatch(setItem(''))
         dispatch(setBreed(null))
         dispatch(setIsPet(false))
         dispatch(setObjectCategory('Другое'))
         dispatch(setDescription(''))
         dispatch(setItemStatus('потеряно'))
         dispatch(setDateOfAction(null))
         dispatch(setPhotoFile(null))
         dispatch(setPhone(''))
         dispatch(setAddress(''))
      }

      // const itemCategories = posterCategories.filter((category) => category.)
      // setItemCategories()

   }, [responseCode])

   // const { register, handleSubmit, formState: { errors } } = useForm<PosterToCreate>();
   // const onSubmit: SubmitHandler<PosterToCreate> = (data) => {
   //    console.log(data);
   // };

   const selectItemStatusInput = <FormControl fullWidth sx={{ pb: 6, }}>
      <InputLabel variant="standard" htmlFor="itemStatus">
         Статус объекта (потеряно/найдено)
      </InputLabel>
      <NativeSelect
         required
         onChange={handleItemStatusChange}
         defaultValue={itemStatus}
         inputProps={{
            name: 'itemStatus',
            id: 'itemStatus',
         }}
      >
         <option value='потеряно'>потеряно</option>
         <option value='найдено'>найдено</option>
      </NativeSelect>
      {/* {menuItems} */}
   </FormControl>

   const selectItemCategoryInput = <FormControl fullWidth sx={{ pt: 6, pb: 6, }}>
      <InputLabel variant="standard" htmlFor="objectCategory">
         Категория объекта
      </InputLabel>
      <Select
         // required
         onChange={handleObjectCategoryChange}
         value={objectCategory || 'Другое'}
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

   const selectPetCategoryInput = <FormControl fullWidth sx={{ pt: 6, pb: 6, }}>
      <InputLabel variant="standard" htmlFor="objectCategory">
         Категория объекта
      </InputLabel>
      <Select
         // required
         onChange={handleObjectCategoryChange}
         value={objectCategory || 'Прочие'}
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

   const [selectedFile, setSelectedFile] = useState<File | null>(null)

   const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('form submit')
      // dispatch()
      console.log("🚀 ~ handleFormSubmit ~ dateOfAction:", dateOfAction)
      console.log("🚀 ~ handleFormSubmit ~ dateOfAction:", !!dateOfAction)
      console.log("🚀 ~ handleFormSubmit ~ selectedTextAddress:", selectedTextAddress)

      if (!dateOfAction) {
         setShowDateEmptyError(true)
         return
      }
      const formattedDateOfAction = dateOfAction ? dateOfAction.format('YYYY-MM-DD') : '';
      console.log("🚀 ~ file: PosterCreatePage.tsx:180 ~ handleFormSubmit ~ formattedDateOfAction:", formattedDateOfAction)
      console.log("🚀 ~ file: PosterCreatePage.tsx:180 ~ handleFormSubmit ~ formattedDateOfAction === 'Invalid Date':", formattedDateOfAction === 'Invalid Date')
      // console.log("🚀 ~ file: PosterCreatePage.tsx:180 ~ handleFormSubmit ~ formattedDateOfAction:", new Date(formattedDateOfAction))
      if (formattedDateOfAction === 'Invalid Date') {
         setShowDateEmptyError(true)
         return
      }
      if (!selectedTextAddress) {
         setShowAddressEmptyError(true)
         return
      }

      dispatch(createPosterThunk({
         photo: selectedFile,
         // address: address,
         address: selectedTextAddress,
         breed: breed,
         dateOfAction: formattedDateOfAction,
         description: description,
         isPet: isPet ? 'true' : '',
         item: item,
         itemStatus: itemStatus,
         objectCategory: objectCategory,
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
            Создание объявления
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
               <TextField sx={{
                  pb: 6,
                  width: '100%',
                  // width: { xs: '100%', md: '80%' },
                  bgcolor: '#fff',
                  // marginBottom: { xs: 6, md: 0 }
               }}
                  required
                  inputProps={{ maxLength: maxLength100 }}
                  // {...register('item', { required: true })}
                  label="Тема" variant="outlined" value={item} onChange={handleItemChange} />
               {/* {errors.item && <span style={{ paddingBottom: '25px' }}>Поле обязательно для заполнения</span>} */}
               {selectItemStatusInput}
               {/* handleIsPetChange */}
               {/* <Checkbox
                  label="Required"
                  checked={isPet}
                  onChange={handleIsPetChange}
                  inputProps={{ 'aria-label': 'controlled' }}
               /> */}
               <FormControlLabel
                  sx={{ pb: 6 }}
                  label="Это животное?"
                  control={<Checkbox checked={isPet} onChange={handleIsPetChange} />}
               />
               {isPet && <TextField sx={{
                  pb: 6,
                  width: '100%',
                  // width: { xs: '100%', md: '80%' },
                  bgcolor: '#fff',
                  // marginBottom: { xs: 6, md: 0 }
               }}

                  inputProps={{ maxLength: maxLength60 }}
                  label="Порода" variant="outlined" value={breed} onChange={handleBreedChange} />}
               {isPet ? selectPetCategoryInput : selectItemCategoryInput}
               <TextField sx={{
                  pb: 6,
                  width: '100%',
                  // width: { xs: '100%', md: '80%' },
                  bgcolor: '#fff',
                  // marginBottom: { xs: 6, md: 0 }
               }}
                  inputProps={{ maxLength: maxLength1000 }}
                  label="Описание" variant="outlined" required value={description} onChange={handleDescriptionChange} />
               {/* <TextField sx={{
               pb: 6,
               width: '100%',
               // width: { xs: '100%', md: '80%' },
               bgcolor: '#fff',
               // marginBottom: { xs: 6, md: 0 }
            }}
               label="Описание" variant="outlined" required value={itemStatus} onChange={handleItemStatusChange} /> */}
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                     {/* <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} /> */}
                     <DatePicker
                        sx={{ pb: 6 }}
                        label="Выберите дату события"
                        value={dayjs(dateOfAction)}
                        maxDate={dayjs()}
                        onChange={(newValue) => {
                           dispatch(setDateOfAction(newValue))
                           setShowDateEmptyError(false)
                        }}
                     />
                  </DemoContainer>
               </LocalizationProvider>
               <TextField sx={{
                  pb: 6,
                  width: '100%',
                  // width: { xs: '100%', md: '80%' },
                  bgcolor: '#fff',
                  // marginBottom: { xs: 6, md: 0 }
               }}
                  required
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
                  inputProps={{ maxLength: maxLength175 }}
                  placeholder="г. Минск, ул. К. Цеткин, 54-80"
                  label="Адрес" variant="outlined" value={address} onChange={handleAddressChange} /> */}

               {/* <YMaps query={{ apikey: '0a62e602-e671-4320-a847-0c31041bdb2e', suggest_apikey: 'c5bcdde0-db39-444b-831d-07b17c3af76e' }}>
                  <div>
                     Выбранный адрес: {selectedTextAddress}
                     <Map
                        defaultState={{ center: [53.90880299307702, 27.558588205078124], zoom: 9 }}
                        style={{ width: '100%', height: '400px' }}
                     >
                        <SearchControl
                           options={{ float: 'right', provider: 'yandex#map' }}
                           // state={{ value: address }}
                           // onResultShow={onResultShow}
                           onChange={handleSearchChange}
                        />
                     </Map>
                  </div>
               </YMaps> */}

               <MapWithSearch handleSearchChange={handleSearchChange} selectedTextAddress={selectedTextAddress} />

               {/* <input type="file" onChange={handleChange} /> */}
               {/* {selectedFile && selectedFile.name} */}
               <Typography variant="body2" component='p' sx={{ pt: { xs: 6, md: 4 }, pb: { xs: 9, md: 2 }, pr: { xs: 1, md: 2 } }}>Выберите фото: </Typography>
               <input style={{ marginBottom: '56px' }} type="file" onChange={handlePhotoFileChange} />

               {showDateEmptyError && <Typography variant="body1" component='p' sx={{
                  // pt: { xs: 6, md: 4 }, 
                  pb: { xs: 9, md: 2 },
                  pr: { xs: 1, md: 2 },
                  color: 'red'
               }}>Выберите дату события</Typography>}

               {showAddressEmptyError && <Typography variant="body1" component='p' sx={{
                  // pt: { xs: 6, md: 4 }, 
                  pb: { xs: 9, md: 2 },
                  pr: { xs: 1, md: 2 },
                  color: 'red'
               }}>Выберите адрес события</Typography>}

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
               >Отправить</Button>
               {/* {(selectedTextAddress || !!dateOfAction) ? <Button type="submit" variant='contained' sx={{
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
               >Отправить</Button> : <Button type="submit" variant='contained' sx={{
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
                  disabled
               // onClick={handleReg}
               >Отправить</Button>} */}

               <Button variant='contained' sx={{
                  width: '100%',
                  marginTop: 9,
                  marginBottom: 7,
                  paddingY: 3,
                  bgcolor: '#fff',
                  color: 'system.main',
                  textTransform: 'uppercase',
                  '&:hover': {
                     bgcolor: '#E5E9F2'
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