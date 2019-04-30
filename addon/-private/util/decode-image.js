import { resolve } from 'rsvp';

export default url => resolve(url).then(url => {
  if(!url) {
    return null;
  }
  let image = new Image();
  image.src = url;
  return resolve(image.decode()).then(() => image, () => null);
});
