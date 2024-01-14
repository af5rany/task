import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9_kKus30ShOfvNO683HqXnThllWJqlWU",
  authDomain: "hopeful-sound-411116.firebaseapp.com",
  projectId: "hopeful-sound-411116",
  storageBucket: "hopeful-sound-411116.appspot.com",
  messagingSenderId: "924934746343",
  appId: "1:924934746343:web:7ffd793a91b7cfc18b3242",
  measurementId: "G-5D48T33V4R",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export { firebaseApp as firebase, firestore };
