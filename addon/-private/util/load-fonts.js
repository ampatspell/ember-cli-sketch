import WebFont from 'webfontloader';
import { Promise } from 'rsvp';
import { assign } from '@ember/polyfills';

export const err = errors => {
  let error = new Error('Fonts failed to load');
  error.code = 'webfont/load';
  if(errors) {
    error.errors = errors;
  }
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
