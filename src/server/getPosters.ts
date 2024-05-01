import { DOMAIN, posterStatuses } from "../types/commonVars";
import { FilterForPosters, InnerCategoriesResponse, InnerCreatePosterResponse, InnerDeleteReasonsResponse, InnerNotificationsResponse, InnerOnePosterResponse, InnerPostersResponse, InnerStatusesResponse, PosterServer, PosterToCreate, PosterToCreateWithCoords, PosterToUpdate, ServerCategoriesResponse, User, serverCreatePosterResponse, serverNotificationsResponse, serverPosterResponse, serverPostersResponse, } from "../types/types";
import { getOneUser } from "./getUsers";


// const NEW = "/new";
const POSTERS = "/posters";
const POSTERS_FILTERED = "/posters/filter";
const POSTERS_MY = "/posters/my";
const CATEGORIES = "/posters/categories";
const STATUSES = "/posters/posterstatuses";
const DELETE_REASONS = "/posters/deletereasons";
const POSTERS_CREATE = "/posters/create";
const POSTERS_UPDATE = "/posters/upd";
const POSTERS_DELETE = "/posters/del";
const POSTERS_DECIDE = "/posters/decide";
const POSTERS_NOTIFICATIONS = "/posters/getnotifications";

const COMMENTS_SET_READ = "/comments/setcommentsread";
// const SEARCH = "/search";

