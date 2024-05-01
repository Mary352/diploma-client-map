import { DOMAIN } from "../types/commonVars";
import { CommentToAdd, CommentToUpd, InnerCommentsResponse, InnerResponse, serverCommentsResponse, serverResponse } from "../types/types";

const COMMENTS = "/comments";
const COMMENTS_ADD = COMMENTS + "/add";
const COMMENTS_ADD_COMPLAINT = COMMENTS + "/addcomplaint";
const COMMENTS_DELETE = COMMENTS + "/del";
const COMMENTS_UPDATE = COMMENTS + "/upd";
const COMMENTS_APPROVE = COMMENTS + "/approve";

export const addComment = async (comment: CommentToAdd) => {
   const url = new URL(DOMAIN + COMMENTS_ADD);

   const response = await fetch(url,
      {
         method: 'POST',
         body: JSON.stringify(comment),
         headers: { "Content-Type": "application/json" },
         credentials: 'include',
      });
   const result: serverCommentsResponse = await response.json();
   console.log("🚀 ~ addComment ~ result:", result)

   if (response.status === 201) {

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      console.log("🚀 ~ addComment ~ result.accountInfo.isAuth:", result.accountInfo.isAuth)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: result.message || [],
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: [],
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
   // return result;
}

export const getCommentsForPoster = async (posterId: string) => {
   const url = new URL(DOMAIN + COMMENTS + `/${posterId}`);

   // const accessToken = localStorage.getItem('accessToken');

   const response = await fetch(url, {
      credentials: 'include',
   });

   const result: serverCommentsResponse = await response.json();
   localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

   if (response.status === 200) {

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: result.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: [],
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

export const addComplaint = async (commentId: number) => {
   const url = new URL(DOMAIN + COMMENTS_ADD_COMPLAINT);

   const response = await fetch(url,
      {
         method: 'POST',
         body: JSON.stringify({ commentId: commentId }),
         headers: { "Content-Type": "application/json" },
         credentials: 'include',
      });
   const result: serverCommentsResponse = await response.json();
   console.log("🚀 ~ addComplaint ~ result:", result)

   if (response.status === 201) {

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      console.log("🚀 ~ addComplaint ~ result.accountInfo.isAuth:", result.accountInfo.isAuth)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: result.message || [],
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: [],
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
   // return result;
}

export const deleteComment = async (commentId: number) => {
   const url = new URL(DOMAIN + COMMENTS_DELETE + `/${commentId}`);

   const response = await fetch(url,
      {
         method: 'POST',
         // body: JSON.stringify({ commentId: commentId }),
         headers: { "Content-Type": "application/json" },
         credentials: 'include',
      });
   const result: serverCommentsResponse = await response.json();
   console.log("🚀 ~ deleteComment ~ result:", result)

   if (response.status === 201) {

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      console.log("🚀 ~ deleteComment ~ result.accountInfo.isAuth:", result.accountInfo.isAuth)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: result.message || [],
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: [],
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
}

export const approveComment = async (commentId: number) => {
   const url = new URL(DOMAIN + COMMENTS_APPROVE + `/${commentId}`);

   const response = await fetch(url,
      {
         method: 'POST',
         headers: { "Content-Type": "application/json" },
         credentials: 'include',
      });
   const result: serverCommentsResponse = await response.json();
   console.log("🚀 ~ approveComment ~ result:", result)

   if (response.status === 201) {

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      console.log("🚀 ~ approveComment ~ result.accountInfo.isAuth:", result.accountInfo.isAuth)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: result.message || [],
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: [],
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
}

export const updateComment = async (comment: CommentToUpd) => {
   const url = new URL(DOMAIN + COMMENTS_UPDATE + `/${comment.commentId}`);

   const response = await fetch(url,
      {
         method: 'POST',
         body: JSON.stringify(comment),
         headers: { "Content-Type": "application/json" },
         credentials: 'include',
      });
   const result: serverCommentsResponse = await response.json();
   console.log("🚀 ~ updateComment ~ result:", result)

   if (response.status === 201) {

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      console.log("🚀 ~ updateComment ~ result.accountInfo.isAuth:", result.accountInfo.isAuth)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: result.message || [],
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: [],
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
}

export const getAllComments = async () => {
   const url = new URL(DOMAIN + COMMENTS);
   const response = await fetch(url, {
      credentials: 'include',
   });

   const result: serverCommentsResponse = await response.json();
   localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

   if (response.status === 200) {

      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: result.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerCommentsResponse = {
         resCode: response.status,
         comments: [],
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};