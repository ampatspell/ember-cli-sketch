import Transform from './-base';

export default Transform.extend({

  process(value) {
    if(typeof value !== 'string') {
      return String(value);
    }
    return value;
  }

});
