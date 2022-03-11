const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.createData = functions.firestore
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
exports.updateData = functions.firestore
  .document("users/{docId}")
  .onUpdate((change, context) => {
    // Get current document value.
    const newValue = change.after.data();
    //const previousValue = change.before.data();
    const name = newValue.name || "";
    const invNumber = newValue.invNumber || "";
    const public = newValue.invNumber.public || false;
    // add current value to doi collection with same docId
    db.collection("doi").doc(context.params.docId).set({
      name: name,
      invNumber: invNumber,
      public: public,
    });
    //update the current value in users collection
    db.collection("users").doc(context.params.docId).set({
      name: name,
      invNumber: invNumber,
      public: public,
    });

    return context.params.docId;
  });
