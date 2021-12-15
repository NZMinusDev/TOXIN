const sendProgressedJSON = async (
  url: URL,
  valueToStringify: unknown,
  {
    progressCallback,
  }: { progressCallback?: (event: ProgressEvent<EventTarget>) => void } = {}
) => {
  const xhr = new XMLHttpRequest();

  xhr.upload.onprogress = (event) => {
    progressCallback?.(event);
  };

  return new Promise((resolve) => {
    xhr.onloadend = () => {
      resolve(xhr);
    };

    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');

    xhr.open('POST', url.toString());
    xhr.send(JSON.stringify(valueToStringify));
  });
};

export { sendProgressedJSON as default };
