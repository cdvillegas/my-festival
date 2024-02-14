'use strict';
const { db } = require('../firebase/db');
const { collection, addDoc, getDocs, where, query } = require('firebase/firestore');

/**
 * Create a new show for a festival
 *
 * body ShowCreate 
 * returns ShowRead
 **/
exports.create_show = function(body) {
  return new Promise(function(resolve, reject) {
    const showColRef = collection(db, 'shows');
    
    addDoc(showColRef, body)
      .then(docRef => {
        console.log("Shows added with ID: ", docRef.id);
        resolve({ id: docRef.id, ...body });
      })
      .catch(error => {
        console.error("Error adding show: ", error);
        reject(error);
      });
  });
};



/**
 * Fetch a specific show
 *
 * id String The ID of the show to fetch
 * returns ShowRead
 **/
exports.get_show = function(id) {
  return new Promise((resolve, reject) => {
    db.collection('shows').doc(id).get()
      .then(doc => {
        if (doc.exists) resolve({ id: doc.id, ...doc.data() });
        else reject('Show not found');
      })
      .catch(error => reject(error));
  });
};



/**
 * List all shows
 *
 * returns List
 **/
exports.list_shows = function(festival_id) {
  return new Promise(function(resolve, reject) {
    let showQuery;
    if (festival_id) {
      try {
        showQuery = query(collection(db, "shows"), where("festival_id", "==", festival_id));
      } catch (exception) {
        console.log(exception)
      }
    } else {
      showQuery = collection(db, 'shows');
    }
    
    getDocs(showQuery)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No matching shows found.");
          resolve([]);
        } else {
          const shows = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          resolve(shows);
        }
      })
      .catch((error) => {
        console.error("Error listing shows: ", error);
        reject(error);
      });
  });
};
