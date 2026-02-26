# Express Learning Project: Pug, EJS, REST, Cookies, JWT

## Що це за проєкт
Це навчальний Express-проєкт, у якому поєднані:
- REST-підхід для маршрутів `users`, `articles`, `files`, `auth`
- серверний рендеринг сторінок через **Pug** і **EJS**
- робота з **cookies** (вибір теми сайту)
- базова **JWT-авторизація** через `httpOnly` cookie
- завантаження файлів через форму

Проєкт показує, як розділяти код на `routes`, `controllers`, `middlewares`, `validators`, `utils`.

## Основні можливості
- CRUD-маршрути для `users` і `articles`
- Валідація вхідних даних через `celebrate` + `Joi`
- Логування HTTP-запитів через middleware
- Обробка помилок і 404 сторінки
- Завантаження файлів через `formidable` у папку `uploads`
- Збереження теми (`light`/`dark`) у cookie `theme`
- JWT auth:
  - `POST /auth/register`
  - `POST /auth/login`
  - `GET /auth/me` (захищений)
  - `POST /auth/logout` (захищений)

## Логіка виконання
1. Запит приходить у `src/app.mjs`.
2. Підключаються middleware:
- `express.static` (статичні файли)
- `cookie-parser` (читання cookies)
- `express.json` / `express.urlencoded` (парсинг body)
- middleware теми (кладе `theme` і `currentPath` у `res.locals`)
- `logger`
3. Далі запит іде в головний роутер `src/routes/root.mjs`.
4. Роутер перенаправляє на потрібний модуль (`users`, `articles`, `files`, `auth`).
5. Якщо для маршруту є валідація або JWT-перевірка, вона виконується перед контролером.
6. Контролер повертає HTML (Pug/EJS) або JSON.
7. Якщо сталася помилка, її ловить `errorHandler`, якщо маршрут не знайдено - `notFoundHtmlHandler`.

## Рендеринг сторінок
- **Pug**: основні сторінки (`views/...`) та layout `views/layout.pug`
- **EJS**: сторінки `articles` через helper `src/utils/renderEjsPage.mjs` і layout `views-ejs/layout.ejs`

## Авторизація JWT
- Під час `register/login` генерується JWT.
- Токен зберігається в cookie `accessToken` з параметрами:
  - `httpOnly: true`
  - `sameSite: 'lax'`
  - `secure: true` лише у production
- Захищені маршрути проходять через middleware `middlewares/authenticateJwt.mjs`.

Важливо: зараз користувачі для auth зберігаються в пам'яті (`src/data/authUsers.mjs`), тобто після перезапуску сервера вони скидаються.

## Робота з темою через Cookies
- У layout є форма перемикання теми (`light` / `dark`).
- `POST /theme` зберігає вибір у cookie `theme`.
- При наступних запитах тема читається з cookies і підставляється у шаблон.

## Маршрути
### Root
- `GET /` - головна сторінка
- `POST /theme` - зберегти тему в cookie

### Users
- `GET /users`
- `POST /users`
- `GET /users/:id`
- `PUT /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

### Articles
- `GET /articles`
- `POST /articles`
- `GET /articles/:id`
- `PUT /articles/:id`
- `PATCH /articles/:id`
- `DELETE /articles/:id`

### Files
- `GET /files` - форма завантаження
- `POST /files` - завантаження файлів

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)
- `POST /auth/logout` (protected)

## Бібліотеки ("плагіни"), які використані
- `express` - сервер і маршрутизація
- `pug` - шаблонізатор
- `ejs` - шаблонізатор
- `celebrate` + `joi` - валідація даних
- `formidable` - завантаження файлів
- `cookie-parser` - робота з cookies
- `jsonwebtoken` - генерація/перевірка JWT
- `bcryptjs` - хешування паролів
- `nodemon` (dev) - автоперезапуск під час розробки

## Запуск проєкту
1. Встановити залежності:
```bash
npm install
```

2. Запустити в dev-режимі:
```bash
npm run dev
```

3. Відкрити в браузері:
```text
http://localhost:3000
```