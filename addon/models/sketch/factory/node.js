import Base from './-base';
import { assign } from '@ember/polyfills';

const node = type => function(props) {
  return this.create(type, props);
}

export default Base.extend({

  create(type, props) {
    return this.model(`node/${type}`, assign({ type }, props));
  },

  group: node('group'),
  area: node('area')

});
