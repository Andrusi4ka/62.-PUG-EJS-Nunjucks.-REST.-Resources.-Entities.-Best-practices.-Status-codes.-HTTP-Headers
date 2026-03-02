# Node.js + Express, favicon, Cookies, JWT

![screen-video](./assets/images/output.gif)

## 1. Технології
Проєкт реалізовано на:
- `Node.js`
- `Express.js`

Додатково використано:
- `pug` для серверного рендерингу частини сторінок
- `ejs` для серверного рендерингу сторінок `articles`
- `cookie-parser` для читання і встановлення cookies
- `jsonwebtoken` для генерації та перевірки JWT
- `bcryptjs` для хешування паролів
- `celebrate` + `joi` для валідації вхідних даних
- `formidable` для завантаження файлів

## 2. Статичні файли і favicon
### Що було зроблено
1. Додано `favicon.ico` у папку `public`.
2. Налаштовано Express на віддачу статичних файлів через `express.static(publicDir)` у `src/app.mjs`.
3. Додано окремий маршрут `GET /favicon.ico` у `src/app.mjs` для явної відправки іконки.
4. Додано тег іконки в обидва layout-шаблони:
- `views/layout.pug`
- `views-ejs/layout.ejs`

Використаний тег:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico?v=1">
```

Результат: favicon відображається на всіх HTML-сторінках, включно з PUG та EJS.

## 3. Cookies: збереження теми оформлення
### Що було зроблено
1. Підключено `cookie-parser` у `src/app.mjs`.
2. Створено маршрут `POST /theme` у `src/routes/root.mjs`.
3. Реалізацію маршруту винесено в `src/controllers/root.mjs` (`postThemeHandler`).
4. Додано форму перемикання теми в layout-и:
- `views/layout.pug`
- `views-ejs/layout.ejs`
5. Під час збереження виставляється cookie `theme` з налаштуваннями:
- `maxAge`
- `httpOnly: true`
- `sameSite: 'lax'`
6. Для кожного запиту тема читається з cookies і кладеться в `res.locals.theme` у `src/app.mjs`.
7. Значення теми використовується в шаблоні як клас `body`:
- `theme-light`
- `theme-dark`

### Логіка
1. Користувач обирає тему у формі в navbar.
2. Відправляється `POST /theme`.
3. Сервер валідовує значення (`light` або `dark`) і пише cookie `theme`.
4. Користувач редіректиться назад на поточну сторінку.
5. На наступному рендері тема береться з cookie і застосовується автоматично.

## 4. Інтеграція JWT (реєстрація, вхід, захищені маршрути)
### Що було зроблено
1. Створено окремий auth-роутер `src/routes/auth.mjs`.
2. Додано маршрути:
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)
- `POST /auth/logout` (protected)
3. Реалізовано контролер `src/controllers/auth.mjs`:
- реєстрація користувача
- перевірка email/password при вході
- генерація JWT
- установка JWT у cookie
- повернення поточного користувача
- вихід і очищення cookie
4. Створено middleware `middlewares/authenticateJwt.mjs` для перевірки JWT.
5. Додано константи auth у `src/constants/auth.mjs`:
- `AUTH_COOKIE_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `getAuthCookieOptions()`
6. Додано валідацію auth-запитів у `validators/authValidator.mjs`.
7. Додано сховище користувачів у пам’яті `src/data/authUsers.mjs`.

### Як працює JWT-логіка
1. `register/login` приймає дані користувача.
2. Для `register` пароль хешується через `bcryptjs`.
3. Після успішної реєстрації або входу сервер генерує JWT (`jsonwebtoken.sign`).
4. JWT зберігається в cookie `accessToken` з параметрами:
- `httpOnly: true`
- `sameSite: 'lax'`
- `secure: process.env.NODE_ENV === 'production'`
- `maxAge` (1 година)
5. Для `GET /auth/me` і `POST /auth/logout` спочатку виконується `authenticateJwt`.
6. Middleware читає token з cookies, верифікує його (`jsonwebtoken.verify`) і додає `req.user`.
7. Якщо токен відсутній або невалідний, повертається `401`.

## 5. Додатково реалізовано для наочності
1. На головній сторінці (`views/index.pug`) додано явний блок демонстрації JWT-статусу.
2. У navbar (`views/layout.pug`) додано індикатор:
- `JWT: вхід виконано як ...`
- або `JWT: гість`
3. Додано форми реєстрації/входу і кнопку виходу на головній сторінці.

## 6. Структура проєкту (ключові файли)
- `src/app.mjs` - ініціалізація Express, middleware, static, cookie-parser, рендер-локали
- `src/routes/root.mjs` - root-маршрути і підключення модулів
- `src/routes/auth.mjs` - auth API
- `src/controllers/root.mjs` - головна сторінка і тема через cookies
- `src/controllers/auth.mjs` - auth-логіка
- `middlewares/authenticateJwt.mjs` - JWT-захист
- `src/constants/auth.mjs` - конфіг auth/cookie
- `validators/authValidator.mjs` - валідація auth-запитів
- `views/layout.pug` - PUG layout з favicon і темою
- `views-ejs/layout.ejs` - EJS layout з favicon і темою
- `public/favicon.ico` - іконка сайту

## 7. Маршрути
### Root
- `GET /`
- `POST /theme`

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `POST /auth/logout`

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
- `GET /files`
- `POST /files`

## 8. Запуск
1. Встановити залежності:
```bash
npm install
```
2. Запустити проєкт:
```bash
npm run dev
```
3. Відкрити:
```text
http://localhost:3000
```

## 9. Важлива примітка
Користувачі для auth зараз зберігаються в пам’яті (`src/data/authUsers.mjs`), тому після перезапуску сервера вони скидаються.
