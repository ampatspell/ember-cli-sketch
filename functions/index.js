const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const ctx = {
  functions,
  firestore: admin.firestore(),
  puppeteer: require('./lib/puppeteer'),
  file: require('./lib/file')(admin)
};

const req = name => require(`./${name}`)(ctx);

module.exports = {
  pdf:     req('actions/pdf'),
  image:   req('actions/image')
}
