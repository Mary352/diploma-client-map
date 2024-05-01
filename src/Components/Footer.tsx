import { Box, Typography } from "@mui/material"
import { APP_NAME } from "../types/commonVars"

export const Footer = () => {
   return (
      <Box
         sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'space-between' },
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'stretch' },
            maxWidth: '1200px',
            marginX: 'auto',
            marginY: '0',
            marginTop: 20,
            paddingX: { xs: '25px', md: '35px', xl: '40px' },
            paddingY: { xs: 10, md: 9 },
            borderTop: '1px solid',
            borderColor: 'bgColor.dark'
         }}
      >
         <Typography
            variant="body1"
            // noWrap
            component="p"
            sx={{
               color: 'system.light',
               marginBottom: 6,
            }}
         >
            ©2024 {APP_NAME}
         </Typography>
         <Typography
            variant="body1"
            // noWrap
            component="p"
            sx={{
               color: 'system.light'
            }}
         >
            All rights reserved
         </Typography>
      </Box>
   )
}