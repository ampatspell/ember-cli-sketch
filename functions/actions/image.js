module.exports = app => app.functions.runWith({ memory: '2GB', timeoutSeconds: 240 }).https.onCall(async req => {

  let { id, width, height } = req;
  let url = `https://quatsch-e12c5.firebaseapp.com/experiments/editors/${id}/image`;
  let buffer = await app.puppeteer.image({ url, width, height });

  let saved = await app.file.save(buffer, `sketch/${id}/${width}-${height}.png`, {
    contentType: 'image/png'
  });

  return {
    url: saved.url
  };

});
