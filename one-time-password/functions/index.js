const admin = require('firebase-admin');
const functions = require('firebase-functions');
const createUser = require('./create_user');
const requestOneTimePassword = require('./request_one_time_password');
const verifyOneTimePassword = require('./verify_one_time_password');

var serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://one-time-password-1f950.firebaseio.com"
});


exports.createUser = functions.https.onRequest(createUser);

exports.requestOneTimePassword = functions.https.onRequest(requestOneTimePassword);

exports.verifyOneTimePassword = functions.https.onRequest(verifyOneTimePassword);