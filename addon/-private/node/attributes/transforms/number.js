import Transform from './-base';

export default Transform.extend({

  process(value) {
    if(typeof value !== 'number') {
      value = parseFloat(value);
    }
    if(isNaN(value)) {
      return;
    }
    return value;
  }

});
