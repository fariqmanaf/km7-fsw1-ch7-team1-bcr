import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import car_details from "./car_details";
import success from "./success";

export default combineReducers({
    auth,
    car_details,
    success,
});