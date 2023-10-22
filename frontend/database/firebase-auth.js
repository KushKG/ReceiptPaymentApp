import { firestore, auth } from "./firebase-config";
import { doc, setDoc } from "firebase/firestore";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";

let userRef = null;
let userObj = null;

const sign_up = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      userObj = userCredential.user;
      userRef = doc(firestore, "users", user.uid);
      setDoc(userRef, {
        email: email,
        receipt_ids: [],
        name: name
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error code: " + errorCode + ", message: " + errorMessage);
    });
}


function log_in(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        userObj = userCredential.user;
        userRef = doc(firestore, "users", user.uid);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error code: " + errorCode + ", message: " + errorMessage);
    });
}


const authEventListener = (goToHome) => onAuthStateChanged(auth, user => {
    if (user) {
        userObj = user
        userRef = doc(firestore, "users", user.uid)
        goToHome();
    }
})
export { sign_up, log_in, userObj, userRef, authEventListener }
