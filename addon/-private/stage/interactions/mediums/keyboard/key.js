import EmberObject from '@ember/object';
import { equal, or } from '@ember/object/computed';
import { assign } from '@ember/polyfills';
import { serialized } from '../../../../util/computed';

const keys = {
  isShift:      'Shift',
  isMeta:       'Meta',
  isSpace:      ' ',
  isBackspace:  'Backspace',
  isDelete:     'Delete',
  isArrowUp:    'ArrowUp',
  isArrowDown:  'ArrowDown',
  isArrowLeft:  'ArrowLeft',
  isArrowRight: 'ArrowRight'
}

const properties = Object.keys(keys).reduce((hash, key) => {
  hash[key] = equal('key', keys[key]).readOnly();
  return hash;
}, {});

export default EmberObject.extend(assign({

  key: null,
  keyCode: null,

  isBackspaceOrDelete: or('isBackspace', 'isDelete'),

  serialized: serialized([ 'key', 'keyCode', ...Object.keys(keys) ])

}, properties));
