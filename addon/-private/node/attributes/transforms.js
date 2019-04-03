import EmberObject, { computed } from '@ember/object';
import sketches from '../../util/sketches';
import { assert } from '@ember/debug';

export default EmberObject.extend({

  instances: computed(function() {
    let factory = sketches(this).factory;
    return this.types.reduce((hash, key) => {
      hash[key] = factory.transform(key);
      return hash;
    }, {});
  }).readOnly(),

  transform(type) {
    let instance = this.instances[type];
    assert(`transform '${type}' is not registered`, !!instance);
    return instance;
  }

});
