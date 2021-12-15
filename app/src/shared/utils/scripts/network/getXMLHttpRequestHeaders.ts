/**
 * @example
 * const headers = getXMLHttpRequestHeaders(xhr);
 * headers['Content-Type'] // 'image/png';
 */
const getXMLHttpRequestHeaders = (xhr: XMLHttpRequest) =>
  xhr
    .getAllResponseHeaders()
    .split('\r\n')
    .reduce((result: { [index: string]: string }, current) => {
      const [name, value] = current.split(': ');

      const resultRef = result;
      resultRef[name] = value;

      return result;
    }, {});

export { getXMLHttpRequestHeaders as default };
