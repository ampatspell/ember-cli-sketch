import EmberObject from '@ember/object';

export default EmberObject.extend({

  parentId: null,
  id: null,
  type: null,

  toStringExtension() {
    let { id, type } = this;
    return `${id}:${type}`;
  }

});
