import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

const rootReducer = combineReducers({
    user: userReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

export default store;
