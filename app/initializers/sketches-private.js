import Sketches from 'ember-cli-sketch/-private/sketches';
import Factory from 'ember-cli-sketch/-private/factory';
import NodeStage from 'ember-cli-sketch/-private/node/stage';
import NodeSized from 'ember-cli-sketch/-private/node/sized';
import FrameStage from 'ember-cli-sketch/-private/node/frame/stage';
import FrameSized from 'ember-cli-sketch/-private/node/frame/sized';
import NodeStageRenderer from 'ember-cli-sketch/-private/node/stage/renderer';

export default {
  name: 'sketch:internal',
  initialize(container) {
    container.register('sketch:sketches', Sketches);
    container.register('sketch:factory', Factory);
    container.register('sketch:factory/node/stage', NodeStage);
    container.register('sketch:factory/node/sized', NodeSized);
    container.register('sketch:frame/stage', FrameStage);
    container.register('sketch:frame/sized', FrameSized);
    container.register('sketch:stage/renderer', NodeStageRenderer);
  }
}
