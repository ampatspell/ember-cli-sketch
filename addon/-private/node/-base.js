import EmberObject, { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export const frame = type => computed(function() {
  return this.sketches.factory.frame(type, this);
}).readOnly();

export default opts => {

  const prop = key => readOnly(`model.${opts.properties[key]}`);

  return EmberObject.extend({

    model: null,

    type:   prop('type'),
    stage:  prop('stage'),
    parent: prop('parent'),
    nodes:  prop('nodes'),

    update(props) {
      return this.model.update(props);
    },

    //

    // _childNodesForPosition(position, type) {
    //   return this.nodes.reduce((nodes, { node }) => {
    //     if(node.frame.includesPosition(position, type)) {
    //       nodes.push(node);
    //     }
    //     nodes.push(...node.nodes.nodesForPosition(position, type));
    //     return nodes;
    //   }, []);
    // },

    nodesForPosition(position, type) {
      return [];
      // let nodes = this.nodes.nodesForPosition(this.frame.convertPointFromParent(position), type);
      // if(nodes.length || this.frame.includesPosition(position, type)) {
      //   return [ this, ...nodes ];
      // }
      // return nodes;
    },

  });
};
