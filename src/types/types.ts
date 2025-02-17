import dayjs from "dayjs"
import { RootState } from "../store/store"

export type MapWithPlacemarkProps = {
   address: string,
   coord0: string,
   coord1: string,
}

export type MapWithSearchProps = {
   handleSearchChange: (event: any) => void,
   selectedTextAddress: string
}

export type SearchBooksThunkParams = {
   title: string,
   page: number
}


// Initial state types




// Response types




// Component Props


export type SearchInputProps = {
   tablet?: boolean,
   onSideBarClick?: (event: React.MouseEvent) => void
}

export type FilterForPosters = {
   // "userId": number, - from payload   
   "isPet": string,
   "objectCategory": string,
   "itemStatus": string,
   "posterStatusName": string
}

export type PosterToCreate = {
   // "userId": number, - from payload
   "item": string,
   "breed": null | string,
   "isPet": string,
   "objectCategory": string,
   "description": string,
   "itemStatus": string,
   "dateOfAction": string,
   "photo": File | null,
   "address": string,
   "phone": string
}

export type PosterToCreateWithCoords = {
   // "userId": number, - from payload
   "item": string,
   "breed": null | string,
   "isPet": string,
   "objectCategory": string,
   "description": string,
   "itemStatus": string,
   "dateOfAction": string,
   "photo": File | null,
   "address": string,
   "phone": string,
   coord0: string,
   coord1: string,
}

export type PosterToUpdate = {
   // "userId": number, - from payload
   // "item": string,
   id: string | undefined,
   "breed"?: string | null | undefined,
   "objectCategory"?: string,
   "description"?: string,
   "photo": File | null,
   "address"?: string,
   "phone"?: string,
   coord0?: string,
   coord1?: string,
}

export type UserToUpdate = {
   id: string | undefined,
   "name": string,
   "phone": string,
   "address": string,
   "role": string,
   "coord0": string,
   "coord1": string,
}

export type PosterServer = {
   "id": number,
   "userId": number,
   "posterStatusId": number,
   "item": string,
   "breed": null | string,
   "isPet": boolean,
   "itemCategoryId": number,
   "description": string,
   "itemStatus": string,
   "dateOfAction": string,
   "publishDate": null | string,
   "photoLink": string,
   "address": string,
   "phone": string,
   coord0: string,
   coord1: string,
   "ObjectCategories": {
      "category": string
   } | null,
   "PosterStatuses": {
      "statusName": string
   } | null
   Users: {
      name: string;
      email: string;
   } | null;
}
export type CommentServer = {
   id: number;
   posterId: number | null;
   userId: number | null;
   comment: string;
   creationDate: string;
   readByPosterAuthor: boolean;
   approved: boolean;
   changedByAuthor: boolean;
   complaintsCount: number;
   Users: {
      name: string;
   } | null;
}

export type User = {
   "id": number,
   email: string,
   name: string
   password: string,
   phone: string,
   address: string,
   "role": string,
   coord0: string,
   coord1: string,
   lastActivityTime: Date
}

export type UserForReg = {
   email: string,
   name: string
   password: string,
   phone: string,
   address: string,
   coord0: string,
   coord1: string,
}

// export type Token = {
//    access: string,
//    refresh: string
// };

export type CheckUser = {
   email: string;
   password: string
};


// Initial state types
export type PosterState = {
   posters: PosterServer[],
   postersUser: PosterServer[],
   poster: PosterServer | null,
   responseCode: number,
   errorMsg: string,
   isAuth: 'no_info' | boolean,
   isNotAdmin: 'no_info' | boolean,
   itemInput: string,
   breedInput: null | string,
   isPetInput: boolean,
   objectCategoryInput: string,
   descriptionInput: string,
   itemStatusInput: string,
   dateOfActionInput: dayjs.Dayjs | null,
   photoFileInput: File | null,
   addressInput: string,
   phoneInput: string,
   // posterCategories: string[],
   petCategories: string[],
   itemCategories: string[],
   posterStatuses: string[],
   posterDeleteReasons: string[],
   rejectReason: string | undefined,
   deleteReason: string | undefined,
   rejectUpdMessage: string | undefined,
   posterAuthor: User | null,
   notificationsInfo: NotificationsInfo[],
   foundStatistics: number,
   // bookDetailed: OneBookDetailed,
   // searchInputValue: string,
   // booksFoundByTitle: OneBookShort[],
   // total: number,
   // page: number,
   // pageQty: number,
   // // booksPerPage: number
   status: string
}

export type AccountState = {
   // users: User[],
   isAuthorized: boolean,
   accessToken: string,
   emailInput: string,
   passInput: string,
   confirmPassInput: string,
   nameInput: string,
   phoneInput: string,
   addressInput: string,
   isNotAdmin: boolean,
   responseCode: number,
   status: string,
   errorMsg: string,
   logout: boolean,
   // currentUser: User,
}

