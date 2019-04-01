import Sketches from 'ember-cli-sketch/-private/sketches';
import Factory from 'ember-cli-sketch/-private/factory';

import NodeStage from 'ember-cli-sketch/-private/node/stage';
import NodeSized from 'ember-cli-sketch/-private/node/sized';

import FrameStage from 'ember-cli-sketch/-private/node/frame/stage';
import FrameSized from 'ember-cli-sketch/-private/node/frame/sized';

import Renderer from 'ember-cli-sketch/-private/stage/renderer';

import Interactions from 'ember-cli-sketch/-private/stage/interactions';
import Mouse from 'ember-cli-sketch/-private/stage/interactions/mediums/mouse';
import Keyboard from 'ember-cli-sketch/-private/stage/interactions/mediums/keyboard';
import Key from 'ember-cli-sketch/-private/stage/interactions/mediums/keyboard/key';
import Handlers from 'ember-cli-sketch/-private/stage/interactions/handlers';

import HandlerStagePosition from 'ember-cli-sketch/-private/stage/interactions/handlers/stage/position';
import HandlerStageZoom from 'ember-cli-sketch/-private/stage/interactions/handlers/stage/zoom';

export default {
  name: 'sketch:internal',
  initialize(container) {
    container.register('sketch:sketches', Sketches);
    container.register('sketch:factory', Factory);
    container.register('sketch:factory/node/stage', NodeStage);
    container.register('sketch:factory/node/sized', NodeSized);
    container.register('sketch:frame/stage', FrameStage);
    container.register('sketch:frame/sized', FrameSized);
    container.register('sketch:stage/renderer', Renderer);

    container.register('sketch:stage/interactions', Interactions);
    container.register('sketch:stage/interactions/mediums/mouse', Mouse);
    container.register('sketch:stage/interactions/mediums/keyboard', Keyboard);
    container.register('sketch:stage/interactions/mediums/keyboard/key', Key);
    container.register('sketch:stage/interactions/handlers', Handlers);
    container.register('sketch:stage/interactions/handlers/stage/position', HandlerStagePosition);
    container.register('sketch:stage/interactions/handlers/stage/zoom', HandlerStageZoom);
  }
}
