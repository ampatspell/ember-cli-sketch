import Actions from '../-actions';
import { readOnly } from '@ember/object/computed';

export default Actions.extend({

  hover: readOnly('stage.hover'),
  selection: readOnly('stage.selection'),

  perform({ toggle }) {
    let { hover, selection } = this;

    let node = hover.last;

    if(!node) {
      selection.clear();
      return;
    }

    let includes = selection.includes(node);

    if(toggle) {
      if(includes) {
        selection.removeNode(node);
      } else {
        let remove = [
          ...selection.filter(sel => node.containsNode(sel)),
          ...selection.filter(sel => sel.containsNode(node)),
        ];
        selection.removeNodes(remove);
        selection.addNode(node);
      }
    } else {
      if(!includes) {
        selection.replace([ node ]);
      }
    }
  }

});
