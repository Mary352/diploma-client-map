// ErrorMessage
import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

type Props = {
   errorMessage?: string
}

export const ErrorPage = (props?: Props) => {

   const isNotAdmin = localStorage.getItem('isNotAdmin');

   return (
      <Box sx={{
         maxWidth: '1200px',
         marginX: 'auto',
         marginY: '0',
         paddingX: { xs: '25px', md: '35px', xl: '40px' },
      }}
      >
         <Typography variant="h1" component='h1'
            sx={{
               pt: { xs: 6, md: 8 },
               pb: { xs: 9, md: 12 },
            }}
         >
            {props?.errorMessage ? props.errorMessage : 'Страница не найдена'}
         </Typography>

         <Box sx={{ display: 'flex', pb: 4 }}>
            {/* sx={{ color: 'system.light' }} */}
            <Typography variant="body1" component="p" sx={{ pr: 4 }} >
               Вернуться на <Link to='/'>Главную</Link>
            </Typography>
         </Box>
      </Box>)
}