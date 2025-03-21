// export const DOMAIN = "http://localhost:5000";
// for Render
export const DOMAIN = "https://diploma-server-map.onrender.com";

export const UPLOAD = "/uploads";

export const posterStatuses = {
   waitPublication: 'ожидает публикации',
   published: 'опубликовано',
   rejected: 'отклонено',
   updated: 'отредактировано',
   deleted: 'удалено',
   updateRejected: 'изменения отклонены',
   waitDelete: 'ожидает удаления',
}

export const errors = {
   forbidAccess: 'Доступ запрещён',
   unAuthorized: 'Для продолжения работы войдите в систему'
}

export const objectState = {
   lookingForOwner: 'ищу владельца',
   lost: 'потеряно'
}

export const HELPER_PHONE_TEXT = 'Введите номер телефона белорусского оператора в международном формате со знаком + (Длина - 13 символов)';