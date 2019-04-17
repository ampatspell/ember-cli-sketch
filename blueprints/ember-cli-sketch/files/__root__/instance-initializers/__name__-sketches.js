import { initialize } from 'ember-cli-sketch/initialize';
import Sketches from '../sketches';

export default {
  name: '<%= dasherizedPackageName %>:sketches',
  initialize: initialize({
    factory: Sketches,
    fonts: {
      google: {
        'Ubuntu Mono': '400,400i,700,700i'
      }
    }
  })
};
