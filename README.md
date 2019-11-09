# Create-react-app + Redux + Swagger
Базовый реп-каркас, на основе которого удобно создавать React приложения.

Содержит в себе набор проверенных годами библиотек и ~~велосипедов~~ решений.

Основной стек:
* Create React App
* Redux
* Swagger

Второстепенный:
* **react-table** - таблицы
* **formsy-react** - управление формами
  * **react-select** - выпадающие списки
  * **react-datepicker** - инпуты дат
  * **react-rte** - визуальный редактор
* **redux-persist** - для длительного хранения redux стора на клиенте.
* **redux-notifications** - выезжающие уведомления (вместо alert)

## Установка
Для установки необходимо иметь на машине последнюю стабильную версию NodeJS (npm идёт в комплекте)
```
git clone https://github.com/cherginets/cra-redux-swagger.git <name_of_your_project>
cd <name_of_your_project>
npm install

# dev
npm run start

# prod
npm run build
```

## Использование
1. Установить репозиторий
2. Вырезать библиотеки, которые точно не понадобятся.
3. Приступать к разработке своего приложения