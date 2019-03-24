import Base from '../../../-base';

let mapping = {
  ' ':     'isSpace',
  'Shift': 'isShift',
  'Meta':  'isMeta'
};

export default Base.extend({

  owner: null,

  state: 'up',
  key: null,
  keyCode: null,

  isShift: false,
  isSpace: false,
  isMeta: false,

  _updateKeys({ key }, value) {
    let prop = mapping[key];
    if(!prop) {
      return;
    }
    this.set(prop, value);
  },

  onKeyDown(opts) {
    let { key, keyCode } = opts;
    this.setProperties({ state: 'down', key, keyCode });
    this._updateKeys(opts, true);
  },

  onKeyPress(/* { key, keyCode } */) {
  },

  onKeyUp(opts) {
    this.setProperties({ state: 'up', key: null, keyCode: null });
    this._updateKeys(opts, false);
  },

  reset() {
    this.setProperties({
      state: 'up',
      key: null,
      keyCode: null
    });
  }

});
