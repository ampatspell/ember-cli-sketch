import setGlobal from '../utils/set-global';

export default {
  name: 'dummy-dev',
  initialize(app) {
    window.setGlobal = setGlobal;
    window.firestore = app.lookup('service:firestore');
  }
}
