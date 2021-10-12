import {createContext} from "react";
import {User} from "../models/User";

const UserContext = createContext<User | null>(null);
export default UserContext;