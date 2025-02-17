import { Box, Typography, TextField } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../store/store";
import { useState } from "react";
import { setPhone } from "../store/posterSlice"
import { setPhoneAcc } from "../store/accountSlice"
import { isPhoneValid } from "../types/commonFunctions";
import { HELPER_PHONE_TEXT } from "../types/commonVars"


type PhoneInputProps = {
   isValidPhone: boolean,
   setIsValidPhone: React.Dispatch<React.SetStateAction<boolean>>
   isValidPhoneText: string,
   setIsValidPhoneText: React.Dispatch<React.SetStateAction<string>>,
   page: 'register' | 'posters'
}

export const PhoneInput = ({ isValidPhone, setIsValidPhone, isValidPhoneText, setIsValidPhoneText, page }: PhoneInputProps) => {
   const phoneRegister = useAppSelector(state => state.account.phoneInput)
   const phonePoster = useAppSelector(state => state.posters.phoneInput)


   // const phoneRegex = /^(?:\+|\d)[\d]{9,}\d$/;
   const maxLength18 = 13;

   // const [isValidPhone, setIsValidPhone] = useState(true);
   // const [isValidPhoneText, setIsValidPhoneText] = useState('');

   const dispatch = useAppDispatch()

   // const isPhoneValid = (phone: string) => {
   //    return phoneRegex.test(phone);
   // };

   const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputValue = e.target.value;

      page === 'posters' ? dispatch(setPhone(inputValue)) : dispatch(setPhoneAcc(inputValue))

      if (isPhoneValid(inputValue)) {
         setIsValidPhone(isPhoneValid(inputValue))
         setIsValidPhoneText('')
      }
   }

   return (
      <TextField sx={{
         pb: 6,
         width: '100%',
         // width: { xs: '100%', md: '80%' },
         bgcolor: '#fff',
         // marginBottom: { xs: 6, md: 0 }
      }}
         required
         inputProps={{ maxLength: maxLength18 }}
         placeholder="+375291285623"
         error={!isValidPhone}
         helperText={isValidPhoneText}
         label="Телефон" variant="outlined" value={page === 'posters' ? phonePoster : phoneRegister} onChange={handlePhoneChange}
      />)
}