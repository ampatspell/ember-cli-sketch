import Actions, { model } from './-actions';

const node = type => model(`node/${type}`);

export default Actions.extend({

  hover:  node('hover'),
  select: node('select'),
  drag:   node('drag'),
  resize: node('resize'),
  remove: node('remove'),

});
