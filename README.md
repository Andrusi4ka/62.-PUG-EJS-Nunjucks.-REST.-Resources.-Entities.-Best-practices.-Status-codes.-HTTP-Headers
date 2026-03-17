# Node.js + Express: static files, cookies, JWT

![screen-video](./assets/images/screen-video.gif)

## Зроблені зміни
- Налаштовано віддачу статичних файлів через `express.static(...)`.
- Додано `favicon.ico` у `public` і підключено favicon у PUG та EJS layout-шаблонах.
- Реалізовано збереження теми оформлення через cookies (`light` / `dark`).
- Підключено `cookie-parser` для читання і запису cookies.
- Додано JWT-авторизацію через `register`, `login`, `logout`, `me`.
- JWT зберігається в `httpOnly` cookie `accessToken`.
- Реалізовано middleware `authenticateJwt` для захищених маршрутів.
- Додано логування запитів через `logger` middleware.
- Додано централізовану обробку помилок через `errorHandler`.
- Додано `404`-обробник для HTML-сторінок.
- Реалізовано валідацію даних для `auth`, `users`, `articles`.
- Форми авторизації на головній сторінці відправляються через `fetch`, тому браузер не показує сирий JSON після submit.
- Для звичайних HTML-форм в auth-контролерах додано fallback через `303 redirect`.


![screen-video](./assets/images/output.gif)


## 1. Технології
Проєкт реалізовано на:
- `Node.js`
- `Express.js`

Додатково використано:
- `pug` для серверного рендерингу частини сторінок
- `ejs` для серверного рендерингу сторінок `articles`
- `cookie-parser` для читання та запису cookies
- `jsonwebtoken` для генерації та перевірки JWT
- `bcryptjs` для хешування паролів
- `celebrate` + `joi` для валідації вхідних даних
- `formidable` для завантаження файлів

## 2. Статичні файли і favicon
Що реалізовано:
1. Додано [`public/favicon.ico`](./public/favicon.ico).
2. У [`src/app.mjs`](./src/app.mjs) налаштовано `express.static(publicDir)`.
3. Додано окремий маршрут `GET /favicon.ico`.
4. Тег favicon додано в обидва layout-шаблони:
- [`views/layout.pug`](./views/layout.pug)
- [`views-ejs/layout.ejs`](./views-ejs/layout.ejs)

