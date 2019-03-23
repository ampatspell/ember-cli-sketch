import Selectable from './-selectable';

export default Selectable.extend({

  isArea: true,

  stage: null,
  group: null,

  setGroup(group) {
    this.setProperties({ group });
    group.didAddToArea(this);
  },

  didAddToStage(stage) {
    this.setProperties({ stage });
  },

  nodesForStagePosition(position) {
    let { frame } = this;
    let nodes = [];
    if(frame.includesPosition(position)) {
      nodes.push(this);
    }
    let area = frame.convertPointFromStage(position);
    let group = this.group.nodesForPosition(area);
    nodes.push(...group);
    return nodes;
  },

  //

  remove() {
    let { stage } = this;
    if(!stage) {
      return;
    }
    stage._removeArea(this);
  },

  willRemove() {
    this.stage.willRemoveArea(this);
  },

  didRemove() {
    this.stage.didRemoveArea(this);
    this.setProperties({ stage: null });
  },

  //

  allNodes() {
    return [ this, ...this.group.allNodes() ];
  },

  containsNode(node) {
    let { group } = this;
    return group === node || group.containsNode(node);
  }

});
