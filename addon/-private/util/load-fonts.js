import WebFont from 'webfontloader';
import { Promise } from 'rsvp';
import { assign } from '@ember/polyfills';

const err = () => {
  let error = new Error('Fonts failed to load');
  error.code = 'webfont/load';
  return error;
}

export default spec => new Promise((resolve, reject) => {
  spec = assign({}, spec);
  spec.active = () => resolve();
  spec.inactive = () => reject(err());
  WebFont.load(spec);
});

/*

// https://github.com/typekit/webfontloader

await loadFonts({
  google: {
    families: ['Droid Sans', 'Droid Serif']
  }
});

*/
