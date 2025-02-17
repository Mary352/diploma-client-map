export const isPhoneValid = (phone: string) => {
   // const phoneRegex = /^(?:\+|\d)[\d]{9,}\d$/;
   // const phoneRegex = /^\+[\d]{11,}$/;
   // ^(\+375|80)(29|25|44|33)(\d{3})(\d{2})(\d{2})$ - +375-YY-XXX-XX-XX 80-YY-XXX-XX-XX
   const phoneRegex = /^\+375(29|33|44|25)[\d]{7}$/;
   return phoneRegex.test(phone);
};

