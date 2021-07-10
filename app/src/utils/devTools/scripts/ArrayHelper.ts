/**
 * Adds missing and removes extra elements
 */
const fixLength = <TArray extends unknown[]>(
  arr: TArray,
  desiredLength: number,
  filler: TArray[number]
) => {
  if (arr.length !== desiredLength) {
    const previousLength = arr.length;

    // eslint-disable-next-line no-param-reassign
    arr.length = desiredLength;
    // eslint-disable-next-line no-param-reassign
    arr = arr.fill(filler, previousLength);
  }
};

/**
 * Creates array with values generated by callbackFn
 * @param arrayLength - length of new array
 * @param callbackFn - callback for each new item of array
 * @returns filled array
 */
const createFilledArray = <TItem>(
  arrayLength: number,
  callbackFn: (value: TItem, index: number) => TItem
) => Array.from(Array(arrayLength), callbackFn);

// eslint-disable-next-line import/prefer-default-export
export { fixLength, createFilledArray };
