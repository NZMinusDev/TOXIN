/**
 * Adds missing and removes extra elements
 */
const fixLength = <TArray extends unknown[]>(
  arr: TArray,
  desiredLength: number,
  filler: TArray[number]
) => {
  const copy = [...arr];
  const previousLength = copy.length;

  copy.length = desiredLength;

  if (previousLength < desiredLength) {
    return copy.fill(filler, previousLength);
  }

  return copy;
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

export { fixLength, createFilledArray };
