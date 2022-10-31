import firebase from 'firebase'

const app = firebase.initializeApp({
    apikey: 'gNJKIEKhTa94eeg0pKojjEVpkjlnXj6cOsYTu8YQ',
    authDomain: "lm-dwf-m6.firebaseapp.com",
    databaseURL: 'https://lm-dwf-m6-default-rtdb.firebaseio.com',
    projectId:'lm-dwf-m6'
})
const rtdb = firebase.database()


export {rtdb}