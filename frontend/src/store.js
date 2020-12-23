import { authReducer } from "./reducers/authReducer";
import { cartReducer } from "./reducers/cartReducers";

import { createStore, combineReducers, compose } from 'redux';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDsR3cCWvvEUfCtTVaGMxb-of71S30OfYw",
  authDomain: "jasmine-ecommerce.firebaseapp.com",
  projectId: "jasmine-ecommerce",
  storageBucket: "jasmine-ecommerce.appspot.com",
  messagingSenderId: "496594169433",
  appId: "1:496594169433:web:d6eef11e8d368144f8cb48",
};

firebase.initializeApp(firebaseConfig);

const createStoreWithFirebase = compose(
  reduxFirestore(firebase, {}),
)(createStore);


const rootReducer = combineReducers({
  firestore: firestoreReducer,
  cart: cartReducer,
  auth: authReducer
});


const store = createStoreWithFirebase(rootReducer);

export default store;
