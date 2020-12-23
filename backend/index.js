const admin = require('firebase-admin');
const functions = require('firebase-functions');

var serviceAccount = require("./jasmine-ecommerce-firebase-adminsdk-gikep-c0fa9562d4.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = require('./app');

const runtimeOpts = {
    timeoutSeconds: 5,
    memory: '1GB'
}

const api = functions.runWith(runtimeOpts).https.onRequest(app);

module.exports = {
    api
}