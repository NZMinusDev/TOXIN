/**
 * It's shortcut of default handleEvent in EventListenerObject
 */
// eslint-disable-next-line func-style
function handleEvent<TTHis extends Record<string, (event: Event) => unknown>>(
  this: TTHis,
  event: Event,
  elementName?: string
) {
  const handlerName =
    elementName === undefined
      ? `_on${event.type[0].toUpperCase()}${event.type.slice(1)}`
      : `handle${elementName[0].toUpperCase()}${elementName.slice(
          1
        )}${event.type[0].toUpperCase()}${event.type.slice(1)}`;

  if (this[handlerName]) {
    this[handlerName](event);
  }

  return this;
}

/**
 * Apply mixins to derivedConstructor. Tip: if you can use `extends` - do it instead of this function
 * @param derivedConstructor - class/constructor to derived
 * @param mixinConstructors - classes/constructors adding functionality to derivedConstructor
 * @example
 * // Each mixin is a traditional ES class
 * class Jumpable {
 *  jump() {}
 * }
 *
 * class Duckable {
 *   duck() {}
 * }
 *
 * // Including the base
 * class Sprite {
 *   x = 0;
 *   y = 0;
 * }
 *
 * // Then you create an interface which merges
 * // the expected mixins with the same name as your base
 * interface Sprite extends Jumpable, Duckable {}
 * // Apply the mixins into the base class via the JS at runtime
 * applyMixins(Sprite, [Jumpable, Duckable]);
 *
 * let player = new Sprite();
 * player.jump();
 * console.log(player.x, player.y);
 */
const applyMixins = <
  TDerivedConstructor extends new (...args: unknown[]) => unknown,
  TMixinConstructors extends new (...args: unknown[]) => unknown
>(
  derivedConstructor: TDerivedConstructor,
  mixinConstructors: TMixinConstructors[]
) => {
  mixinConstructors.forEach((baseConstructor) => {
    Object.getOwnPropertyNames(baseConstructor.prototype).forEach((name) => {
      Object.defineProperty(
        derivedConstructor.prototype,
        name,
        Object.getOwnPropertyDescriptor(baseConstructor.prototype, name) ||
          Object.create(null)
      );
    });
  });
};

/**
 *
 * @param event - event of handler
 * @param parent - HTMLElement with handlers
 * @param descendantSelector - necessary descendant
 * @returns result of checking
 */
const checkDelegatingEvents = (
  event: Event,
  parent: HTMLElement,
  descendantSelector: string
) => {
  const { target } = event;

  if (target instanceof HTMLElement) {
    const descendant = target.closest(descendantSelector);

    if (descendant === null && !parent.contains(descendant)) {
      return false;
    }
  }

  return true;
};

export { handleEvent, applyMixins, checkDelegatingEvents };
