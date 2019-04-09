import create, { frame } from './-base';
// import { readOnly } from '@ember/object/computed';
// import { assign } from '@ember/polyfills';

// const value = key => readOnly(`model.${key}`);

export default opts => create(opts).extend({

  frame: frame('sized'),
  // aspect: value('aspect'),

  // willUpdate(props, changes) {
  //   let frame = assign({}, this.frame.properties, props);

  //   let aspect = this.aspect;
  //   if(changes.includes('aspect')) {
  //     aspect = frame.aspect;
  //   }

  //   if(changes.includes('width')) {
  //     props.height = frame.width * aspect;
  //   } else if(changes.includes('height')) {
  //     props.width = frame.height / aspect;
  //   }

  //   return props;
  // }

});
