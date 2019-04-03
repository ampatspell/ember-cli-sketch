import { node, attr } from 'ember-cli-sketch/computed';

export default node({
  identifier: 'dummy',
  properties: {
    stage: 'stage',
    parent: 'parent',
    nodes: 'nodes',
    type: 'type'
  }
});

export {
  attr
}
