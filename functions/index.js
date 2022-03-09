const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.mapData3 = functions.firestore
  .document("test2/{docId}")
  .onCreate((snap, context) => {
    //{'name':'Marie','age':66}
    const newValue = snap.data();
    const name = newValue.name;
    const age = newValue.age;
    //const id = snap.query.id;
    db.collection("cities")
      .doc()
      .set({
        name: [name],
        age: [age],
        doi: {
          name: [name],
          age: [age],
        },
      });

    console.log(context);
  });