export type Comment = {
   id: number,
   posterId: number,
   userId: number,
   comment: string,
   creationDate: string, // !
   readByPosterAuthor: boolean,
   approved: boolean,
   changedByAuthor: boolean,
   complaintsCount: number
}

export type CommentState = {
   comments: CommentServer[],
   responseCode: number,
   errorMsg: string,
   status: string
}
export type UserSliceState = {
   users: User[],
   user: User | null,
   responseCode: number,
   status: string,
   errorMsg: string,
   hiddenData: boolean,
   // isAuthorized: boolean,
   // accessToken: string,
   emailInput: string,
   passInput: string,
   confirmPassInput: string,
   nameInput: string,
   phoneInput: string,
   addressInput: string,
   roleInput: string,
   // isNotAdmin: boolean,
   // currentUser: User,
}


// Responses
export type serverAuthResponse = {
   error?: string,
   message?: string,
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
      userId?: number,
      accessToken?: string
   }
}
export type InnerAuthResponse = {
   resCode: number,
   isAuth: boolean,
   isNotAdmin: boolean,
   userId: number | null,
   accessToken: string,
   err: string;
}
export type InnerRegResponse = {
   resCode: number,
   isAuth: boolean,
   isNotAdmin: boolean,
   // accessToken: string,
   err: string;
}
export type ServerCategoriesResponse = {
   message: { petCategories: string[], itemCategories: string[] },
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   },
   error?: string
}
export type InnerCategoriesResponse = {
   resCode: number,
   categories: { petCategories: string[], itemCategories: string[] },
   err: string,
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   },
}
export type InnerStatusesResponse = {
   resCode: number,
   posterStatuses: string[],
   err: string,
}

export type InnerDeleteReasonsResponse = {
   resCode: number,
   deleteReasons: string[],
   err: string,
}

export type serverStatsResponse = {
   error?: string
   message?: number,
   accountInfo: {
      "isAuth": boolean,
      "isNotAdmin": boolean
   }
}

export type serverPostersResponse = {
   error?: string
   message?: PosterServer[],
   accountInfo: {
      "isAuth": boolean,
      "isNotAdmin": boolean
   }
}
export type InnerPostersResponse = {
   resCode: number,
   posters: PosterServer[],
   err: string,
}

export type InnerStatsResponse = {
   resCode: number,
   foundStatistics: number,
   err: string,
}

export type InnerCommentsResponse = {
   resCode: number,
   comments: CommentServer[],
   err: string,
}
export type serverPosterResponse = {
   error?: string,
   rejectReason?: string,
   deleteReason?: string,
   rejectUpdMessage?: string,
   message?: PosterServer,
   "accountInfo": {
      "isAuth": boolean,
      "isNotAdmin": boolean
   }
}
export type NotificationsInfo = {
   "posterId": number,
   "posterItem": string
}
export type serverNotificationsResponse = {
   error?: string,
   message?: NotificationsInfo[],
   "accountInfo": {
      "isAuth": boolean,
      "isNotAdmin": boolean
   }
}
export type InnerNotificationsResponse = {
   resCode: number;
   notificationsInfo: NotificationsInfo[];
   err: string;
}
export type InnerOnePosterResponse = {
   resCode: number;
   poster: PosterServer | null,
   rejectReason?: string,
   deleteReason?: string,
   rejectUpdMessage?: string,
   posterAuthor: User | null,
   err: string,
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}
export type serverUserResponse = {
   error?: string,
   message?: User,
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}
export type InnerOneUserResponse = {
   resCode: number;
   user: User | null,
   err: string,
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}

export type serverUsersResponse = {
   error?: string,
   message?: User[],
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}
export type InnerUsersResponse = {
   resCode: number;
   users: User[],
   err: string,
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}
export type serverAllUsersResponse = {
   error?: string,
   message?: User[],
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}
export type InnerCreatePosterResponse = {
   resCode: number,
   message: string,
   isAuth: boolean,
   isNotAdmin: boolean,
   // accessToken: string,
   err: string;
}

export type serverCreatePosterResponse = {
   error?: string,
   message?: string,
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}

export type serverResponse = {
   error?: string,
   message?: string,
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}

export type serverCommentsResponse = {
   error?: string,
   message?: CommentServer[],
   accountInfo: {
      isAuth: boolean,
      isNotAdmin: boolean,
   }
}

export type InnerResponse = {
   resCode: number,
   message: string,
   isAuth: boolean,
   isNotAdmin: boolean,
   // accessToken: string,
   err: string;
}

export type CommentToAdd = {
   posterId: number,
   comment: string,
   currentPageLink: string
}

export type CommentToUpd = {
   commentId: number,
   text: string
}

// Component Props
export type PosterCardProps = {
   poster: PosterServer
};
// {
//    resCode: number;
//    res: string | any[] | undefined;
// }
