import setGlobal from '../utils/set-global';

export default {
  name: 'dummy-dev',
  initialize() {
    window.setGlobal = setGlobal;
  }
}
