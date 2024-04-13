
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { PosterCardProps } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { DOMAIN, UPLOAD } from '../types/commonVars';

export const PosterCard = ({ poster }: PosterCardProps) => {
   console.log('Image: ', DOMAIN + UPLOAD + '/' + poster.photoLink)
   const isNotAdmin = localStorage.getItem('isNotAdmin')
   const currentUserId = localStorage.getItem('userId')

   // const BOOK_TEST = {
   //    "title": "Google SketchUp Cookbook",
   //    "subtitle": "Practical Recipes and Essential Techniques",
   //    "isbn13": "9780596155117",
   //    "price": "$8.88",
   //    "image": "https://itbook.store/img/books/9780596155117.png",
   //    "url": "https://itbook.store/books/9780596155117"
   // }

   // const BOOK_TEST_LONG_TITLE = {
   //    "title": "Professional SharePoint 2010 Branding and User Interface Design",
   //    "subtitle": "",
   //    "isbn13": "9780470584644",
   //    "price": "$3.98",
   //    "image": "https://itbook.store/img/books/9780470584644.png",
   //    "url": "https://itbook.store/books/9780470584644"
   // }

   const navigate = useNavigate()

   return (
      // <Grid item xs={12} md={3} sx={{
      //    mx: 4,
      //    my: 6,
      //    maxWidth: 300
      // }}>
      <Box
         sx={{
            my: { xs: '18px', md: 6 },
            mx: { md: 4 },
            width: {
               xs: '100%',
               md: 'calc(100%/2 - 32px)',
               xl: `calc(100%/3 - 32px)`
            },
            maxHeight: '1200px'

         }}
      >

         <CardActionArea onClick={() => { navigate(`/posters/${poster.id}`) }}
            sx={{
               height: '100%',
               width: '100%',
            }}>
            <Card
               sx={{
                  bgcolor: 'tertiary2.main',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',

               }}
               key={poster.id}>
               {/* <CardActionArea
                  sx={{
                     display: 'flex',
                     flexDirection: 'column'

                  }}
               > */}

               <CardMedia
                  component="img"
                  // height="100%"
                  image={DOMAIN + UPLOAD + '/' + poster.photoLink}
                  alt="poster"
                  sx={{
                     width: '100%',
                     // width: '100%',
                     height: '60%',
                     objectFit: 'contain',
                     marginX: 'auto',
                     marginY: '0',
                     // bgcolor: '#00ff00'
                  }}
               />
               <CardContent
                  sx={{
                     bgcolor: '#fff',
                     flexGrow: 1,
                     pt: 5,
                     pb: { xs: 8, md: 10 }
                  }}
               >
                  <Typography variant="h3" component="h3"
                     sx={{ pb: 2 }}
                  >
                     {poster.item}
                  </Typography>
                  <Typography
                     sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "4",
                        WebkitBoxOrient: "vertical",
                        // whiteSpace: 'nowrap',
                        // overflow: 'hidden',
                        // textOverflow: 'ellipsis', // многоточие
                        // width: '100%',
                        bgcolor: '#fff',
                        flexGrow: 1,
                        pt: 5,
                        pb: { xs: 8, md: 10 }
                     }}
                     variant="body1" component='p' color="system.light">
                     {poster.description}
                     {/* Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qu */}
                  </Typography>
               </CardContent>
               <CardContent
                  sx={{
                     bgcolor: '#fff',
                     alignSelf: 'normal',
                     paddingY: 0,
                     display: 'flex',
                     flexDirection: 'row',
                     justifyContent: 'space-between'
                  }}
               >
                  <Typography variant="h6" component="h6"
                     sx={{}}>
                     {poster.dateOfAction}
                  </Typography>
                  <Typography variant="h6" component="h6"
                     sx={{ color: 'red' }}>
                     {poster.itemStatus}
                  </Typography>
               </CardContent>
               <CardContent
                  sx={{
                     bgcolor: '#fff',
                     alignSelf: 'normal',
                     paddingY: 0,
                     // display: 'flex',
                     // flexDirection: 'row',
                     // justifyContent: 'space-between'
                  }}>
                  {(isNotAdmin === 'false' || Number(currentUserId) === poster.userId) &&
                     <Typography variant="body2" component='p'
                        sx={{
                           pt: { xs: 6, md: 8 },
                           // pb: { xs: 9, md: 12 },
                           color: '#3817D8',
                           textAlign: 'center'
                        }}>
                        {poster.PosterStatuses?.statusName}
                     </Typography>}
               </CardContent>
               {/* </CardActionArea> */}
            </Card>
         </CardActionArea>
      </Box >

      // </Grid>
   );
}