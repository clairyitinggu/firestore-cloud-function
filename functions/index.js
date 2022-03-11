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
  .document("users/{docId}")
  .onCreate((snap, context) => {
    // Get current document value.
    const newValue = snap.data();
    const name = newValue.name || "";
    const invNumber = newValue.invNumber || "";
    const public = newValue.invNumber.public || false;
    // add current value to doi collection with same docId
    db.collection("doi").doc(context.params.docId).set({
      referenceName: name,
      referenceIdentifier: invNumber,
      public: public,
      primaryRefrenceType: "creation",
      structuralType: "physical",
      mode: "tangible",
      character: "music",
      refereceType: "instrument",
    });

    console.log(context);
  });
//command line
//firebase deploy
