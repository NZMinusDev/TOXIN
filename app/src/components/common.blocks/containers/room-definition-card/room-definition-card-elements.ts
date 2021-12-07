type RoomDefinitionCardElement = HTMLFormElement;

const roomDefinitionCardElements =
  document.querySelectorAll<RoomDefinitionCardElement>(
    '.js-room-definition-card'
  );

export { roomDefinitionCardElements as default, RoomDefinitionCardElement };
