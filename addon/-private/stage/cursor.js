import EmberObject from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { array } from '../util/computed';

const mapping = {
  'drag': 'pointer'
};

export default EmberObject.extend({

  stage: null,
  cursors: array(),

  value: readOnly('cursors.lastObject.value'),

  push(type) {
    let value = mapping[type];
    let token = { value };
    this.cursors.pushObject(token);
    return {
      cancel: () => this.cursors.removeObject(token)
    };
  }

});
