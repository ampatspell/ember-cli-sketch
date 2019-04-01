import EmberObject from '@ember/object';

export default EmberObject.extend({

  id: null,

  toStringExtension() {
    let { id, type } = this;
    return `${id}:${type}`;
  }

});
