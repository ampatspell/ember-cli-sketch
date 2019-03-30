import EmberObject from '@ember/object';

export default EmberObject.extend({

  parentId: null,
  id: null,
  type: null,

  toStringExtension() {
    let { parentId, id, type } = this;
    return `${parentId}:${id}:${type}`;
  }

});
