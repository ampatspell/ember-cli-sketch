import { Promise } from 'rsvp';

const error = (url, original) => {
  let err = new Error('Image load failed');
  err.code = 'load-image';
  err.url = url;
  err.error = original;
  return err;
}

export default url => new Promise((resolve, reject) => {
  let image = new Image(); // eslint-disable-line no-undef
  image.crossOrigin = 'anonymous';
  image.addEventListener('load', () => resolve(image));
  image.addEventListener('error', err => reject(error(err)));
  image.src = url;
});
