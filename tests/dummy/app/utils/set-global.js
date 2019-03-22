export default hash => {
  for(let key in hash) {
    let value = hash[key];
    window[key] = value;
    console.log(`${key} = ${value}`);
  }
}
