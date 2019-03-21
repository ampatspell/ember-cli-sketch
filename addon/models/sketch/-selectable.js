import Base from './-with-frame';
import { computed } from '@ember/object';
import { not } from '@ember/object/computed';

const find = key => computed(`stage.${key}.nodes.[]`, function() {
  return !!this.stage[key].find(node => node === this);
}).readOnly();

export default Base.extend({

  isSelected: find('selection'),
  notSelected: not('isSelected'),

  isHovered: find('hover'),
  notHovered: not('isHovered'),

  hasParentNode() {
    return false;
  }

});
