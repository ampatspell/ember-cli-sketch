import { getOwner } from '@ember/application';
import { assert } from '@ember/debug';

export const create = (owner, name, props) => {
  let factory = getOwner(owner).factoryFor(`model:${name}`);
  assert(`Model '${name}' not registered`, !!factory);
  return factory.create(props);
}
