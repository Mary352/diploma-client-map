import dayjs from "dayjs"
import { RootState } from "../store/store"

export type OneBookShort = {
   title: string,
   subtitle: string,
   isbn13: string,
   price: string,
   image: string,
   url: string
}

export type OneBookDetailed = {
   error: string,
   title: string,
   subtitle: string,
   authors: string,
   publisher: string,
   language: string,
   isbn10: string,
   isbn13: string,
   pages: string,
   year: string,
   rating: string,
   desc: string,
   price: string,
   image: string,
   url: string,
   pdf: Object
}

export type SearchBooksThunkParams = {
   title: string,
   page: number
}


// Initial state types
export type BookState = {
   books: OneBookShort[],
   bookDetailed: OneBookDetailed,
   searchInputValue: string,
   booksFoundByTitle: OneBookShort[],
   total: number,
   page: number,
   pageQty: number,
   // booksPerPage: number
   status: string
}



// Response types
export type BooksResponse = {
   error: string,
   total: string,
   books: OneBookShort[]
};

export type SearchBooksResponse = {
   error: string,
   total: string,
   page: string,
   books: OneBookShort[]
};

// Component Props
export type BookShortProps = {
   book: OneBookShort
};
export type OneBookPageProps = {
   book: OneBookDetailed
};

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
   "phone"?: string
}

export type UserToUpdate = {
   id: string | undefined,
   "name": string,
   "phone": string
   "address": string,
   "role": string,
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
}

export type User = {
   "id": number,
   email: string,
   name: string
   password: string,
   phone: string,
   address: string,
   "role": string
}

export type UserForReg = {
   email: string,
   name: string
   password: string,
   phone: string,
   address: string,
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
   posterCategories: string[],
   posterStatuses: string[],
   posterDeleteReasons: string[],
   rejectReason: string | undefined,
   deleteReason: string | undefined,
   posterAuthor: User | null,
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
export type InnerCategoriesResponse = {
   resCode: number,
   categories: string[],
   err: string,
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
export type serverPosterResponse = {
   error?: string,
   rejectReason?: string,
   deleteReason?: string,
   message?: PosterServer,
   "accountInfo": {
      "isAuth": boolean,
      "isNotAdmin": boolean
   }
}
export type InnerOnePosterResponse = {
   resCode: number;
   poster: PosterServer | null,
   rejectReason?: string,
   deleteReason?: string,
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



// Component Props
export type PosterCardProps = {
   poster: PosterServer
};
// {
//    resCode: number;
//    res: string | any[] | undefined;
// }
