module.exports = admin => {

  const key = 'firebaseStorageDownloadTokens';
  const bucket = admin.storage().bucket();

  const makeToken = () => {
    const uuid = require('uuid/v4');
    return uuid();
  };

  const urlFor = (name, token) => {
    let encodedName = encodeURIComponent(name);
    return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedName}?alt=media&token=${token}`;
  };

  const save = async (buffer, path, opts) => {
    let token = makeToken();

    await bucket.file(path).save(buffer, Object.assign({
      resumable: false,
      metadata: {
        metadata: {
          [key]: token
        }
      }
    }, opts));

    return {
      url: urlFor(path, token),
      token
    };
  };

  return {
    save
  };
}
