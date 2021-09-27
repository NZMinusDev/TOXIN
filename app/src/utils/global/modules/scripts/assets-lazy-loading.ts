const images = document.getElementsByTagName('img');
const sources = document.getElementsByTagName('source');

const isVisible = (elem: HTMLElement) => {
  const coords = elem.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;

  const topVisible = coords.top > 0 && coords.top < windowHeight;
  const bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
};

const showVisible = () => {
  [...images].forEach((img) => {
    const imgRef = img;

    const realSrc = imgRef.dataset.src;

    if (realSrc === undefined || realSrc === '') {
      return;
    }

    if (isVisible(imgRef)) {
      imgRef.src = realSrc;
      imgRef.dataset.src = '';
    }
  });

  [...sources].forEach((source) => {
    const sourceRef = source;

    const realSrcset = sourceRef.dataset.srcset;

    if (realSrcset === undefined || realSrcset === '') {
      return;
    }

    if (isVisible(sourceRef)) {
      sourceRef.srcset = realSrcset;
      sourceRef.dataset.srcset = '';
    }
  });
};

window.addEventListener('scroll', showVisible);
showVisible();
