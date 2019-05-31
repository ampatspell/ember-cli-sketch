import Factory from 'ember-cli-sketch/-private/sketches/factory';
import Fonts from 'ember-cli-sketch/-private/sketches/fonts';
import FontsLoader from 'ember-cli-sketch/-private/sketches/fonts/loader';
import FontsLoaderCompound from 'ember-cli-sketch/-private/sketches/fonts/loader/compound';

import Actions from 'ember-cli-sketch/-private/sketches/actions';
import ActionStageZoom from 'ember-cli-sketch/-private/actions/stage/zoom';
import ActionStageReset from 'ember-cli-sketch/-private/actions/stage/reset';
import ActionStageCenter from 'ember-cli-sketch/-private/actions/stage/center';
import ActionStageFit from 'ember-cli-sketch/-private/actions/stage/fit';
import ActionStageSelectable from 'ember-cli-sketch/-private/actions/stage/selectable';
import ActionNodeAspectFit from 'ember-cli-sketch/-private/actions/node/aspect-fit';
import ActionNodeAspectUpdate from 'ember-cli-sketch/-private/actions/node/aspect-update';
import ActionNodeMoveToContainer from 'ember-cli-sketch/-private/actions/node/move-to-container';

import Attributes from 'ember-cli-sketch/-private/node/attributes';
import AttributeNoop from 'ember-cli-sketch/-private/node/attributes/attribute/noop';
import AttributeNumber from 'ember-cli-sketch/-private/node/attributes/attribute/number';
import AttributeString from 'ember-cli-sketch/-private/node/attributes/attribute/string';
import AttributeBoolean from 'ember-cli-sketch/-private/node/attributes/attribute/boolean';

import Nodes from 'ember-cli-sketch/-private/node/nodes';
import NodesContainers from 'ember-cli-sketch/-private/node/nodes/containers';

import NodeStage from 'ember-cli-sketch/-private/node/stage';
import NodeSized from 'ember-cli-sketch/-private/node/sized';

import Edge from 'ember-cli-sketch/-private/node/edge';
import GuidelinesEdges from 'ember-cli-sketch/-private/node/guidelines/edges';
import GuidelinesEdge from 'ember-cli-sketch/-private/node/guidelines/edge';
import NodeGuidelines from 'ember-cli-sketch/-private/node/guidelines';

import FrameStage from 'ember-cli-sketch/-private/node/frame/stage';
import FrameNodes from 'ember-cli-sketch/-private/node/frame/nodes';
import FrameSized from 'ember-cli-sketch/-private/node/frame/sized';

import Renderer from 'ember-cli-sketch/-private/stage/renderer';
import Hover from 'ember-cli-sketch/-private/stage/hover';
import Selection from 'ember-cli-sketch/-private/stage/selection';
import Cursor from 'ember-cli-sketch/-private/stage/cursor';
import StageGuidelines from 'ember-cli-sketch/-private/stage/guidelines';

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

import Task from 'ember-cli-sketch/-private/task/task';

export default {
  name: 'sketch:internal',
  initialize(container) {
    container.register('sketch:sketches/factory', Factory);
    container.register('sketch:sketches/fonts', Fonts);
    container.register('sketch:sketches/fonts/loader', FontsLoader);
    container.register('sketch:sketches/fonts/loader/compound', FontsLoaderCompound);
    container.register('sketch:sketches/actions', Actions);
    container.register('sketch:actions/stage/zoom', ActionStageZoom);
    container.register('sketch:actions/stage/reset', ActionStageReset);
    container.register('sketch:actions/stage/center', ActionStageCenter);
    container.register('sketch:actions/stage/selectable', ActionStageSelectable);
    container.register('sketch:actions/stage/fit', ActionStageFit);
    container.register('sketch:actions/node/aspect-fit', ActionNodeAspectFit);
    container.register('sketch:actions/node/aspect-update', ActionNodeAspectUpdate);
    container.register('sketch:actions/node/move-to-container', ActionNodeMoveToContainer);
    container.register('sketch:factory/attributes', Attributes);
    container.register('sketch:node/attribute/noop', AttributeNoop);
    container.register('sketch:node/attribute/number', AttributeNumber);
    container.register('sketch:node/attribute/string', AttributeString);
    container.register('sketch:node/attribute/boolean', AttributeBoolean);
    container.register('sketch:node/edge', Edge);
    container.register('sketch:node/nodes', Nodes);
    container.register('sketch:node/guidelines', NodeGuidelines);
    container.register('sketch:node/guidelines/edges', GuidelinesEdges);
    container.register('sketch:node/guidelines/edge', GuidelinesEdge);
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
    container.register('sketch:stage/cursor', Cursor);
    container.register('sketch:stage/guidelines', StageGuidelines);
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
    container.register('sketch:task', Task);
  }
}
