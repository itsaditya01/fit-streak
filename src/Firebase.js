import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyB_jUEcwARC1biJa9ea91Yt3uhMampC0LI",
    authDomain: "auth-fitstreak.firebaseapp.com",
    projectId: "auth-fitstreak",
    storageBucket: "auth-fitstreak.appspot.com",
    messagingSenderId: "165489373406",
    appId: "1:165489373406:web:d3758e21bfe11a71cd124f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;