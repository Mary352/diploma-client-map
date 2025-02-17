import { DOMAIN } from "../types/commonVars";
import { InnerCreatePosterResponse, InnerOneUserResponse, InnerUsersResponse, User, UserToUpdate, serverCreatePosterResponse, serverUserResponse, serverUsersResponse } from "../types/types";

const USERS = "/users";
const USERS_UPDATE = "/users/upd";
const USERS_FILTERED = "/users/filter";
const USERS_DELETE = "/users/del";

export const getUsers = async () => {
   const usersUrl = new URL(DOMAIN + USERS);

   const response = await fetch(usersUrl, {
      credentials: 'include',
   });

   const users: serverUsersResponse = await response.json();
   localStorage.setItem('isAuth', `${users.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${users.accountInfo.isNotAdmin}`)

   if (response.status === 200) {

      const obj: InnerUsersResponse = {
         resCode: response.status,
         users: users.message || [],
         err: '',
         accountInfo: {
            isAuth: users.accountInfo.isAuth,
            isNotAdmin: users.accountInfo.isNotAdmin,
         },
      };

      return obj
   }
   else {
      const obj: InnerUsersResponse = {
         resCode: response.status,
         users: [],
         err: users.error || 'Произошла ошибка. Попробуйте позже',
         accountInfo: {
            isAuth: users.accountInfo.isAuth,
            isNotAdmin: users.accountInfo.isNotAdmin,
         },
      };

      return obj;
   }
};

export const getOneUser = async (id: string) => {
   const userUrl = new URL(DOMAIN + USERS + `/${id}`);

   const response = await fetch(userUrl, {
      credentials: 'include',
   })

   const result: serverUserResponse = await response.json()

   console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)
   if (response.status === 200) {

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerOneUserResponse = {
         resCode: response.status,
         user: result.message || null,
         err: '',
         accountInfo: {
            isAuth: result.accountInfo.isAuth,
            isNotAdmin: result.accountInfo.isNotAdmin,
         },
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerOneUserResponse = {
         resCode: response.status,
         user: null,
         err: result.error || 'Произошла ошибка. Попробуйте позже',
         accountInfo: {
            isAuth: result.accountInfo.isAuth,
            isNotAdmin: result.accountInfo.isNotAdmin,
         },
      };

      return obj;
   }

   // return user
}

export const getUsersFiltered = async (userRole: string) => {
   let response;
   if (userRole === 'admin' || userRole === 'user') {
      const postersUrl = new URL(DOMAIN + USERS_FILTERED);
      response = await fetch(postersUrl, {
         method: 'POST',
         body: JSON.stringify({ userRole: userRole }),
         headers: {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
            'Content-Type': 'application/json;charset=utf-8'
         },
         credentials: 'include',
      });
   }
   else {
      const postersUrl = new URL(DOMAIN + USERS);
      response = await fetch(postersUrl, {
         credentials: 'include',
      });
   }
   const users: serverUsersResponse = await response.json();
   localStorage.setItem('isAuth', `${users.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${users.accountInfo.isNotAdmin}`)
   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerUsersResponse = {
         resCode: response.status,
         users: users.message || [],
         err: '',
         accountInfo: {
            isAuth: users.accountInfo.isAuth,
            isNotAdmin: users.accountInfo.isNotAdmin,
         },
      };
      return obj
   }
   else {
      const obj: InnerUsersResponse = {
         resCode: response.status,
         users: [],
         err: users.error || 'Произошла ошибка. Попробуйте позже',
         accountInfo: {
            isAuth: users.accountInfo.isAuth,
            isNotAdmin: users.accountInfo.isNotAdmin,
         },
      };
      return obj;
   }
};

export const updateUser = async (userNewData: UserToUpdate) => {
   const url = new URL(DOMAIN + USERS_UPDATE + '/' + userNewData.id);

   const dataToSend: any = {};
   // let filterToSendFillFlag = false;
   const isNotAdmin = localStorage.getItem('isNotAdmin');

   const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(userNewData),
      headers: {
         'Access-Control-Allow-Headers': 'Content-Type',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
         'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include',
   });

   const result: serverUserResponse = await response.json();
   if (response.status === 200) {

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerOneUserResponse = {
         resCode: response.status,
         user: result.message || null,
         accountInfo: {
            isAuth: result.accountInfo.isAuth,
            isNotAdmin: result.accountInfo.isNotAdmin,
         },
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerOneUserResponse = {
         resCode: response.status,
         user: null,
         accountInfo: {
            isAuth: result.accountInfo.isAuth,
            isNotAdmin: result.accountInfo.isNotAdmin,
         },
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
}

export const deleteUser = async (id: string) => {
   const url = new URL(DOMAIN + USERS_DELETE + `/${id}`);
   // const dataToRequestDelete = {
   //    posterId: id,
   //    // posterStatus: posterStatuses.waitDelete,
   //    reason: reason
   // }

   const response = await fetch(url, {
      method: 'POST',
      // body: JSON.stringify(dataToRequestDelete),
      headers: {
         'Access-Control-Allow-Headers': 'Content-Type',
         'Access-Control-Allow-Origin': '*',
         'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH',
         'Content-Type': 'application/json;charset=utf-8'
      },
      credentials: 'include',
   });
   // serverCreatePosterResponse = serverUpdatePosterResponse
   const result: serverCreatePosterResponse = await response.json();
   // console.log("🚀 ~ file: getPosters.ts:157 ~ createPoster ~ result:", result)

   if (response.status === 200) {
      // console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      console.log("🚀 ~ file: getPosters.ts:164 ~ createPoster ~ result.accountInfo.isAuth:", result.accountInfo.isAuth)

      const obj: InnerCreatePosterResponse = {
         resCode: response.status,
         message: result.message || '',
         isAuth: result.accountInfo.isAuth,
         isNotAdmin: result.accountInfo.isNotAdmin,
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerCreatePosterResponse = {
         resCode: response.status,
         message: '',
         isAuth: result.accountInfo.isAuth,
         isNotAdmin: result.accountInfo.isNotAdmin,
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
   // return result;
}