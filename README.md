# TOXIN

![TOXIN](./app/src/assets/ico/favicon.ico)

## Description

---

This repository exists only for educational purposes. The goal is to write a site according to the [curriculum](https://en.metalamp.io/).

## Demo

---

[The design is here](https://www.figma.com/file/MumYcKVk9RkKZEG6dR5E3A/).
[The result is here](https://nzminusdev.github.io/TOXIN/).

## Contribution

---

### What do you need to start

1. Package manager [NPM](https://www.npmjs.com/) and [NodeJs](https://nodejs.org/en/) platform.
2. Some CLI to execute commands from directory of your project (bash is recommended).
3. Clean VS Code editor(optional).

### Installation

```bash
git clone https://github.com/NZMinusDev/TOXIN.git
cd TOXIN
npm i
```

### Managing

In [package.json](./package.json) you can find useful scripts for managing the project. To run script, use the following command:

```bash
npm run {script-name}
```

Script-names:

- **start** - builds bundles and runs server to be upgraded;
- **dev** - just builds bundles and place it into [dist](./app/dist) directory;
- **build** - build minify bundles and place it into [dist](./app/dist) directory;
- **analyze** - visualize size of webpack output files with an interactive zoomable treemap using webpack-bundle-analyzer;
- **lint** - lint styles and scripts, show result;
- **lint:fix** - use prettier for all known files, lint styles and scripts, auto fix files with errors if it is possible, show result;
- **deploy** - pushes [dist](./app/dist/) to origin/gh-pages, be sure you have git is installed globally and checkout for local gh-pages branch with committed build.

### Project tree

```tree
│   .gitignore
│   LICENSE
│   package-lock.json
│   package.json
│   readme.md
|   tsconfig.json
│
├───.vscode
|   ├───@media-snippets.code-snippets // css snippets
│   ├───extensions.json // recommended extensions
│   ├───script-snippets.code-snippets
│   ├───settings.json // settings for vscode to ensure compatibility on different machines
|   └───template-snippets.code-snippets
│
├───app
│   ├───cache // folder for cache folders
|   |
|   ├───log // folder for log folders
│   │
│   ├───dist // public folder with output files
│   │
│   └───src
│       ├───assets // static files here
|       |   ├───fonts // project's fonts
|       |   ├───ico // icons
│       │   └───pictures // images
│       │       ├───contents // for <img> tags
│       │       └───images // for css
│       │
│       ├───components // the place where all the components live
│       │   ├───common.blocks // project's code
|       |   |   ├───basic // header, footer, aside, menu, forms, ...
│       │   │   ├───containers // visually similar blocks, for example: a block with prices
│       │   │   │───primitives // buttons, check boxes, links, ...
│       │   │   └───specific // not repetitive, but too voluminous to remain in the main block file, for example: feedback form
|       |   |
│       │   └───library.blocks // vendors
│       │
│       ├───layouts // reused layouts
│       │
│       ├───pages // templates (webpack entry points)
│       │
│       ├───themes // our themes(borders, colors, fonts, etc)
│       │
│       └───utils // a place where useful pieces lie
│           ├───devTools // custom helpers
│           │
│           ├───global // resources for all pages
│           |
│           └───webpack // local webpack instruments, should be extracted to npm modules in the future
|
├───configs // project's configs
│
└───node_modules
```

### How it's collected to bundle

For each page only the necessary styles and scripts are loaded from all levels of redefinition. This is achieved by analyzing the class names in the templates and automatically adding the corresponding files by matching the name.

You can see additional explanation [here](https://en.bem.info/methodology/redefinition-levels/).

The order of redefinition levels is as follows: layouts -> library -> common.

### Some tips about code practice

#### SCSS

```scss
width: 100px / 14px * 1em; // means translating of 100px design size to em value, where 14px is size of font for this selector

/*
the goal is to achieve liquidness, see the formula of fluid font: ./app/src/utils/devTools/styles/mixins.scss
- main advantages: it has browsers' support, the size is always proportional to the neighboring content, the size is fluid
*/
```

### Technologies

- [shared vs code settings](./.vscode/settings.json);
- vs code extensions which increase comfort:
  - [required](./.vscode/extensions.json);
  - optional:
    - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens);
    - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph);
    - [GitHub Pull Requests and Issues](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github);
    - [PowerShell](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell);
    - [Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
    - [Ayu](https://marketplace.visualstudio.com/items?itemName=teabyii.ayu);
    - [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme);
    - [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag);
    - [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek);
    - [IntelliSense for CSS class names in HTML](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion);
    - [SCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)
    - [vscode-sassdoc](https://marketplace.visualstudio.com/items?itemName=rafikis75.vscode-sassdoc);
    - [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer);
    - [indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow);
    - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost);
    - [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets);
    - [SVG](https://marketplace.visualstudio.com/items?itemName=jock.svg);
    - [Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview);
    - [Change-Case](https://marketplace.visualstudio.com/items?itemName=wmaurer.change-case);
    - [Sort Lines by Selection](https://marketplace.visualstudio.com/items?itemName=earshinov.sort-lines-by-selection);
    - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer);
    - [Webpack Snippets](https://marketplace.visualstudio.com/items?itemName=gogocrow.webpack-snippets);
    - [Russian Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ru).
- preprocessors which speed up work:
  - [Pug](https://pugjs.org/api/getting-started.html);
  - [scss](https://sass-lang.com/);
  - [typescript](https://www.typescriptlang.org/).
- [webpack](https://v4.webpack.js.org/concepts/) which kill your headaches:
  - [Pages](./app/src/pages/) only need to be created, and the collector can determine the entry points on its own. Scripts and styles connect to the page themselves, and the order of connection is always correct. Resources used by multiple pages are loaded only 1 time;
  - connect images and use auxiliary modules directly in the [templates](./app/src/pages/cards/cards.pug)
  - no need to remember a bunch of css prefixes and what properties are supported thanks to [postCSS preset env](https://github.com/csstools/postcss-preset-env) and [autoprefixer](https://www.npmjs.com/package/autoprefixer);
  - [modern javascript, today](https://babeljs.io/);
  - compression of images, scripts, styles, html in production mode. Note: each image will also have a\*_. webp_ \* clone, which further reduces the final size;
  - there is no need to write relative paths for import when there are [excellent aliases](./configs/webpack.config.js) for the most popular paths in development;
  - during development, when changing files, the result is immediately visible without manual reboots and builds;
  - during the build, webpack will notify you if: there are circular dependencies, libraries of different versions are connected, there are unused files, there are css properties that browsers do not support. Displays the speed of source processing at each stage of the build;
  - if the source code is changed, the user device will know about it and download only the latest version of the project (provided by hashing the output files);
  - it should work the same on different platforms.
- [stylelint](https://stylelint.io/) based on [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) with [stylelint-order](https://github.com/hudochenkov/stylelint-order) and [stylelint-scss](https://github.com/kristerkari/stylelint-scss);
- [eslinter](https://eslint.org/) based on [airbnb standarts](https://github.com/airbnb/javascript) integrated with prettier and typescript which protects your knee from :gun: and your life from wasting :clock2:;
- Pre-installed libraries:
  - [fontawesome-free](https://fontawesome.com/) and [material-design-icons](https://github.com/google/material-design-icons);
  - [JQuery](https://jquery.com/);
  - [lodash-es](https://lodash.com/) to supplement the js standard. Tip: you should use only import of lodash-es(moreover, when importing, only care about the readability and strictness of the code, and not the optimization of the weight) instead of common lodash because ES6+ module syntax is supported by terser for optimization.
- Custom Tools:
  - [Basic layouts](./app/src/layouts/);
  - pug, scss, ts [shortcuts](./app/src/utils/devTools/);
  - [pug](<(./.vscode/template-snippets.code-snippets)>) and [scss](<(./.vscode/@media-snippets.code-snippets)>) snippets, [ts](<(./.vscode/script-snippets.code-snippets)>);
  - [to-top-arrow](./app/src/components/common.blocks/specific/to-top-arrow/) component;
  - [click-jacking-protector](./app/src/components/common.blocks/specific/click-jacking-protector/) for each page(you can configure it in [template](./app/src/layouts/basic/main-layout/main-layout.pug));
  - [global error catcher](./app/src/utils/global/modules/scripts/unhandledrejection.ts) for unhandled errors.
  - [keyboard accessibility](./app/src/utils/global/modules/scripts/keyboardAccessibility.ts) for elements that do not support basic keyboard presses.

## License

This project is licensed under the terms of the [MIT license](LICENSE).
