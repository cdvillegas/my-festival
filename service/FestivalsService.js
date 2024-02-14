'use strict';
const { db } = require('../firebase/db');
const { collection, addDoc, getDocs, doc, getDoc } = require('firebase/firestore');


/**
 * Create a new festival
 *
 * body FestivalCreate 
 * returns FestivalRead
 **/
exports.create_festival = function(body) {
  return new Promise(function(resolve, reject) {
    const festivalsColRef = collection(db, 'festivals');
    
    addDoc(festivalsColRef, body)
      .then(docRef => {
        console.log("Festival added with ID: ", docRef.id);
        resolve({ id: docRef.id, ...body });
      })
      .catch(error => {
        console.error("Error adding festival: ", error);
        reject(error);
      });
  });
};


/**
 * Get a specific festival by ID
 *
 * id String The ID of the festival to retrieve
 * returns FestivalRead
 **/
exports.get_festival = function(id) {
  return new Promise((resolve, reject) => {
    const festivalRef = doc(db, 'festivals', id);
    getDoc(festivalRef)
      .then((docSnapshot) => {
        console.log("Document Snapshot:", docSnapshot.exists(), docSnapshot.data());
        if (docSnapshot.exists()) {
          resolve(docSnapshot.data());
        } else {
          reject(new Error('Festival not found'));
        }
      })
      .catch((error) => {
        console.error("Error fetching festival:", error);
        reject(error);
      });
  });
};


/**
 * List all festivals
 *
 * returns List
 **/
exports.list_festivals = function() {
  return new Promise(function(resolve, reject) {
    getDocs(collection(db, 'festivals'))
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("No matching festivals found.");
          resolve([]);
        } else {
          const festivals = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          resolve(festivals);
        }
      })
      .catch((error) => {
        console.error("Error listing festivals: ", error);
        reject(error);
      });
  });
};


/**
 * Optimize a festival schedule based on ratings
 *
 * body List 
 * id String The ID of the festival to optimize the schedule for
 * returns List
 **/
exports.optimize_festival_schedule = function(body,id) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "festival_id" : "123",
  "shows" : [ "", "" ],
  "id" : "789"
}, {
  "festival_id" : "123",
  "shows" : [ "", "" ],
  "id" : "789"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

