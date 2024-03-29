type IsolatedEventName = string;
type DetailsOfIsolatedEvent = Record<string, unknown>;
type IsolatedEvents = Record<IsolatedEventName, DetailsOfIsolatedEvent>;

interface ListenerOfIsolatedEvent<
  TDetailsOfIsolatedEvent extends DetailsOfIsolatedEvent
> {
  (details: TDetailsOfIsolatedEvent): void;
}

interface ListenerObjectOfIsolatedEvent<
  TDetailsOfIsolatedEvent extends DetailsOfIsolatedEvent
> {
  handleEvent(details: TDetailsOfIsolatedEvent): void;
  [key: string]: unknown;
}

type ListenerOfIsolatedEventOrListenerObjectOfIsolatedEvent<
  TDetailsOfIsolatedEvent extends DetailsOfIsolatedEvent
> =
  | ListenerOfIsolatedEvent<TDetailsOfIsolatedEvent>
  | ListenerObjectOfIsolatedEvent<TDetailsOfIsolatedEvent>;

/**
 * Add events processing inside class without inheritances and make child's handlers inside one class
 * @example
 * // example 1
 * class Menu {
 *   choose(value) { this.trigger("select", { value }); }
 * }
 * applyMixins(Menu, EventManagerMixin);// add mixin (or use "extends" if you can)
 *
 * interface Menu extends Menu, EventManagerMixin<select: { value: string }> {}
 *
 * let menu = new Menu();
 *
 * menu.on("select", value => alert(`The selected value: ${value}`));
 * menu.choose("123"); // 123
 *
 * // example 2
 * class Menu {
 *   onMousedown(event) {
 *     event.currentTarget.innerHTML = "The mouse button is pressed";
 *   }
 *
 *   onMouseup(event) {
 *     event.currentTarget.innerHTML += "...and unpressed.";
 *   }
 * }
 *
 * let menu = new Menu();
 * btn.addEventListener('mousedown', menu);
 * btn.addEventListener('mouseup', menu);
 */
class EventManagerMixin<TEvents extends IsolatedEvents> {
  protected _eventHandlers: {
    [
      key: string
    ]: ListenerOfIsolatedEventOrListenerObjectOfIsolatedEvent<any>[];
  } = {};

  // Subscribe to the event
  on<TEventType extends keyof TEvents>(
    eventName: TEventType,
    eventHandler: ListenerOfIsolatedEventOrListenerObjectOfIsolatedEvent<
      TEvents[TEventType]
    >
  ) {
    if (typeof eventName === 'string') {
      if (this._eventHandlers[eventName] === undefined) {
        this._eventHandlers[eventName] = [];
      }

      if (!this._eventHandlers[eventName].includes(eventHandler)) {
        this._eventHandlers[eventName].push(eventHandler);
      }
    }

    return this;
  }

  // Cancel subscribe
  off<TEventType extends keyof TEvents>(
    eventName: TEventType,
    eventHandler: ListenerOfIsolatedEventOrListenerObjectOfIsolatedEvent<
      TEvents[TEventType]
    >
  ) {
    if (typeof eventName === 'string') {
      const handlers = this._eventHandlers && this._eventHandlers[eventName];

      if (handlers === undefined) {
        return this;
      }

      handlers.splice(handlers.indexOf(eventHandler), 1);
    }

    return this;
  }

  // Generate the event with the specified name and data
  trigger<TEventType extends keyof TEvents>(
    eventName: TEventType,
    details: TEvents[TEventType]
  ) {
    if (typeof eventName === 'string') {
      // no handlers
      if (
        this._eventHandlers === undefined ||
        this._eventHandlers[eventName] === undefined
      ) {
        return this;
      }

      // calling the handlers
      this._eventHandlers[eventName].forEach((eventHandler) => {
        if (typeof eventHandler === 'function') {
          eventHandler.apply(this, [details]);
        } else {
          eventHandler.handleEvent(details);
        }
      });
    }

    return this;
  }

  handleEvent<TThis extends Record<string, (event: Event) => unknown>>(
    this: TThis,
    event: Event
  ) {
    const [theFirstLetterOfEventType] = event.type;
    const theRestLettersOfEventType = event.type.slice(1);

    // mousedown -> onMousedown
    const methodName = `on${theFirstLetterOfEventType.toUpperCase()}${theRestLettersOfEventType}`;

    if (this[methodName] !== undefined) {
      this[methodName](event);
    }

    return this;
  }
}

export {
  EventManagerMixin as default,
  IsolatedEventName,
  DetailsOfIsolatedEvent,
  IsolatedEvents,
  ListenerOfIsolatedEventOrListenerObjectOfIsolatedEvent,
};
