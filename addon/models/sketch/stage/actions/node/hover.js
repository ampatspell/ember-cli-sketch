import Action from '../-action';
import { readOnly } from '@ember/object/computed';

export default Action.extend({

  hover: readOnly('stage.hover'),

  perform(point) {
    let { stage, hover } = this;
    let nodes = stage.areas.nodesForPosition(point);
    hover.replace(nodes);
  }

});
