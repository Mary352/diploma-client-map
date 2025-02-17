# diploma-client-map
Frontend-часть приложения для просмотра и подачи объявлений о потерянных и найденных объектах. Веб-приложение ориентировано на людей, которые потеряли вещь или питомца, или нашли – и ищут хозяина. Backend-часть приложения находится здесь: [diploma-server-map](https://github.com/Mary352/diploma-server-map)

## Технологии
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [React Yandex Maps](https://pbe-react-yandex-maps.vercel.app/en/)
- [MaterialUI](https://mui.com/material-ui/)
- [Microsoft SQL Server](https://www.microsoft.com/ru-ru/sql-server)
- [Express](https://expressjs.com/ru/)
- [Prisma](https://www.prisma.io/)
- [Nodemailer](https://nodemailer.com/)

## Использование

### Установка

```
npm install
```

### Настройка переменных среды
В diploma-server-map требуется указать переменные среды:
- DATABASE_URL, которая представляет собой строку подключения к Microsoft SQL Server;
- PORT - порт на котором запускается backend;
- COOKIE_SECRET - строка или массив, используемые для подписи файлов cookie;
- ACCESS_KEY - второй параметр (secretOrPrivateKey) для операции jwt.sign из библиотеки jsonwebtoken;
- EMAIL - email администратора приложения;
- PASSWORD - пароль для доступа к почте администратора из данного приложения.
В diploma-client-map требуется указать переменные среды:
- REACT_APP_NAME - название приложения (будет выведено на главной странице);
- REACT_APP_YEARS_TO_SAVE_USERS - количество лет, которое аккаунт пользователя будет храниться в базе данных приложения;
- Ключи для работы с API Яндекс.Карты, полученные в кабинете разработчика Яндекс:
   - REACT_APP_APIKEY_YMAPS - ключ от подключения JavaScript API и HTTP Геокодер;
   - REACT_APP_SUGGEST_APIKEY_YMAPS - ключ от подключения API Геосаджеста - позволяет получать предложения поисковой выдачи во время поиска географических объектов и/или организаций на карте Яндекса.

### Запуск [diploma-server-map](https://github.com/Mary352/diploma-server-map)

```
npm run start
```

### Запуск diploma-client-map 

```
npm run start
```

## Возможности
Описаны в docs/Руководство пользователя.pdf и продемонстрированы на видео docs/demonstration.mp4

## Try on Render
https://diploma-client-map.onrender.com
*Изображения у объявлений не отображаются в Render. Просмотр с изображениями доступен при запуске на localhost.