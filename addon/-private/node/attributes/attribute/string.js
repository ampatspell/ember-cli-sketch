import Attribute from './-base';

export default Attribute.extend({

  transformValue(value) {
    if(typeof value !== 'string') {
      return String(value);
    }
    if(!value) {
      value = this.opts.initial;
    }
    return value;
  }

});
