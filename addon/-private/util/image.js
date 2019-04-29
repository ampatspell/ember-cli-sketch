import { Promise } from 'rsvp';
import { run } from '@ember/runloop';
import { resolve } from 'rsvp';

const error = (url, original) => {
  let err = new Error('Image load failed');
  err.code = 'load-image';
  err.url = url;
  err.error = original;
  return err;
}

export const loadImage = (url, crossOrigin) => new Promise((resolve, reject) => {
  if(!url) {
    return resolve();
  }
  let image = new Image(); // eslint-disable-line no-undef
  if(crossOrigin) {
    image.crossOrigin = crossOrigin; // 'anonymous'
  }
  image.addEventListener('load', () => run(() => resolve(image)));
  image.addEventListener('error', err => run(() => reject(error(url, err))));
  image.src = url;
});

export const decode = async url => {
  if(!url) {
    return null;
  }
  url = await url;
  let image = new Image();
  image.src = url;
  return resolve(image.decode()).then(() => image, () => null);
}

export const withImageData = async (url, cb) => {
  if(!url) {
    return;
  }

  let element = await loadImage(url, 'anonymous');
  let { width, height } = element;

  let canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  let context = canvas.getContext('2d');
  context.drawImage(element, 0, 0, width, height);

  let data = context.getImageData(0, 0, width, height);
  data = await cb(data, { width, height });
  context.putImageData(data, 0, 0);

  let toDataURL = (...args) => canvas.toDataURL(...args);
  let toBlob = (...args) => new Promise((resolve) => canvas.toBlob(resolve, ...args));

  return {
    toDataURL: toDataURL,
    toBlob:    toBlob
  };
}
