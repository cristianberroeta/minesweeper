import {FirebaseApp} from "firebase/app";
import {createContext} from "react";

const FirebaseContext = createContext<FirebaseApp | null>(null);
export default FirebaseContext;