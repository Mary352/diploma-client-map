import { Box, Button, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useAppDispatch } from "../store/store";
import { addCommentThunk, getCommentsForPosterThunk } from "../store/commentSlice";

type CommentAddProps = {
   posterId: number,
   // handleCommentChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
   handleSendingNewComment: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export const CommentAdd = ({ posterId, handleSendingNewComment }: CommentAddProps) => {

   const [comment, setComment] = useState('');

   const dispatch = useAppDispatch()

   const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      // handleCommentChange(e)
      setComment(e.target.value)
   }

   const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (comment) {
         dispatch(addCommentThunk({
            posterId: posterId,
            comment: comment,
            currentPageLink: window.location.href
         }))
      }
      // handleSendingNewComment(e)

      setComment('')
   }

   return (
      <Box sx={{ display: 'flex', width: '100%', flexWrap: 'wrap', mb: 5 }}>
         <TextField sx={{
            width: { xs: '100%', md: '80%' },
            bgcolor: '#fff',
            marginBottom: { xs: 6, md: 0 }
         }}
            label="Ваш комментарий" variant="outlined"
            value={comment}
            onChange={handleTextChange}
         />

         <Button variant='contained' sx={{
            width: { xs: '100%', md: '20%' },
            paddingY: { xs: 4, md: 'inherit' },
            bgcolor: 'system.main',
            color: '#fff',
            textTransform: 'uppercase',
            '&:hover': {
               bgcolor: 'system.dark'
            }
         }}
            onClick={handleSend}
         >Отправить
            {/* {posterId} */}
         </Button>
      </Box>
   )
}