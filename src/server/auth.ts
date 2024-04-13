import { DOMAIN } from "../types/commonVars";
import { CheckUser, InnerAuthResponse, InnerRegResponse, UserForReg, serverAuthResponse } from "../types/types";
import Cookies from 'universal-cookie';

// const DOMAIN = "https://studapi.teachmeskills.by";
// const USERS = "/auth/users/";
const REGISTER = "/auth/registration";
// const ACTIVATE_USER = "/auth/users/activation/";
const LOGIN = "/auth/login";
const LOGOUT = "/auth/logout";
// const PROFILE = "/auth/users/me/";
// const REFRESH = "/auth/jwt/refresh/";



// export type ActivationKeys = {
//    uid: string,
//    token: string
// }



export type UserProfile = {
   username: string,
   id: number,
   email: string
}


export const regUser = async (user: UserForReg) => {
   const url = new URL(DOMAIN + REGISTER);
   const response = await fetch(url,
      {
         method: 'POST',
         body: JSON.stringify(user),
         headers: { "Content-Type": "application/json" }
      });
   const result: serverAuthResponse = await response.json();

   if (response.status === 201) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerRegResponse = {
         resCode: response.status,
         isAuth: result.accountInfo.isAuth,
         isNotAdmin: result.accountInfo.isNotAdmin,
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerRegResponse = {
         resCode: response.status,
         isAuth: result.accountInfo.isAuth,
         isNotAdmin: result.accountInfo.isNotAdmin,
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
   // return result;
}

// export const activateUser = async (activationKeys: ActivationKeys) => {
//    const url = new URL(DOMAIN + ACTIVATE_USER);
//    const response = await fetch(url,
//       {
//          method: 'POST',
//          body: JSON.stringify(activationKeys),
//          headers: { "Content-Type": "application/json" }
//       });
//    const result = await response.json();
//    return result;
// }

export const checkUser = async (user: CheckUser) => {
   const url = new URL(DOMAIN + LOGIN);
   const response = await fetch(url,
      {
         method: 'POST',
         body: JSON.stringify(user),
         headers: { "Content-Type": "application/json" }
      });
   const result: serverAuthResponse = await response.json();
   // console.log("🚀 ~ file: auth.ts:92 ~ checkUser ~ result:", result)

   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      localStorage.setItem('userId', `${result.accountInfo.userId}`)

      console.log("🚀 ~ file: auth.ts:99 ~ checkUser ~ result.accountInfo.userId:", result.accountInfo.userId)
      const obj: InnerAuthResponse = {
         resCode: response.status,
         isAuth: result.accountInfo.isAuth,
         isNotAdmin: result.accountInfo.isNotAdmin,
         userId: result.accountInfo.userId || null,
         accessToken: result.accountInfo.accessToken || '',
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerAuthResponse = {
         resCode: response.status,
         isAuth: result.accountInfo.isAuth,
         isNotAdmin: result.accountInfo.isNotAdmin,
         userId: result.accountInfo.userId || null,
         accessToken: result.accountInfo.accessToken || '',
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }

   // return result;
}

export const logoutUser = async () => {
   const url = new URL(DOMAIN + LOGOUT);
   const response = await fetch(url);
   const result: serverAuthResponse = await response.json();

   console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)
   if (response.status === 200) {

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      localStorage.removeItem('userId')

      localStorage.removeItem('accessToken')
      const cookies = new Cookies();
      cookies.set('accessToken', '', { path: '/' });

      console.log("🚀 ~ file: auth.ts:99 ~ checkUser ~ result.accountInfo.userId:", result.accountInfo.userId)
      const obj: InnerAuthResponse = {
         resCode: response.status,
         isAuth: result.accountInfo.isAuth,
         isNotAdmin: result.accountInfo.isNotAdmin,
         userId: null,
         accessToken: '',
         err: ''
      };

      return obj
   }
   else {
      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)

      const obj: InnerAuthResponse = {
         resCode: response.status,
         isAuth: result.accountInfo.isAuth,
         isNotAdmin: result.accountInfo.isNotAdmin,
         userId: null,
         accessToken: '',
         err: result.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }

   // return result;
}

export const saveToken = (accessToken: string) => {
   if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
      const cookies = new Cookies();
      cookies.set('accessToken', accessToken, { path: '/' });
      // localStorage.setItem('refreshToken', tokens.refresh)
   }
}

