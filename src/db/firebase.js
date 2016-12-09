import firebase from 'firebase/app'
require('firebase/database')

const config = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: process.env.FIREBASE_AUTH,
  databaseURL: process.env.FIREBASE_DATABASE
}

firebase.initializeApp(config)

export const database = firebase.database()
