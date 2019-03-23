import Base from './-with-frame';
import { computed } from '@ember/object';

const find = key => computed(`stage.${key}.all.[]`, function() {
  return !!this.stage[key].find(node => node === this);
}).readOnly();

export default Base.extend({

  isSelected: find('selection'),
  isHovered:  find('hover')

});
