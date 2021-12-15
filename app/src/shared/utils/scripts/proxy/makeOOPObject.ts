/**
 * Hide "private" _fields; be sure that you know what you are doing: confusion is possible where the original object is, and where is the proxied one when transferring objects somewhere else and with multiple proxying; use it only if you really need inherit fields, otherwise see private js fields: #field
 * @param obj - proxy target
 * @returns proxy where "private" _fields is hided
 * @example
 * let user = { name: "Mike", age: 30, _password: "***" };
 * user = makeOOPObject(user);
 * for(let key in user) alert(key); // name and age without _password
 * alert( Object.keys(user) ); // name,age
 * alert( Object.values(user) ); // Mike,30
 * try {
 *   alert(user._password); // Error: Access denied
 * } catch(e) { alert(e.message); }
 * try {
 *   user._password = "test"; // Error: Access denied
 * } catch(e) { alert(e.message); }
 * try {
 *   delete user._password; // Error: Access denied
 * } catch(e) { alert(e.message); }
 */
const makeOOPObject = <TObj extends Record<string | number | symbol, unknown>>(
  obj: TObj
) => {
  const deniedMessage = 'Отказано в доступе';

  return new Proxy(obj, {
    get(target, propertyName) {
      if (propertyName.toString().startsWith('_')) {
        throw new Error(deniedMessage);
      } else {
        const value = target[propertyName];

        // method of the object itself, must have access to the property
        return typeof value === 'function' ? value.bind(target) : value;
      }
    },
    set(target, propertyName, val: unknown) {
      // intercept the property record
      if (propertyName.toString().startsWith('_')) {
        throw new Error(deniedMessage);
      } else {
        const targetRef = target;
        // don't understand why targetRef can't be typed automatically
        (targetRef as any)[propertyName] = val;

        return true;
      }
    },
    deleteProperty(target, propertyName) {
      // intercept property deletion
      if (propertyName.toString().startsWith('_')) {
        throw new Error(deniedMessage);
      } else {
        const targetRef = target;
        delete targetRef[propertyName];

        return true;
      }
    },
    ownKeys(target) {
      // intercept the iteration attempt
      return Object.keys(target).filter((key) => !key.startsWith('_'));
    },
  });
};

export { makeOOPObject as default };
