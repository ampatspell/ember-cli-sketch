import { Promise } from 'rsvp';
import { run } from '@ember/runloop';

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