Використовується тег:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico?v=1">
```

Результат: favicon відображається на всіх HTML-сторінках, включно з PUG та EJS.

## 3. Cookies: збереження теми
Що реалізовано:
1. Підключено `cookie-parser` у [`src/app.mjs`](./src/app.mjs).
2. Створено маршрут `POST /theme` у [`src/routes/root.mjs`](./src/routes/root.mjs).
3. Логіку винесено в [`src/controllers/root.mjs`](./src/controllers/root.mjs).
4. У layout-шаблонах додано форму перемикання теми.
5. Сервер зберігає cookie `theme` з параметрами:
- `maxAge`
- `httpOnly: true`
- `sameSite: 'lax'`
6. На кожному запиті тема читається з cookies і записується в `res.locals.theme`.
7. Значення теми використовується як CSS-клас `theme-light` або `theme-dark`.

Як це працює:
1. Користувач обирає тему у navbar.
2. Відправляється `POST /theme`.
3. Сервер перевіряє значення (`light` або `dark`) і записує cookie.
4. Користувач редіректиться назад на поточну сторінку.
5. Під час наступного рендеру тема автоматично застосовується.

## 4. JWT: реєстрація, вхід, вихід, захищені маршрути
Що реалізовано:
1. Створено auth-router [`src/routes/auth.mjs`](./src/routes/auth.mjs).
2. Додано маршрути:
- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me` (protected)
- `POST /auth/logout` (protected)
3. Реалізовано контролер [`src/controllers/auth.mjs`](./src/controllers/auth.mjs):
- реєстрація користувача
- перевірка email/password при вході
- генерація JWT
- встановлення JWT у cookie
- повернення поточного користувача
- вихід та очищення cookie
4. Додано middleware [`middlewares/authenticateJwt.mjs`](./middlewares/authenticateJwt.mjs) для перевірки JWT.
5. Додано константи auth у [`src/constants/auth.mjs`](./src/constants/auth.mjs):
- `AUTH_COOKIE_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `getAuthCookieOptions()`
6. Додано валідацію auth-запитів у [`validators/authValidator.mjs`](./validators/authValidator.mjs).
7. Користувачі для auth зберігаються в пам’яті у [`src/data/authUsers.mjs`](./src/data/authUsers.mjs).

Як працює JWT-логіка:
1. `register` і `login` приймають дані користувача.
2. Під час `register` пароль хешується через `bcryptjs`.
3. Після успішної реєстрації або входу сервер генерує JWT.
4. JWT зберігається в cookie `accessToken` з параметрами:
- `httpOnly: true`
- `sameSite: 'lax'`
- `secure: process.env.NODE_ENV === 'production'`
- `maxAge: 1 година`
5. Для `GET /auth/me` і `POST /auth/logout` використовується `authenticateJwt`.
6. Middleware читає токен з cookies, верифікує його і записує `req.user`.
7. Якщо токен відсутній або невалідний, повертається `401`.

## 5. Авторизація на головній сторінці
На головній сторінці [`views/index.pug`](./views/index.pug):
- показується поточний JWT-статус
- є форми реєстрації та входу
- є кнопка виходу

Поведінка форм:
1. Форми `register`, `login` і `logout` на сторінці відправляються через `fetch`.
2. Браузер не показує сирий JSON після submit.
3. Після успішного входу, реєстрації або виходу інтерфейс оновлюється переходом на головну сторінку.
4. У контролерах також залишено fallback для звичайних HTML-форм через `303 redirect`.

## 6. Middleware
У проєкті використовуються додаткові middleware:
- [`middlewares/logger.mjs`](./middlewares/logger.mjs)  
  Логує метод, URL і час кожного запиту.
- [`middlewares/errorHandler.mjs`](./middlewares/errorHandler.mjs)  
  Централізовано повертає JSON-відповідь з кодом помилки та текстом помилки.
- [`middlewares/notFoundHtmlHandler.mjs`](./middlewares/notFoundHtmlHandler.mjs)  
  Обробляє HTML-запити до неіснуючих маршрутів і віддає сторінку `404`.
- [`middlewares/authenticateJwt.mjs`](./middlewares/authenticateJwt.mjs)  
  Перевіряє JWT для захищених маршрутів.

## 7. Валідація даних
Крім auth, у проєкті додано валідацію для інших сутностей:
- [`validators/authValidator.mjs`](./validators/authValidator.mjs)  
  Валідує `register` і `login`.
- [`validators/userValidator.mjs`](./validators/userValidator.mjs)  
  Валідує `POST`, `PUT`, `PATCH` і `:id` для маршрутів користувачів.
- [`validators/articleValidator.mjs`](./validators/articleValidator.mjs)  
  Валідує `POST`, `PUT`, `PATCH` і `:id` для маршрутів статей.

Валідація побудована на `celebrate` / `Joi`.

## 8. Структура проєкту
Ключові файли:
- [`src/app.mjs`](./src/app.mjs) - ініціалізація Express, middleware, static, cookies, locals
- [`src/routes/root.mjs`](./src/routes/root.mjs) - головні маршрути і підключення модулів
- [`src/routes/auth.mjs`](./src/routes/auth.mjs) - auth API
- [`src/routes/users.mjs`](./src/routes/users.mjs) - маршрути користувачів
- [`src/routes/articles.mjs`](./src/routes/articles.mjs) - маршрути статей
- [`src/routes/files.mjs`](./src/routes/files.mjs) - маршрути файлів
- [`src/controllers/root.mjs`](./src/controllers/root.mjs) - головна сторінка і тема
- [`src/controllers/auth.mjs`](./src/controllers/auth.mjs) - auth-логіка
- [`middlewares/authenticateJwt.mjs`](./middlewares/authenticateJwt.mjs) - JWT-захист
- [`validators/authValidator.mjs`](./validators/authValidator.mjs) - auth-валідація
- [`validators/userValidator.mjs`](./validators/userValidator.mjs) - валідація користувачів
- [`validators/articleValidator.mjs`](./validators/articleValidator.mjs) - валідація статей
- [`views/layout.pug`](./views/layout.pug) - PUG layout
- [`views-ejs/layout.ejs`](./views-ejs/layout.ejs) - EJS layout
- [`public/favicon.ico`](./public/favicon.ico) - favicon

## 9. Маршрути
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

## 10. Запуск
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

## 11. Важлива примітка
Користувачі для auth зберігаються тільки в пам’яті, тому після перезапуску сервера вони скидаються.
