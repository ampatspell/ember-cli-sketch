import Sketches from '../sketches';
import { initialize } from 'ember-cli-sketch/initialize';

export default {
  name: 'dummy:sketches',
  initialize: initialize({
    factory: Sketches,
    fonts: {
      google: {
        'Ubuntu Mono': '400,400i,700,700i',
        'Pacifico': true,
        'Montserrat': '100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i:latin,latin-ext',
        'Bitter': true,
        'Amatic SC': true,
        'Chewy': true,
        'Dokdo': true,
        'Fredoka One': true,
        'Raleway': '100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i:latin,latin-ext'
      }
    }
  })
};
