import Base from './-base';
import { computed } from '@ember/object';
import { readOnly, gt } from '@ember/object/computed';
import { array } from '../../util/computed';
import { sketches } from '../../services/sketches';
import { frame } from './frame/-base';

export const nodes = () => computed(function() {
  return sketches(this).factory.stage.nodes(this);
}).readOnly();

const typed = type => computed(function() {
  return sketches(this).factory.stage.typed(type, this);
}).readOnly();

export default Base.extend({

  stage: readOnly('owner.stage'),
  parent: readOnly('owner.parent'),
  frame: frame('nodes'),

  all: array(),
  any: gt('all.length', 0),

  areas: typed('areas'),
  containers: typed('containers'),

  _moveToBottom(node) {
    let { all } = this;
    if(all.lastObject === node) {
      return;
    }
    all.removeObject(node);
    all.pushObject(node);
    return true;
  },

  _removeNode(node) {
    let { all } = this;
    if(!all.includes(node)) {
      return;
    }
    node.willRemove();
    all.removeObject(node);
    node.didRemove();
  },

  addNode(node) {
    let { all, owner } = this;
    if(all.includes(node)) {
      return;
    }
    node.willAddToParent(owner);
    all.pushObject(node);
    node.didAddToParent(owner);
    return node;
  },

  nodesForPosition(position, type) {
    return this.all.reduce((nodes, node) => {
      if(node.frame.includesPosition(position, type)) {
        nodes.push(node);
      }
      if(node.nodes) {
        nodes.push(...node.nodes.nodesForPosition(position, type));
      }
      return nodes;
    }, []);
  },

  containsNode(node) {
    return this.all.find(child => child === node || child.containsNode(node));
  }

});
