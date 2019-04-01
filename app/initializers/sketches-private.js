import Sketches from 'ember-cli-sketch/-private/sketches';
import Factory from 'ember-cli-sketch/-private/factory';

import NodeStage from 'ember-cli-sketch/-private/node/stage';
import NodeSized from 'ember-cli-sketch/-private/node/sized';

import FrameStage from 'ember-cli-sketch/-private/node/frame/stage';
import FrameSized from 'ember-cli-sketch/-private/node/frame/sized';

import Renderer from 'ember-cli-sketch/-private/stage/renderer';
import Hover from 'ember-cli-sketch/-private/stage/hover';
import Dragging from 'ember-cli-sketch/-private/stage/dragging';
import Resizing from 'ember-cli-sketch/-private/stage/resizing';
import Selection from 'ember-cli-sketch/-private/stage/selection';

import Interactions from 'ember-cli-sketch/-private/stage/interactions';
import Mouse from 'ember-cli-sketch/-private/stage/interactions/mediums/mouse';
import Keyboard from 'ember-cli-sketch/-private/stage/interactions/mediums/keyboard';
import Key from 'ember-cli-sketch/-private/stage/interactions/mediums/keyboard/key';
import Handlers from 'ember-cli-sketch/-private/stage/interactions/handlers';

import HandlerStagePosition from 'ember-cli-sketch/-private/stage/interactions/handlers/stage/position';
import HandlerStageZoom from 'ember-cli-sketch/-private/stage/interactions/handlers/stage/zoom';
import HandlerNodeDrag from 'ember-cli-sketch/-private/stage/interactions/handlers/node/drag';
import HandlerNodeHover from 'ember-cli-sketch/-private/stage/interactions/handlers/node/hover';
import HandlerNodeMove from 'ember-cli-sketch/-private/stage/interactions/handlers/node/move';
import HandlerNodeRemove from 'ember-cli-sketch/-private/stage/interactions/handlers/node/remove';
import HandlerNodeResize from 'ember-cli-sketch/-private/stage/interactions/handlers/node/resize';
import HandlerNodeSelect from 'ember-cli-sketch/-private/stage/interactions/handlers/node/select';

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
    container.register('sketch:stage/hover', Hover);
    container.register('sketch:stage/dragging', Dragging);
    container.register('sketch:stage/resizing', Resizing);
    container.register('sketch:stage/selection', Selection);
    container.register('sketch:stage/interactions', Interactions);
    container.register('sketch:stage/interactions/mediums/mouse', Mouse);
    container.register('sketch:stage/interactions/mediums/keyboard', Keyboard);
    container.register('sketch:stage/interactions/mediums/keyboard/key', Key);
    container.register('sketch:stage/interactions/handlers', Handlers);
    container.register('sketch:stage/interactions/handlers/stage/position', HandlerStagePosition);
    container.register('sketch:stage/interactions/handlers/stage/zoom', HandlerStageZoom);
    container.register('sketch:stage/interactions/handlers/node/drag', HandlerNodeDrag);
    container.register('sketch:stage/interactions/handlers/node/hover', HandlerNodeHover);
    container.register('sketch:stage/interactions/handlers/node/move', HandlerNodeMove);
    container.register('sketch:stage/interactions/handlers/node/remove', HandlerNodeRemove);
    container.register('sketch:stage/interactions/handlers/node/resize', HandlerNodeResize);
    container.register('sketch:stage/interactions/handlers/node/select', HandlerNodeSelect);
  }
}
