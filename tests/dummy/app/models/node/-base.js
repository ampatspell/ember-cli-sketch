import EmberObject from '@ember/object';

export default EmberObject.extend({

  doc: null,
  type: null,

  toStringExtension() {
    let { doc: { id }, type } = this;
    return `${id}:${type}`;
  }

});
