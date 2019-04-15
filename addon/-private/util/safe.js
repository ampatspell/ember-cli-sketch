export default fn => function(...args) {
  if(this.isDestroying) {
    return;
  }
  return fn.call(this, ...args);
}
