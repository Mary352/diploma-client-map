import { Box, Button, IconButton, Snackbar, TextField, Tooltip, Typography } from "@mui/material"
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { StoreMallDirectory } from "@mui/icons-material";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch } from "../store/store";
import { addComplaintThunk, approveCommentThunk, deleteCommentThunk, getCommentsForPosterThunk, updCommentThunk } from "../store/commentSlice";
import { CommentServer } from "../types/types";
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Link } from "react-router-dom";

type CommentProps = {
   // id: number,
   // username: string,
   // datetime: string,
   // text: string,
   // userId: number | null,
   comment: CommentServer,
   page: 'comments' | 'posters'
}

export const Comment = ({ comment, page }: CommentProps) => {

   const isNotAdmin = localStorage.getItem('isNotAdmin');
   const isAuth = localStorage.getItem('isAuth');
   const currentUserId = localStorage.getItem('userId');

   const [open, setOpen] = useState(false);
   const [newText, setNewText] = useState('');
   const [openCommentEditor, setOpenCommentEditor] = useState(false);
   const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

   const dispatch = useAppDispatch()

   const handleClickOpen = () => {
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleOk = () => {
      dispatch(addComplaintThunk(comment.id))

      setOpen(false);
      setIsOpenSnackbar(true);
   };

   const handleCancel = () => {
      setOpen(false);
   };

   // const handleClickSnackbar = () => {
   //    setIsOpenSnackbar(true);
   // };

   const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }

      setIsOpenSnackbar(false);
   };

   const handleDeleteComment = () => {
      dispatch(deleteCommentThunk(comment.id))
      // dispatch(getCommentsForPosterThunk('1'))
   }

   const handleEditComment = () => {
      setOpenCommentEditor(true);
      setNewText(comment.comment)
   }

   const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setNewText(e.target.value)
   }

   const handleSubmitEditComment = () => {
      dispatch(updCommentThunk({ commentId: comment.id, text: newText }))
      setOpenCommentEditor(false);
      // dispatch(getCommentsForPosterThunk('1'))
   }

   const handleCancelEditComment = () => {
      setOpenCommentEditor(false);
      // dispatch(updCommentThunk({ commentId: comment.id, text: newText }))
      // dispatch(getCommentsForPosterThunk('1'))
   }

   const handleApproveComment = () => {
      // setOpenCommentEditor(false);
      dispatch(approveCommentThunk(comment.id))
      // dispatch(getCommentsForPosterThunk('1'))
   }

   const ComplaintIcon = <>
      <Tooltip title="Пожаловаться">
         <IconButton onClick={handleClickOpen} sx={{ p: 0, pr: 2 }}>
            <ReportProblemOutlinedIcon sx={{
               fill: '#707070',
               fontSize: 'medium',
               // #313037
               // ":hover": '#c6cb3b',
            }} />
         </IconButton>
      </Tooltip>
      <Dialog
         open={open}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">
            {"Отправка жалобы"}
         </DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">
               Пожаловаться на ненормативную лексику данного пользователя?
            </DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleOk}>ОК</Button>
            <Button onClick={handleCancel}>Отменить</Button>
         </DialogActions>
      </Dialog>

      <Snackbar sx={{ width: '20%' }}
         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
         open={isOpenSnackbar}
         autoHideDuration={3000}
         onClose={handleCloseSnackbar}
         message="Жалоба отправлена"
      />


   </>

   const VerifiedBadge = <Tooltip title="Одобрено" sx={{ alignSelf: 'center', display: "flex" }}>
      {/* <IconButton onClick={handleApproveComment} sx={{ p: 0, pr: 2 }}> */}
      <VerifiedIcon sx={{
         p: 0,
         pr: 2,
         // fontSize: 'medium', 
         justifyContent: 'center',
         alignItems: 'center',
         color: 'green'
      }} />
      {/* </IconButton> */}
   </Tooltip>

   const ManageCommentTools = <>
      {/* {comment.approved && VerifiedBadge} */}

      <Tooltip title="Редактировать">
         <IconButton onClick={handleEditComment} sx={{ p: 0, pr: 2 }}>
            <EditIcon sx={{ fontSize: 'medium' }} />
         </IconButton>
      </Tooltip>

      <Tooltip title="Удалить">
         <IconButton onClick={handleDeleteComment} sx={{ p: 0, pr: 2 }}>
            <DeleteIcon sx={{ fontSize: 'medium' }} />
         </IconButton>
      </Tooltip>
   </>

   const AdminManageCommentTools = <>
      {page === 'comments' && <Tooltip title="Одобрить">
         <IconButton onClick={handleApproveComment} sx={{ p: 0, pr: 2 }}>
            <VerifiedIcon sx={{ fontSize: 'medium', color: 'green' }} />
         </IconButton>
      </Tooltip>}

      <Tooltip title="Удалить">
         <IconButton onClick={handleDeleteComment} sx={{ p: 0, pr: 2 }}>
            <DeleteIcon sx={{ fontSize: 'medium' }} />
         </IconButton>
      </Tooltip>
      {page === 'comments' && <Typography
         // maxWidth='200px' 
         variant="body1" component="span"
         sx={{ p: 0, pr: 2, color: 'red', alignSelf: 'center' }}
      >
         {comment.complaintsCount}
      </Typography>}
   </>

   const CommentText = <Typography
      // maxWidth='200px' 
      variant="body1" component="p"
      sx={{ mt: 2 }}
   >
      {comment.comment}
   </Typography>

   const PosterLink = <Typography
      // maxWidth='200px' 
      variant="body1" component="p"
      sx={{ mt: 4 }}
   >
      <Link to={`/posters/${comment.posterId}`}>Перейти к объявлению</Link>
   </Typography>

   const EditCommentBlock = <Box sx={{ display: 'flex' }}>
      <TextField sx={{
         width: { xs: '100%', md: '80%' },
         bgcolor: '#fff',
         mt: 4,
         // marginBottom: { xs: 6, md: 0 }
      }}
         label="Ваш комментарий" variant="outlined"
         value={newText}
         onChange={handleTextChange}
      />
      <Tooltip title="Отправить">
         <IconButton onClick={handleSubmitEditComment}
         // sx={{ p: 0, pr: 2 }}
         >
            <SendIcon
            // sx={{ fontSize: 'medium' }} 
            />
         </IconButton>
      </Tooltip>
      <Tooltip title="Отменить изменение">
         <IconButton onClick={handleCancelEditComment}
         // sx={{ p: 0, pr: 2 }}
         >
            <CancelIcon
            // sx={{ fontSize: 'medium' }} 
            />
         </IconButton>
      </Tooltip>
   </Box>

   return (
      <Box sx={{
         // display: 'flex', 
         p: 4,
         pt: 2,
         mb: 4,
         border: 1,
         borderStyle: 'solid',
         borderColor: 'system.light',
         borderRadius: 3,
         boxShadow: '3px 3px 4px 0px #DDDDDD',
      }}>
         {/* sx={{ color: 'system.light' }} */}
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" component="p"
               sx={{
                  fontWeight: 700,
                  // alignSelf: 'end' 
                  alignSelf: 'center'
               }}
            >
               {comment.Users?.name}
            </Typography>
            <Box sx={{
               display: {
                  // xs: 'none',
                  xl: 'block'
               },

               // alignSelf: 'center'
            }}
            >
               {(currentUserId !== ('' + comment.userId)) && (isAuth === 'true') && (isNotAdmin === 'true') && (!comment.approved) && ComplaintIcon}
               {/* {(currentUserId !== ('' + comment.userId)) && (isAuth === 'true') && (isNotAdmin === 'true') && comment.approved && VerifiedBadge} */}
               {(currentUserId === ('' + comment.userId)) && (isAuth === 'true') && (isNotAdmin === 'true') && ManageCommentTools}
               {(isAuth === 'true') && (isNotAdmin === 'false') && AdminManageCommentTools}
               {/* <Tooltip title="Пожаловаться">
                  <IconButton onClick={handleClickOpen} sx={{ p: 0, pr: 2 }}>
                     <ReportProblemOutlinedIcon sx={{
                        fill: '#707070',
                        fontSize: 'medium',
                        // #313037
                        // ":hover": '#c6cb3b',
                     }} />
                  </IconButton>
               </Tooltip>
               <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
               >
                  <DialogTitle id="alert-dialog-title">
                     {"Отправка жалобы"}
                  </DialogTitle>
                  <DialogContent>
                     <DialogContentText id="alert-dialog-description">
                        Пожаловаться на ненормативную лексику данного пользователя?
                     </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                     <Button onClick={handleOk}>ОК</Button>
                     <Button onClick={handleCancel}>Отменить</Button>
                  </DialogActions>
               </Dialog> */}
               {/* <Tooltip title="Редактировать">
                  <IconButton onClick={() => { console.log('Редактировать') }} sx={{ p: 0, pr: 2 }}>
                     <EditIcon sx={{ fontSize: 'medium' }} />
                  </IconButton>
               </Tooltip>

               <Tooltip title="Удалить">
                  <IconButton onClick={handleDeleteComment} sx={{ p: 0, pr: 2 }}>
                     <DeleteIcon sx={{ fontSize: 'medium' }} />
                  </IconButton>
               </Tooltip> */}
            </Box>
         </Box>

         <Typography variant="body1" component="p"
            sx={{
               fontSize: 14,
               // color: "system.light"
               color: "#47a",
            }}
         >
            {comment.creationDate}
            {/* <Typography variant="body1" component="span"
               sx={{
                  m: 0,
                  p: 0,
                  pl: 2,
                  fontSize: 14,
                  color: "system.light"
                  // color: "#fff",
               }}
            >
               {comment.complaintsCount}
            </Typography> */}
         </Typography>

         {!openCommentEditor ? CommentText : EditCommentBlock}

         {comment.changedByAuthor && <Typography variant="body1" component="p"
            sx={{
               fontSize: 14,
               color: "system.light"
               // color: "#47a",
            }}
         >
            (изменено)

         </Typography>}
         {(isAuth === 'true') && (isNotAdmin === 'false') && (page === 'comments') && PosterLink}
      </Box>
   )
}