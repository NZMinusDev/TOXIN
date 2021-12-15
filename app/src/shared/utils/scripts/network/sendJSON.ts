const sendJSON = (url: URL, valueToStringify: unknown) =>
  fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(valueToStringify),
  });

export { sendJSON as default };
