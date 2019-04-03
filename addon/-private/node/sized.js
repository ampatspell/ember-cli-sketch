import create, { frame } from './-base';

export default opts => create(opts).extend({

  frame: frame('sized')

});
