import Sketches from 'ember-cli-sketch/-private/sketches';
import Factory from 'ember-cli-sketch/-private/factory';

import Attributes from 'ember-cli-sketch/-private/node/attributes';
import AttributeNoop from 'ember-cli-sketch/-private/node/attributes/attribute/noop';
import AttributeNumber from 'ember-cli-sketch/-private/node/attributes/attribute/number';
import AttributeString from 'ember-cli-sketch/-private/node/attributes/attribute/string';

import Nodes from 'ember-cli-sketch/-private/node/nodes';
import NodesContainers from 'ember-cli-sketch/-private/node/nodes/containers';

import NodeStage from 'ember-cli-sketch/-private/node/stage';
import NodeSized from 'ember-cli-sketch/-private/node/sized';

import Edge from 'ember-cli-sketch/-private/node/edge';

import FrameStage from 'ember-cli-sketch/-private/node/frame/stage';
import FrameNodes from 'ember-cli-sketch/-private/node/frame/nodes';
import FrameSized from 'ember-cli-sketch/-private/node/frame/sized';

import Renderer from 'ember-cli-sketch/-private/stage/renderer';
import Hover from 'ember-cli-sketch/-private/stage/hover';
import Selection from 'ember-cli-sketch/-private/stage/selection';

import Tools from 'ember-cli-sketch/-private/stage/tools';
import ToolSelection from 'ember-cli-sketch/-private/stage/tools/selection';
import ToolStageDrag from 'ember-cli-sketch/-private/stage/tools/stage/drag';
import ToolStageZoom from 'ember-cli-sketch/-private/stage/tools/stage/zoom';
import ToolNodeAdd from 'ember-cli-sketch/-private/stage/tools/node/add';
import ToolNodeResize from 'ember-cli-sketch/-private/stage/tools/node/resize';
import ToolNodeDrag from 'ember-cli-sketch/-private/stage/tools/node/drag';
import ToolNodeRemove from 'ember-cli-sketch/-private/stage/tools/node/remove';
import ToolNodeMove from 'ember-cli-sketch/-private/stage/tools/node/move';

import Interactions from 'ember-cli-sketch/-private/stage/interactions';
import Mouse from 'ember-cli-sketch/-private/stage/interactions/mediums/mouse';
import Keyboard from 'ember-cli-sketch/-private/stage/interactions/mediums/keyboard';
import Key from 'ember-cli-sketch/-private/stage/interactions/mediums/keyboard/key';
import Handlers from 'ember-cli-sketch/-private/stage/interactions/handlers';

import HandlerTools from 'ember-cli-sketch/-private/stage/interactions/handlers/tools';

export default {
  name: 'sketch:internal',
  initialize(container) {
    container.register('sketch:sketches', Sketches);
    container.register('sketch:factory', Factory);
    container.register('sketch:node/attributes', Attributes);
    container.register('sketch:node/attribute/noop', AttributeNoop);
    container.register('sketch:node/attribute/number', AttributeNumber);
    container.register('sketch:node/attribute/string', AttributeString);
    container.register('sketch:node/edge', Edge);
    container.register('sketch:node/nodes', Nodes);
    container.register('sketch:node/nodes/containers', NodesContainers);
    container.register('sketch:factory/node/stage', NodeStage);
    container.register('sketch:factory/node/sized', NodeSized);
    container.register('sketch:frame/stage', FrameStage);
    container.register('sketch:frame/nodes', FrameNodes);
    container.register('sketch:frame/sized', FrameSized);
    container.register('sketch:stage/renderer', Renderer);
    container.register('sketch:stage/hover', Hover);
    container.register('sketch:stage/selection', Selection);
    container.register('sketch:stage/tools', Tools);
    container.register('sketch:stage/tools/selection', ToolSelection);
    container.register('sketch:stage/tools/stage/drag', ToolStageDrag);
    container.register('sketch:stage/tools/stage/zoom', ToolStageZoom);
    container.register('sketch:stage/tools/node/add', ToolNodeAdd);
    container.register('sketch:stage/tools/node/resize', ToolNodeResize);
    container.register('sketch:stage/tools/node/drag', ToolNodeDrag);
    container.register('sketch:stage/tools/node/move', ToolNodeMove);
    container.register('sketch:stage/tools/node/remove', ToolNodeRemove);
    container.register('sketch:stage/interactions', Interactions);
    container.register('sketch:stage/interactions/mediums/mouse', Mouse);
    container.register('sketch:stage/interactions/mediums/keyboard', Keyboard);
    container.register('sketch:stage/interactions/mediums/keyboard/key', Key);
    container.register('sketch:stage/interactions/handlers', Handlers);
    container.register('sketch:stage/interactions/handlers/tools', HandlerTools);
  }
}
