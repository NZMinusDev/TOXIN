const getKeyByMapValue = <K, V>(map: Map<K, V>, value: V) => {
  const result = [...map].find(([, val]) => val === value);

  if (result === undefined) {
    return undefined;
  }

  return result[0];
};

export { getKeyByMapValue };
