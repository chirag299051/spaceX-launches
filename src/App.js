import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { createStore } from "redux";
import reducer from "./reducer";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAASmAdlkf429qHx98Pd6oBvC47kkQsAvg",
  authDomain: "spacex-launches-d8ce2.firebaseapp.com",
  projectId: "spacex-launches-d8ce2",
  storageBucket: "spacex-launches-d8ce2.appspot.com",
  messagingSenderId: "980643508864",
  appId: "1:980643508864:web:953ab92ffd16d83a58ec65",
  measurementId: "G-9P37GBWJ8B",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth
    .signInWithPopup(googleProvider)
    .then((res) => {
      console.log(res.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const logOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("logged out");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

function App() {
  const initialState = {
    launches: [1, 2, 3],
    details: {},
    upComing: false,
    loggedIn: false,
    login: false,
  };
  const store = createStore(reducer, initialState);

  return (
    <Provider store={store}>
      <Header />
      <Main />
      <Footer />
    </Provider>
  );
}

export default App;
