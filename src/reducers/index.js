import { combineReducers } from "redux";
import auth from "./auth";
import farming from "./farming";
import message from "./message";

export default combineReducers({
    auth,
    message,
    farming,
});
