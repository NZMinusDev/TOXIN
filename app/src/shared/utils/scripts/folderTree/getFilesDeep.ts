const path = require('path');
const fs = require('fs');

/**
 * Get all inner files in directory
 * @param dir path to dir
 * @param excludedExt extensions to exclude
 * @param _files private param of files path for recursion
 * @return array of files' paths
 */
const getFilesDeep = (
  dir: string,
  excludedExt: string[],
  _files: string[] = []
) => {
  const files = fs.readdirSync(dir);

  files.forEach((val: string, i: number) => {
    const name = path.resolve(dir, files[i]);

    if (
      excludedExt.includes(
        name.substring(name.lastIndexOf('.') + 1, name.length) || name
      )
    )
      return;

    if (fs.statSync(name).isDirectory()) {
      getFilesDeep(name, excludedExt, _files);
    } else {
      _files.push(name);
    }
  });

  return _files;
};

export { getFilesDeep as default };
