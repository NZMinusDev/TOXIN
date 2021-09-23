const path = require('path');
const fs = require('fs');

/**
 * Get all inner files in directory
 * @param { string } dir path to dir
 * @param { string[] } excludedExt extensions to exclude
 * @param { string[] } _files private param of files path for recursion
 * @return { string[] } array of files' paths
 */
const getFilesDeep = (dir, excludedExt, _files) => {
  // eslint-disable-next-line no-param-reassign
  _files = _files || [];
  const files = fs.readdirSync(dir);

  files.forEach((val, i) => {
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

// eslint-disable-next-line import/prefer-default-export
export { getFilesDeep };