export const getPosters = async () => {
   const postersUrl = new URL(DOMAIN + POSTERS);

   const accessToken = localStorage.getItem('accessToken');
   console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ accessToken:", accessToken)

   // let response;
   // if (accessToken) {
   const response = await fetch(postersUrl, {
      // headers: {
      //    'Content-Type': 'application/json',
      //    // 'Cookie': `accessToken=${accessToken}`,
      // },
      credentials: 'include',
   });
   // }
   // else {
   //    response = await fetch(postersUrl);
   // }
   // console.log("🚀 ~ file: getPosters.ts:25 ~ getPosters ~ response:", response)

   const posters: serverPostersResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:14 ~ getPosters ~ posters:", posters)
   // console.log("🚀 ~ file: getBooks.ts:56 ~ getPosters ~ posters:", posters.message)
   localStorage.setItem('isAuth', `${posters.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${posters.accountInfo.isNotAdmin}`)

   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerPostersResponse = {
         resCode: response.status,
         posters: posters.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerPostersResponse = {
         resCode: response.status,
         posters: [],
         err: posters.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

export const getPostersFiltered = async (filterForPosters: FilterForPosters) => {

   // const formData = new FormData();
   const filterToSend: any = {};
   let filterToSendFillFlag = false;
   const isNotAdmin = localStorage.getItem('isNotAdmin');

   // isNotAdmin !== 'false' - авторизованные пользователи и гости
   if (isNotAdmin !== 'false' && filterForPosters.isPet === 'yes') {
      filterToSend.isPet = true;
      filterToSendFillFlag = true;
   }
   else if (isNotAdmin !== 'false' && filterForPosters.isPet === 'no') {
      filterToSend.isPet = false;
      filterToSendFillFlag = true;
   }

   if (isNotAdmin !== 'false' && filterForPosters.objectCategory !== 'no_category') {
      filterToSend.objectCategory = filterForPosters.objectCategory;
      filterToSendFillFlag = true;
   }

   if (isNotAdmin !== 'false' && filterForPosters.itemStatus !== 'no_itemStatus') {
      filterToSend.itemStatus = filterForPosters.itemStatus;
      filterToSendFillFlag = true;
   }

   // isNotAdmin === 'false' - админ
   if (isNotAdmin === 'false' && filterForPosters.posterStatusName !== 'no_statusName') {
      filterToSend.posterStatusName = filterForPosters.posterStatusName;
      filterToSendFillFlag = true;
      // console.log("123🚀 ")
   }

   console.log("123🚀 ~ file: getPosters.ts:95 ~ getPostersFiltered ~ filterToSend:", filterToSend)
   // if (poster.breed !== null) {
   //    formData.append('breed', poster.breed)
   // }

   // const accessToken = localStorage.getItem('accessToken');
   // console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ accessToken:", accessToken)
   // const lastUrlPart = filterToSendFillFlag ? POSTERS_FILTERED : POSTERS;

   let response;
   if (filterToSendFillFlag) {
      const postersUrl = new URL(DOMAIN + POSTERS_FILTERED);

      response = await fetch(postersUrl, {
         method: 'POST',
         body: JSON.stringify(filterToSend),
         headers: { "Content-Type": "application/json" },
         credentials: 'include',
      });
   }
   else {
      const postersUrl = new URL(DOMAIN + POSTERS);
      response = await fetch(postersUrl, {
         credentials: 'include',
      });
   }

   const posters: serverPostersResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:14 ~ getPosters ~ posters:", posters)
   // console.log("🚀 ~ file: getBooks.ts:56 ~ getPosters ~ posters:", posters.message)
   localStorage.setItem('isAuth', `${posters.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${posters.accountInfo.isNotAdmin}`)

   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerPostersResponse = {
         resCode: response.status,
         posters: posters.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerPostersResponse = {
         resCode: response.status,
         posters: [],
         err: posters.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

export const getUserPosters = async () => {
   const postersUrl = new URL(DOMAIN + POSTERS_MY);

   const accessToken = localStorage.getItem('accessToken');
   console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ accessToken:", accessToken)

   // let response;
   // if (accessToken) {
   const response = await fetch(postersUrl, {
      // headers: {
      //    'Content-Type': 'application/json',
      //    // 'Cookie': `accessToken=${accessToken}`,
      // },
      credentials: 'include',
   });
   // }
   // else {
   //    response = await fetch(postersUrl);
   // }
   // console.log("🚀 ~ file: getPosters.ts:25 ~ getPosters ~ response:", response)

   const posters: serverPostersResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:14 ~ getPosters ~ posters:", posters)
   // console.log("🚀 ~ file: getBooks.ts:56 ~ getPosters ~ posters:", posters.message)
   localStorage.setItem('isAuth', `${posters.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${posters.accountInfo.isNotAdmin}`)

   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerPostersResponse = {
         resCode: response.status,
         posters: posters.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerPostersResponse = {
         resCode: response.status,
         posters: [],
         err: posters.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

export const getItemCategories = async () => {
   const postersUrl = new URL(DOMAIN + CATEGORIES);

   const response = await fetch(postersUrl, {
      // headers: {
      //    'Content-Type': 'application/json',
      //    // 'Cookie': `accessToken=${accessToken}`,
      // },
      credentials: 'include',
   });

   const posters: ServerCategoriesResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:14 ~ getPosters ~ posters:", posters)
   // console.log("🚀 ~ file: getBooks.ts:56 ~ getPosters ~ posters:", posters.message)
   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerCategoriesResponse = {
         resCode: response.status,
         categories: posters.message || {},
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerCategoriesResponse = {
         resCode: response.status,
         categories: { petCategories: [], itemCategories: [] },
         err: posters.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

export const getPosterStatuses = async () => {
   const postersUrl = new URL(DOMAIN + STATUSES);

   const response = await fetch(postersUrl, {
      // headers: {
      //    'Content-Type': 'application/json',
      //    // 'Cookie': `accessToken=${accessToken}`,
      // },
      credentials: 'include',
   });

   const posters = await response.json();
   console.log("🚀 ~ file: getPosters.ts:14 ~ getPosters ~ posters:", posters)
   // console.log("🚀 ~ file: getBooks.ts:56 ~ getPosters ~ posters:", posters.message)
   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerStatusesResponse = {
         resCode: response.status,
         posterStatuses: posters.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerStatusesResponse = {
         resCode: response.status,
         posterStatuses: [],
         err: posters.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

export const getPosterDeleteReasons = async () => {
   const postersUrl = new URL(DOMAIN + DELETE_REASONS);

   const response = await fetch(postersUrl, {
      // headers: {
      //    'Content-Type': 'application/json',
      //    // 'Cookie': `accessToken=${accessToken}`,
      // },
      credentials: 'include',
   });

   const posters = await response.json();
   console.log("🚀 ~ file: getPosters.ts:14 ~ getPosters ~ posters:", posters)
   // console.log("🚀 ~ file: getBooks.ts:56 ~ getPosters ~ posters:", posters.message)
   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerDeleteReasonsResponse = {
         resCode: response.status,
         deleteReasons: posters.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerDeleteReasonsResponse = {
         resCode: response.status,
         deleteReasons: [],
         err: posters.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

export const getPosterById = async (id: string) => {
   const posterUrl = new URL(DOMAIN + POSTERS + `/${id}`);
   let posterAuthor: User | null = null;

   const response = await fetch(posterUrl, {
      credentials: 'include',
   });
   const poster: serverPosterResponse = await response.json();

   console.log("🚀 ~ file: getPosters.ts:197 ~ getPosterById ~ poster.message?.userId:", poster.message?.userId)
   console.log("🚀 ~ file: getPosters.ts:198 ~ getPosterById ~ !poster.accountInfo.isNotAdmin:", !poster.accountInfo.isNotAdmin)
   if (poster.message?.userId && !poster.accountInfo.isNotAdmin) {
      const responseUser = await getOneUser('' + poster.message?.userId)
      posterAuthor = responseUser.user;
   }
   console.log("🚀 ~ file: getPosters.ts:199 ~ getPosterById ~ posterAuthor:", posterAuthor)

   localStorage.setItem('isAuth', `${poster.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${poster.accountInfo.isNotAdmin}`)
   console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)
   if (response.status === 200) {

      const obj: InnerOnePosterResponse = {
         resCode: response.status,
         poster: poster.message || null,
         posterAuthor: posterAuthor,
         rejectReason: poster.rejectReason || '',
         deleteReason: poster.deleteReason || '',
         err: '',
         accountInfo: {
            isAuth: poster.accountInfo.isAuth,
            isNotAdmin: poster.accountInfo.isNotAdmin,
         },
      };

      return obj
   }
   else {
      const obj: InnerOnePosterResponse = {
         resCode: response.status,
         poster: null,
         posterAuthor: null,
         err: poster.error || 'Произошла ошибка. Попробуйте позже',
         accountInfo: {
            isAuth: poster.accountInfo.isAuth,
            isNotAdmin: poster.accountInfo.isNotAdmin,
         },
      };

      return obj;
   }
};

export const createPoster = async (poster: PosterToCreateWithCoords) => {
   const url = new URL(DOMAIN + POSTERS_CREATE);
   const formData = new FormData();

   formData.append('item', poster.item)
   if (poster.breed !== null) {
      formData.append('breed', poster.breed)
   }
   formData.append('isPet', poster.isPet)
   formData.append('objectCategory', poster.objectCategory)
   formData.append('description', poster.description)
   formData.append('itemStatus', poster.itemStatus)
   formData.append('dateOfAction', poster.dateOfAction)
   formData.append('address', poster.address)
   formData.append('phone', poster.phone)
   formData.append('coord0', poster.coord0)
   formData.append('coord1', poster.coord1)
   if (poster.photo !== null) {
      // const i = poster.photo[0];
      formData.append('photo', poster.photo)
   }

   const response = await fetch(url,
      {
         method: 'POST',
         body: formData,
         credentials: 'include',
      });
   const result: serverCreatePosterResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:157 ~ createPoster ~ result:", result)

   if (response.status === 201) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

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

export const publishPoster = async (id: string | undefined) => {
   const url = new URL(DOMAIN + POSTERS_DECIDE);
   const dataToUpd = {
      posterId: id,
      posterStatus: posterStatuses.published,
      // reason
   }

   const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataToUpd),
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
   });
   // serverCreatePosterResponse = serverUpdatePosterResponse
   const result: serverCreatePosterResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:157 ~ createPoster ~ result:", result)

   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

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

export const rejectPoster = async (id: string | undefined, reason: string) => {
   const url = new URL(DOMAIN + POSTERS_DECIDE);
   const dataToUpd = {
      posterId: id,
      posterStatus: posterStatuses.rejected,
      reason: reason
   }

   const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataToUpd),
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
   });
   // serverCreatePosterResponse = serverUpdatePosterResponse
   const result: serverCreatePosterResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:157 ~ createPoster ~ result:", result)

   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

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

export const updatePoster = async (poster: PosterToUpdate) => {
   const url = new URL(DOMAIN + POSTERS_UPDATE + '/' + poster.id);
   const formData = new FormData();

   // formData.append('item', poster.item)
   if (poster.breed && poster.breed !== null) {
      formData.append('breed', poster.breed)
   }
   // formData.append('isPet', poster.isPet)
   poster.objectCategory && formData.append('objectCategory', poster.objectCategory)
   poster.description && formData.append('description', poster.description)
   // formData.append('itemStatus', poster.itemStatus)
   // formData.append('dateOfAction', poster.dateOfAction)
   poster.address && formData.append('address', poster.address)
   poster.phone && formData.append('phone', poster.phone)
   poster.coord0 && poster.coord0 !== 'undefined' && formData.append('coord0', poster.coord0)
   poster.coord1 && poster.coord1 !== 'undefined' && formData.append('coord1', poster.coord1)
   if (poster.photo !== null) {
      // const i = poster.photo[0];
      formData.append('photo', poster.photo)
   }

   const response = await fetch(url,
      {
         method: 'POST',
         body: formData,
         credentials: 'include',
      });
   const result: serverCreatePosterResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:157 ~ createPoster ~ result:", result)

   if (response.status === 201) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

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

export const deletePosterByUser = async (id: string | undefined, reason: string) => {
   const url = new URL(DOMAIN + POSTERS_DELETE);
   const dataToRequestDelete = {
      posterId: id,
      // posterStatus: posterStatuses.waitDelete,
      reason: reason
   }

   const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataToRequestDelete),
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
   });
   // serverCreatePosterResponse = serverUpdatePosterResponse
   const result: serverCreatePosterResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:157 ~ createPoster ~ result:", result)

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

export const deletePosterByAdmin = async (id: string | undefined) => {
   const url = new URL(DOMAIN + POSTERS_DELETE);
   const dataToDelete = {
      posterId: id,
      // posterStatus: posterStatuses.waitDelete,
      // reason: reason
   }

   const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(dataToDelete),
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
   });
   // serverCreatePosterResponse = serverUpdatePosterResponse
   const result: serverCreatePosterResponse = await response.json();
   console.log("🚀 ~ file: getPosters.ts:157 ~ createPoster ~ result:", result)

   if (response.status === 200) {
      // console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      localStorage.setItem('isAuth', `${result.accountInfo.isAuth}`)
      localStorage.setItem('isNotAdmin', `${result.accountInfo.isNotAdmin}`)
      // console.log("🚀 ~ file: getPosters.ts:164 ~ createPoster ~ result.accountInfo.isAuth:", result.accountInfo.isAuth)

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

export const getNotifications = async () => {
   const url = new URL(DOMAIN + POSTERS_NOTIFICATIONS);
   const response = await fetch(url, {
      credentials: 'include',
   });
   const posters: serverNotificationsResponse = await response.json();
   console.log("🚀 ~ getNotifications ~ posters:", posters)

   localStorage.setItem('isAuth', `${posters.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${posters.accountInfo.isNotAdmin}`)

   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerNotificationsResponse = {
         resCode: response.status,
         notificationsInfo: posters.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerNotificationsResponse = {
         resCode: response.status,
         notificationsInfo: [],
         err: posters.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

export const setCommentsRead = async (posterId: number) => {
   const url = new URL(DOMAIN + COMMENTS_SET_READ);
   const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ posterId: posterId }),
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
   });
   const posters: serverNotificationsResponse = await response.json();
   console.log("🚀 ~ getNotifications ~ posters:", posters)

   localStorage.setItem('isAuth', `${posters.accountInfo.isAuth}`)
   localStorage.setItem('isNotAdmin', `${posters.accountInfo.isNotAdmin}`)

   if (response.status === 200) {
      console.log("🚀 ~ file: getPosters.ts:13 ~ getPosters ~ response.status:", response.status)

      const obj: InnerNotificationsResponse = {
         resCode: response.status,
         notificationsInfo: posters.message || [],
         err: ''
      };

      return obj
   }
   else {
      const obj: InnerNotificationsResponse = {
         resCode: response.status,
         notificationsInfo: [],
         err: posters.error || 'Произошла ошибка. Попробуйте позже',
      };

      return obj;
   }
};

// export const getNewBooks = async () => {
//    const newBooksUrl = new URL(DOMAIN + NEW);

//    const response = await fetch(newBooksUrl);
//    const books: BooksResponse = await response.json();
//    return books.books;
// };

// export const getBookByISBN = async (isbn13: string) => {
//    const oneBookUrl = new URL(DOMAIN + BOOKS + `/${isbn13}`);

//    const response = await fetch(oneBookUrl);
//    const book: OneBookDetailed = await response.json();
//    return book;
// };

// export const searchBooks = async (title: string, page: number) => {

//    const searchTitlePrev = localStorage.getItem('searchTitle')
//    console.log("🚀 ~ file: getBooks.ts:27 ~ searchBooks ~ searchTitlePrev:", searchTitlePrev)
//    console.log("🚀 ~ file: getBooks.ts:27 ~ searchBooks ~ title:", title)
//    console.log("🚀 ~ file: getBooks.ts:31 ~ searchBooks ~ searchTitlePrev !== title:", searchTitlePrev !== title)

//    // let searchBooksUrl
//    // if (searchTitlePrev !== title) {
//    //    searchBooksUrl = new URL(DOMAIN + SEARCH + `/${title}` + '/1')
//    //    // localStorage.setItem('page', '1')
//    // }
//    // else {
//    //    searchBooksUrl = new URL(DOMAIN + SEARCH + `/${title}` + `/${page}`)
//    //    // localStorage.setItem('page', String(page))
//    // }

//    localStorage.setItem('searchTitle', title)

//    const searchBooksUrl = new URL(DOMAIN + SEARCH + `/${title}` + `/${page}`)

//    const response = await fetch(searchBooksUrl);
//    const books: SearchBooksResponse = await response.json();
//    return books;
// };