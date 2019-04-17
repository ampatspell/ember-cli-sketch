import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

export default EmberObject.extend({

  node(model, opts) {
    assert(`model is required`, !!model);
    assert(`opts are required`, !!opts);

    let { identifier, type, properties } = opts;
    assert(`identifier is required`, !!identifier);
    assert(`type is required`, !!type);

    let owner = getOwner(this);
    let fullName = `sketch:node/${identifier}/${type}`;
    let factory = owner.factoryFor(fullName);
    if(!factory) {
      factory = owner.factoryFor(`sketch:factory/node/${type}`);
      assert(`node factory for type '${type}' is not registered`, !!factory);
      factory = factory.class;
      owner.register(fullName, factory({ identifier, type, properties }));
      factory = owner.factoryFor(fullName);
    }

    let { sketches } = this;
    return factory.create({ sketches, model, opts });
  },

  _create(name, props) {
    let fullName = `sketch:${name}`;
    let factory = getOwner(this).factoryFor(fullName);
    assert(`${fullName} is not registered`, !!factory);
    return factory.create(props);
  },

  edge(node) {
    return this._create(`node/edge`, { node });
  },

  attributes(node, opts) {
    assert(`node is required`, !!node);
    assert(`opts are required`, !!opts);

    let { identifier, type } = opts;
    assert(`identifier is required`, !!identifier);
    assert(`type is required`, !!type);

    let owner = getOwner(this);
    let fullName = `sketch:node/${identifier}/${type}/attributes`;
    let factory = owner.factoryFor(fullName);
    if(!factory) {
      factory = owner.factoryFor(`sketch:factory/attributes`);
      factory = factory.class;
      owner.register(fullName, factory({ modelClass: node.model.constructor }));
      factory = owner.factoryFor(fullName);
    }

    return factory.create({ node });
  },

  attribute(attributes, type, opts) {
    return this._create(`node/attribute/${type}`, { attributes, opts });
  },

  frame(type, parent) {
    return this._create(`frame/${type}`, { parent });
  },

  nodes(parent) {
    return this._create('node/nodes', { parent });
  },

  typedNodes(type, nodes) {
    return this._create(`node/nodes/${type}`, { nodes });
  },

  renderer(stage) {
    return this._create('stage/renderer', { stage });
  },

  cursor(stage) {
    return this._create('stage/cursor', { stage });
  },

  hover(stage) {
    return this._create('stage/hover', { stage });
  },

  dragging(stage) {
    return this._create('stage/dragging', { stage });
  },

  selection(stage) {
    return this._create('stage/selection', { stage });
  },

  tools(stage) {
    return this._create('stage/tools', {
      stage,
      types: [
        'selection',
        'stage/drag',
        'stage/zoom',
        'node/add',
        'node/resize',
        'node/move',
        'node/drag',
        'node/remove'
      ]
    });
  },

  tool(type, tools) {
    return this._create(`stage/tools/${type}`, { type, tools });
  },

  interactions(stage) {
    return this._create('stage/interactions', { stage });
  },

  interactionMedium(type, interactions) {
    return this._create(`stage/interactions/mediums/${type}`, { interactions });
  },

  interationsKeyboardKey(opts) {
    return this._create('stage/interactions/mediums/keyboard/key', opts);
  },

  interactionHandlers(interactions) {
    return this._create('stage/interactions/handlers', {
      interactions,
      types: [ 'tools' ]
    });
  },

  interactionHandler(type, handlers) {
    return this._create(`stage/interactions/handlers/${type}`, { handlers });
  },

  fonts(sketches) {
    return this._create('sketches/fonts', {
      sketches,
      types: {
        google: {
          'Ubuntu Mono': '400,400i,700,700i',
          'Pacifico': true,
          'Montserrat': '100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i:latin,latin-ext',
          'Bitter': true,
          'Amatic SC': true,
          'Chewy': true,
          'Dokdo': true,
          'Fredoka One': true,
          'Raleway': '100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i:latin,latin-ext'
        }
      }
    });
  },

  fontsLoader(fonts, opts) {
    return this._create('sketches/fonts/loader', { fonts, opts });
  },

  fontLoaderCompound(fonts, loaders) {
    return this._create('sketches/fonts/loader/compound', { fonts, loaders });
  },

  actions(sketches) {
    return this._create('sketches/actions', {
      sketches,
      types: [
        'stage/zoom',
        'stage/reset',
        'stage/center',
        'stage/fit'
      ]
    });
  },

  action(type, actions) {
    return this._create(`actions/${type}`, { type, actions });
  }

});
