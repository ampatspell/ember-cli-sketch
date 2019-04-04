import Attribute from './-base';

export default Attribute.extend({

  transformValue(value) {
    if(value && typeof value !== 'string') {
      value = String(value);
    }
    if(!value) {
      value = this.opts.initial;
    }
    return value;
  }

});
