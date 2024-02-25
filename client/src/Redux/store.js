import cartReducer from "./cartRedux";
import userReducer from "./userRedux";

import { combineReducers, configureStore } from "@reduxjs/toolkit";


const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

export const store = configureStore({ reducer: rootReducer });