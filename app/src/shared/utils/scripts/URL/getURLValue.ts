const getURLValue = (name: string): string | undefined => {
  const locationURL = new URL(window.location.href);

  return (
    locationURL.searchParams.get(name) ||
    (locationURL.searchParams.has(name) ? '' : undefined)
  );
};

export { getURLValue as default };
