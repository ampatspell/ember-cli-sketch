import EmberObject from '@ember/object';

export default EmberObject.extend({

  prepare(props) {
    this.setProperties(props);
  }

});
