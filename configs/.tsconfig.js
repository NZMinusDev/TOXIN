//FIXME: This config is unused. For working with TypeScript uses babel preset.
/*
Файл "tsconfig.js":
 - устанавливает корневой каталог проекта TypeScript;
 - выполняет настройку параметров компиляции;
 - устанавливает файлы проекта.

 Присутствие файла "tsconfig.js" в папке указывает TypeScript, что это корневая папка проекта.

 Внутри "tsconfig.js" указываются настройки компилятора TypeScript и корневые файлы проекта.

 Программа компилятора "tsc" ищет файл "tsconfig.js" сначала в папке, где она расположена, затем поднимается выше и ищет в родительских папках согласно их вложенности друг в друга.

 Команда "tsc --project C:\path\to\my\project\folder" берет файл "tsconfig.js" из папки, расположенной по данному пути.

 Файл "tsconfig.js" может быть полностью пустым, тогда компилятор скомпилирует все файлы с настройками заданными по умолчанию.
 
 Опции компилятора, перечисленные в командной строке перезаписывают собой опции, заданные в файле "tsconfig.js".
*/
module.exports = {
  compilerOptions: {
    /**
     * Путь до папки с которой надо начинать поиск входных файлов.
     * Обычно корневая директория вычисляется по списку входных файлов.
     * Данная опция необходима для проверки, что все найденные TypeScript-файлы находятся внутри корневой папки.
     */
    rootDir: "../app/src",
    /**
     * Поместить все скомпилированные файлы в данную папку, согласно их вложенности в исходниках
     * Если задана опция "outFile", то опция "outDir" будет проигнорирована.
     */
    outDir: "../app/dist",
    baseUrl: "../app/src", // Путь до базовой папки для поиска не относительных путей до файлов.
    allowJs: true, // Разрешать компилировать файлы с JavaScript-кодом?
  },
  include: ["../app/src/**/*"],
  exclude: ["../app/src/library.blocks/**/*"],
};
