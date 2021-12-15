/**
 * Get file path without extension and extension separately
 * @param fullPath - path to file
 * @returns file path without extension and file extension parts, comma non included
 */
const parseFileExtension = (fullPath: string) => {
  const filePath = fullPath.substring(0, fullPath.lastIndexOf('.')) || fullPath;
  const fileExt =
    fullPath.substring(fullPath.lastIndexOf('.') + 1, fullPath.length) ||
    fullPath;

  return { filePath, fileExt };
};

export { parseFileExtension as default };
