import Base from '../../../../-base';
import { equal, or } from '@ember/object/computed';
import { serialized } from '../../../../../../util/computed';
import { assign } from '@ember/polyfills';

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

export default Base.extend(assign({

  key: null,
  keyCode: null,

  isBackspaceOrDelete: or('isBackspace', 'isDelete'),

  serialized: serialized([ 'key', 'keyCode', ...Object.keys(keys) ])

}, properties));
