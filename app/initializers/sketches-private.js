import Sketches from 'ember-cli-sketch/-private/sketches';
import Factory from 'ember-cli-sketch/-private/factory';
import NodeStage from 'ember-cli-sketch/-private/node/stage';
import NodeSized from 'ember-cli-sketch/-private/node/sized';

export default {
  name: 'sketch:internal',
  initialize(container) {
    container.register('sketch:sketches', Sketches);
    container.register('sketch:factory', Factory);
    container.register('sketch:factory/node/stage', NodeStage);
    container.register('sketch:factory/node/sized', NodeSized);
  }
}
