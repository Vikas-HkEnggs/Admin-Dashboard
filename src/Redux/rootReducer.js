import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./features/users/userSlice";


export const rootReducer = combineReducers({
    userSlice
});