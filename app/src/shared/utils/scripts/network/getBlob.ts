const getBlob = async (url: URL) => {
  const response = await fetch(url.toString());

  if (response.ok) {
    return response.blob();
  }

  throw new Error(`Ошибка HTTP: ${response.status}`);
};

export { getBlob as default };
