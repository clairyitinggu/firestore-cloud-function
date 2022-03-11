# firestore Cloud Function

Just list some infomation I learn about cloud firestore trigger, I omit the details on how to install and setup in firestore, you can easily find all the details and instruction from offical documentation.

# CL cheatsheet

Initialize

```
npm install -g firebase-tools
```
```
firebase login
```
```
firebase logout
```

```
firebase init firestore
```

```
firebase init functions
```

Testing

```
firebase emulators:start
```

Deploy

```
firebase deploy
```

(optional)Deploy 

```
firebase deploy --only functions:addMessage,functions:makeUppercase
```

addMessage is the function you might write

# Something I encountered ...

1. If you need more than one cloud function, you have to write all the function in index.js, but you can use `firebase deploy --only functions:addMessage,functions:makeUppercase`to choose single function, all just deploy all the cloud function with `firebase deploy`

2. Highly recommend to test with emulators before finally deploy to firebase even your cloud function is pretty simple.  When you use `firebase emulators:start`, it suppose expose two portal for you to test, one is for firestore and another one is for cloud function.

3. The first time when you deploy your cloud function to firestore take for a while,  and when you can see **Deploy complete!**  on the terminal, it means what it means. Testing with emulators is much faster.

4. There are four event, `onCreate`, `onUpdate`,`onWrite` and `onDelete`

   - onCreate

      `{userId}`is called wildcard, you can use `context.params.userId` to get the new firestore document id.

     `snap.data()` as you can see below, can get the data when you create a new document in firestore.

     ```javascript
     exports.createUser = functions.firestore
         .document('users/{userId}')
         .onCreate((snap, context) => {
           const newValue = snap.data();
           // access a particular field as you would any JS property
           const name = newValue.name;
          
         });
     ```

   - onUpdate

     `change` can get the new data info with `change.after.data()`and get the old data info with `change.before.data()`

     `context` again, you can use `context.params.userId` to get the current firestore document id.

     ```javascript
     exports.updateUser2 = functions.firestore
         .document('users/{userId}')
         .onUpdate((change, context) => {
           // Get an object representing the current document
           const newValue = change.after.data();
     
           // ...or the previous value before this update
           const previousValue = change.before.data();
         });
     ```

   - onWrite

     `onWrite` combine the event of `onCreate`, `onUpdate` and `onDelete`

   - onDelete

     I didn't explore too much on `OnDelete`, maybe update later.

   

   I list below resources for reference, the Cloud Firestore triggers is really useful:

[^Cloud Firestore triggers]:https://firebase.google.com/docs/functions/firestore-events?authuser=0
[^Manage functions deployment and runtime options]:https://firebase.google.com/docs/functions/manage-functions#:~:text=%24-,firebase%20deploy%20%2D%2Donly%20functions,-%E9%BB%98%E8%AE%A4%E6%83%85%E5%86%B5%E4%B8%8B

