import firebase from 'firebase';

const firebaseConfig = require('../../config/firebase');


const Select = () => ({
  getAllBookmarks: () =>
    new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`bookmarks`)
        .once('value')
        .then(snapshot => {
          const bookmarkJSON = snapshot.val();
          const bookmarks = [];
          if (bookmarkJSON) {
            Object.keys(bookmarkJSON).forEach(bookmark => {
              if (bookmarkJSON[bookmark]) {
                bookmarks.unshift(bookmarkJSON[bookmark]);
              }
            });
          } else {
            reject();
          }
          resolve(bookmarks);
        });
    }),
});
const Insert = () => ({
  insertBookmark: bookmark => {
    firebase
      .database()
      .ref(`bookmarks/${bookmark.id}`)
      .set({
        id: bookmark.id,
        thumbnailURL: bookmark.thumbnailURL,
        name: bookmark.name,
        address: {
          street: bookmark.address.street,
          city: bookmark.address.city,
        },
        rating:bookmark.rating,
        longitude:bookmark.longitude,
        latitude:bookmark.latitude
      });
  },
});
const Delete = () => ({
  deleteBookmark: bookmark => {
    firebase
      .database()
      .ref(`bookmarks/${bookmark.id}`)
      .remove();
  },
});

const Init = () => ({
  Init: () => {
    firebase.initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      databaseURL: firebaseConfig.databaseURL,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
      messagingSenderId: firebaseConfig.messagingSenderId,
    });
  },
});
const Database = () => Object.assign({}, Init(), Select(), Insert(), Delete());

// export default DB();
module.exports = Database;
