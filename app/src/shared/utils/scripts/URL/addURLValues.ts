const addURLValues = (...added: { name: string; value: string }[]): void => {
  const locationURL = new URL(window.location.href);

  added.forEach((toAdd) => {
    locationURL.searchParams.set(toAdd.name, toAdd.value);
  });

  window.location.href = locationURL.toString();
};

export { addURLValues as default };
