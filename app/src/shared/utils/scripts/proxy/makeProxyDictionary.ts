/**
 *
 * @param obj - proxy target
 * @returns proxy where undefined fields returns the field instead undefined
 * @example
 * let dictionary = {'Hello': 'Hola','Bye': 'Adiós'};
 * dictionary = makeProxyDictionary(dictionary);
 * alert( dictionary['Hello'] ); // Hola
 * alert( dictionary['Welcome to Proxy']); // Welcome to Proxy
 */
const makeProxyDictionary = <
  TObj extends Record<string | number | symbol, unknown>
>(
  obj: TObj
) =>
  new Proxy(obj, {
    get(target, phrase) {
      // перехватываем чтение свойства в dictionary
      if (phrase in target) {
        // если перевод для фразы есть в словаре, возвращаем его
        return target[phrase];
      }

      // иначе возвращаем непереведённую фразу
      return phrase;
    },
  });

export { makeProxyDictionary as default };
