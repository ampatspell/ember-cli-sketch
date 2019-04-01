import EmberObject from '@ember/object';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

export default EmberObject.extend({

  node(model, opts) {
    assert(`model is required`, !!model);
    assert(`opts are required`, !!opts);

    let { identifier, type } = opts;
    assert(`identifier is required`, !!identifier);
    assert(`type is required`, !!type);

    let owner = getOwner(this);
    let fullName = `sketch:node/${identifier}/${type}`;
    let factory = owner.factoryFor(fullName);
    if(!factory) {
      factory = owner.factoryFor(`sketch:factory/node/${type}`);
      assert(`node factory for type '${type}' is not registered`, !!factory);
      factory = factory.class;
      owner.register(fullName, factory(opts));
      factory = owner.factoryFor(fullName);
    }

    let { sketches } = this;
    return factory.create({ sketches, model, opts });
  },

  frame(type, node) {
    return getOwner(this).factoryFor(`sketch:frame/${type}`).create({ node });
  }

});
