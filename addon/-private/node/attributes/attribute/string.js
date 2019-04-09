import Attribute from './-base';

export default Attribute.extend({

  transformValue(value) {
    if(value === undefined) {
      value = this.opts.initial;
    }

    if(typeof value !== 'string') {
      value = String(value);
    }

    return value;
  }

});
