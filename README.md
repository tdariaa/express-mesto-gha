[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Бэкенд приложения "Место"

## Функциональность проекта:
- авторизация и регистрация пользователя, 
- добавление и удаление карточек,
- возможность изменять имя пользователя и описание,
- возможность менять аватар пользователя,
- добавление и снятие лайка с карточки

## Директории
`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и карточки   
`/models` — папка с файлами описания схем пользователя и карточки   
`/errors` — собственные конструкторы ошибок   
`/middlewares` — папка с мидлвэрами для централизованной обработки ошибок   
регистрации и авторизации   
`/utils ` — папка с константами

## Запуск проекта
`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

## Используемые технологии
* Node.js,
* Express.js,
* Mongo DB

