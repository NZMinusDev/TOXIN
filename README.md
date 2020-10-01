# ![TOXIN](app\src\assets\pictures\images\ico\favicon.ico)

## Описание

---

Данный репозиторий существует исключительно в образовательных целях. Задача - практика верстки по макету в рамках [программы подготовки](https://www.fullstack-development.com/) начинающих специалистов по направлению frontend.

## Дэмо

---

[Посмотреть результат практики можно тут](https://nzminusdev.github.io/TOXIN/).

## Для разработчиков

---

### Что тебе нужно для старта

1. Пакетный менеджер [NPM](https://www.npmjs.com/) и платформа [NodeJs](https://nodejs.org/en/).
2. CLI для выполнения команд из директории проекта (рекомендую bash).
3. Опционально: чистый VS Code редактор.

### Установка

Просто скопируй репозиторий и выполни в CLI команду:

```bash
npm i
```

### Использование

В package.json ты можешь найти полезные скрипты для управления сборкой. Для выполнения используй следующее:

```bash
npm run {script-name}.
```

Script-names:

- start - собирает пакеты и запускает обновляемый сервер с hmr в браузере по умолчанию;
- dev - собирает пакеты в _app/dist_, неминифицированный вид;
- build - собирает пакеты в _app/dist_, минифицированный вид;
- stats - создает файл статистики по сборке в app/log/stats.json и запускает анализатор сборки в браузере по умолчанию;
- ext - устанавливает расширения для VS Code, которые автор считает полезными.

## Внутри

---

### Дерево проекта

```tree
│   .gitignore
│   LICENSE
│   package-lock.json
│   package.json
│   README.md
│
├───.vscode
│       settings.json // настройки для vscode, обеспечивающие совместимость на разных машинах
│
├───app
│   ├───cache // сюда в отдельные внутренние папки складируем кэши
│   │
│   ├───dist // директория, где будут конечные файлы проекта
│   │   │   favicon.ico // иконка
│   │   │   page1.html // сгенерированная страница 1
│   │   │   page2.html // сгенерированная страница 2
│   │   │
│   │   ├───bundles // js ресурсы страниц
│   │   │   ├───common~page1~page2 // общие ресурсы с уровней library & common
│   │   │   │       common~page1~page2.js
│   │   │   │       common~page1~page2.js.map // файл source-map в режиме разработки, хранящий пути к исходникам при отладке
│   │   │   │
│   │   │   ├───css~page1~page2 // js от MiniCSSExtractPlugin с hmr
│   │   │   ├───experiments~page1~page2 // js уровня экспериментов
│   │   │   ├───large-desktop~page1~page2 // js для устройств >=1200px
│   │   │   ├───large-mobile~page1~page2 // js для устройств >=600px
│   │   │   ├───manifest // манифест webpack
│   │   │   ├───page1 // js страницы 1
│   │   │   ├───page2 // js страницы 2
│   │   │   ├───small-desktop~page1~page2 // js для устройств >=992px
│   │   │   ├───small-mobile~page1~page2 // js для устройств <= 599.98px
│   │   │   ├───tablet~page1~page2 // js для устройств >=768px
│   │   │   ├───themes~page1~page2 // js уровня тем
│   │   │   └───vendors~page1~page2 // js уровня node_modules
│   │   └───styles // css ресурсы страниц
│   │       ├───common~page1~page2
│   │       │       common~page1~page2.css
│   │       │       common~page1~page2.css.map
│   │       │
│   │       ├───css~page1~page2
│   │       ├───experiments~page1~page2
│   │       ├───large-desktop~page1~page2
│   │       ├───large-mobile~page1~page2
│   │       ├───small-desktop~page1~page2
│   │       ├───small-mobile~page1~page2
│   │       ├───tablet~page1~page2
│   │       └───themes~page1~page2
│   │
│   └───src
│       ├───assets // здесь статические файлы
│       │   └───pictures // например, картинки
│       │       ├───contents // которые вставляем через <img>
│       │       └───images // которые используем через css для украшательств
│       │           ├───backgrounds // например, фоны
│       │           └───ico // иконка (пусть будет тут)
│       │
│       ├───components // место, где живут все компоненты
│       │   ├───adaptive
│       │   │   ├───large-desktop.blocks
│       │   │   │   ├───basic // например: header, footer, aside, menu, forms, ...
│       │   │   │   ├───containers // визуально похожие блоки, например: блок с ценами, ...
│       │   │   │   ├───primitives // например: кнопки, чек боксы, ссылки, ...
│       │   │   │   └───specific // не повторяющиеся, но слишком объемные чтобы оставаться в главном файле блока, например: форма обратной связи
│       │   │   │
│       │   │   ├───large-mobile.blocks
│       │   │   ├───small-desktop.blocks
│       │   │   ├───small-mobile.blocks
│       │   │   └───tablet.blocks
│       │   ├───common.blocks
│       │   ├───experimental
│       │   │   └───experiment-1.blocks
│       │   ├───library.blocks
│       │   └───thematic // сюда добавляем директории тем, отличающиеся по количеству используемых цветов, если меняются просто цвета -> используем переменные
│       │       └───main-theme.blocks // основная тема проекта
│       │
│       ├───pages // здесь в под папках шаблоны страниц и точки входа webpack
│       │   ├───page1
│       │   │       page1.pug
│       │   │       page1.ts
│       │   │
│       │   └───page2
│       │
│       ├───pug // здесь шаблоны для страниц
│       │   ├───layouts // типовые слои
│       │   │       main.pug
│       │   │
│       │   └───mixins // полезные сокращения, обернутые в mixin-ы (на include жалуется один из лоадеров, пока только так)
│       │           head.pug
│       │           noscript-notification.pug
│       │
│       └───utils // место, где лежат полезные кусочки
│           │
│           └───normalizeCSS
│                   normalize.css // нормализация стилей каждой страницы в зависимости от browserslist (package.json)
│
├───configs
│       .eslintrc.js
│       .prettierrc.js
│       .tsconfig.js
│       webpack.config.js
│
└───node_modules
```

### Как это собирается в бандл

Объяснение необходимости в подобной структуре проекта найдешь [тут](https://ru.bem.info/methodology/redefinition-levels/).

Для каждой страницы загружаются только необходимые ей стили и скрипты. Достигается это с помощью анализа классов в шаблоне.

Порядок уровней переопределения следующий: library -> common -> small-mobile -> large-mobile -> table -> small-desktop -> large-desktop.

### Технологии

1. Расшаренные VS Code настройки.
2. VS Code расширения, повышающие комфорт:
   1. GitLens.
   2. PowerShell.
   3. Ayu.
   4. Material Icon Theme.
   5. Path Autocomplete.
   6. Auto Complete Tag.
   7. Bracket Pair Colorizer.
   8. Code Spell Checker.
   9. TODO Highlight.
   10. ESLint.
   11. Prettier - Code formatter.
   12. VSCode Map Preview.
   13. SVG.
   14. markdownlint.
   15. Sort Lines by Selection.
   16. Live Server.
   17. JavaScript (ES6) code snippets.
   18. Webpack Snippets.
3. Препроцессоры, повышающие скорость и качество работы:
   1. Pug.
   2. SCSS.
   3. TypeScript
4. Webpack, который избавляет от кучи головных болей:
   1. Страницы нужно только создавать, сборщик самостоятельно определит точки входа. Скрипты и стили сами подключаются к странице и порядок подключения всегда правильный. А также, тебе даже не нужно указывать @media в scss -> просто пиши стили, конечные файлы сами обернутся в нужный медиа запрос на основе уровня переопределения.
   2. Для каждой страницы загружается только то, что ей нужно и ресурсы, используемые несколькими страницами, грузятся только 1 раз.
   3. Нормализация начальных стилей через [Normalize.css](https://necolas.github.io/normalize.css/) для каждой страницы на основе указанных как поддерживаемые браузеров.
   4. Не нужно помнить кучу css префиксов и какие свойства где поддерживаются благодаря [PostCSS Preset Env](https://github.com/csstools/postcss-preset-env) и [Autoprefixer](https://www.npmjs.com/package/autoprefixer).
   5. [Современный JavaScript, сегодня](https://babeljs.io/).
   6. Сжатие картинок, скриптов, стилей, html в production моде. Заметка: Каждая картинка также будет иметь **.webp** клон, что дополнительно уменьшает конечный размер.
   7. Не нужно писать относительные пути для импорта, когда есть прекрасные псевдонимы для самых востребованных при разработке путей.
   8. Во время разработки при изменении pug/scss/ts сразу видно результат без ручных перезагрузок и сборки.
   9. ESLinter, использующий [Airbnb standarts](https://github.com/airbnb/javascript), сотрудничающий с prettier и typescript, который помогает защитить твои колени от :gun: и твою жизнь от траты :clock2:.
   10. Во время сборки webpack уведомит, если: есть круговые зависимости, подключены библиотеки разных версий, есть неиспользуемые файлы, есть css свойства, которые не поддерживают браузеры. Отобразит скорость обработки исходников на каждом этапе сборки.
   11. При изменении исходного кода, пользовательское устройство узнает об этом и загрузит только последнюю версию проекта (обеспечивается хешированием выходных файлов).
   12. Одинаково работает на разных платформах.

## License

Данный проект лицензируется на условиях [MIT license](LICENSE).
