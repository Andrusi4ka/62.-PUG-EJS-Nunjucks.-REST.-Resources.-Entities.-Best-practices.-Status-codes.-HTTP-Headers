
# Розширення існуючого Express сервера за допомогою мідлварів

## Скриншот
![screen](./assets/images/screen-video.gif)

## Огляд можливостей

Цей проект — приклад сучасного Express-сервера з модульною структурою, middleware та валідацією. Основні можливості:

- CRUD-операції для ресурсів **Users** та **Articles** (отримання, створення, оновлення, видалення)
- Валідація даних через Joi (celebrate)
- Логування HTTP-запитів
- Обробка помилок та 404-сторінки
- Завантаження файлів через форму (formidable)
- Розділення логіки на контролери, роутери, middleware
- Рендеринг сторінок через шаблон layout.html

## Логіка та архітектура

- **app.mjs** — точка входу, створює сервер, підключає middleware, роутери, обробники помилок
- **routes/** — маршрутизація для Users, Articles, Files, кореневого маршруту
- **controllers/** — логіка обробки запитів для кожного ресурсу
- **middlewares/** — логування, обробка помилок, 404
- **validators/** — Joi-схеми для валідації запитів
- **public/** — статичні файли, layout.html, 404.html
- **uploads/** — збереження завантажених файлів
- **utils/renderPage.mjs** — рендеринг сторінок із шаблону

### Основний стек:
- Node.js, Express, ES Modules
- celebrate (Joi), formidable
- nodemon (dev)

## Структура проекту

```
project/
│
├── src/
│   ├── app.mjs                # Точка входу
│   ├── routes/
│   │   ├── root.mjs           # Головний роутер
│   │   ├── users.mjs          # Users API
│   │   ├── articles.mjs       # Articles API
│   │   └── files.mjs          # Завантаження файлів
│   ├── controllers/
│   │   ├── root.mjs           # Головна сторінка
│   │   ├── users.mjs          # Users logic
│   │   ├── articles.mjs       # Articles logic
│   │   └── files.mjs          # Files logic
│   └── utils/
│       └── renderPage.mjs     # Рендеринг сторінок
│
├── middlewares/
│   ├── logger.mjs             # Логування
│   ├── errorHandler.mjs       # Обробка помилок
│   ├── notFoundHandler.mjs    # 404 JSON
│   └── notFoundHtmlHandler.mjs# 404 HTML
│
├── validators/
│   ├── userValidator.mjs      # Валідація Users
│   └── articleValidator.mjs   # Валідація Articles
│
├── public/
│   ├── layout.html            # Шаблон сторінки
│   └── 404.html               # Красива 404
│
├── uploads/                   # Завантажені файли
├── package.json
└── README.md
```

## Основні маршрути

### Users (`/users`)
- `GET /users` — список користувачів
- `POST /users` — створити користувача (валідація)
- `GET /users/:id` — отримати користувача за ID
- `PUT /users/:id` — повністю оновити користувача (валідація)
- `PATCH /users/:id` — частково оновити користувача (валідація)
- `DELETE /users/:id` — видалити користувача

### Articles (`/articles`)
- `GET /articles` — список статей
- `POST /articles` — створити статтю (валідація)
- `GET /articles/:id` — отримати статтю за ID
- `PUT /articles/:id` — повністю оновити статтю (валідація)
- `PATCH /articles/:id` — частково оновити статтю (валідація)
- `DELETE /articles/:id` — видалити статтю

### Files (`/files`)
- `GET /files` — форма для завантаження файлів
- `POST /files` — завантаження файлів (formidable)

### Кореневий маршрут (`/`)
- `GET /` — головна сторінка

## Запуск та встановлення

1. Встановіть залежності:
   ```bash
   npm install
   ```
2. Запуск у dev-режимі (з nodemon):
   ```bash
   npm run dev
   ```
3. Або звичайний запуск:
   ```bash
   node src/app.mjs
   ```

## Технології
- Node.js, Express
- celebrate (Joi)
- formidable
- nodemon
