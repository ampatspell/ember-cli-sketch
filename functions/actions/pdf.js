module.exports = app => app.functions.runWith({ memory: '2GB', timeoutSeconds: 240 }).https.onCall(async req => {

  let { id, width, height } = req;
  let url = `https://quatsch-e12c5.firebaseapp.com/experiments/editors/${id}/pdf/${width}/${height}`;
  let buffer = await app.puppeteer.pdf({ url, width, height });

  let saved = await app.file.save(buffer, `sketch/${id}/${width}-${height}.pdf`, {
    contentType: 'application/pdf'
  });

  return {
    url: saved.url
  };

});
