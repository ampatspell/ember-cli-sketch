import Attribute from './-base';

export default Attribute.extend({

  transformValue(value) {
    if(value === undefined) {
      value = this.opts.initial;
    }
    value = !!value;
    return value;
  }

});
