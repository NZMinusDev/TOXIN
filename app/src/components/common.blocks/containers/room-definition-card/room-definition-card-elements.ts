type RoomDefinitionCardElement = HTMLFormElement;

const roomDefinitionCardElements = document.querySelectorAll(
  '.js-room-definition-card'
) as NodeListOf<RoomDefinitionCardElement>;

export { roomDefinitionCardElements as default, RoomDefinitionCardElement };
