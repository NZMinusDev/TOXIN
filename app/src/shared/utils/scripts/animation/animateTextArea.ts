import animate from './animate';
import bounce from './bounce';

/**
 * Jumping animation of typing text
 */
const animateTextArea = (textArea: HTMLTextAreaElement) => {
  const textAreaRef = textArea;
  const text = textAreaRef.value;
  const to = text.length;
  const from = 0;

  animate(
    (progress) => {
      const result = (to - from) * progress + from;
      textAreaRef.value = text.substr(0, Math.ceil(result));
    },
    5000,
    { timing: bounce }
  );
};

export { animateTextArea as default };
