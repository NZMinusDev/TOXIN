const getJSON = async (url: URL) => {
  const response = await fetch(url.toString());

  if (response.ok) {
    return (await response.json()) as Promise<JSON>;
  }

  throw new Error(`Ошибка HTTP: ${response.status}`);
};

export { getJSON as default };
