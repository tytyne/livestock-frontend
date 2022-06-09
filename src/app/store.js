import { configureStore, createStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/User/UserSlice";
import farmerSlice from "../features/Farmers/farmerSlice";
import farmSlice from "../features/Farm/farmSlice";

const reducers = combineReducers({
    user: userSlice,
    farmer: farmerSlice,
    farm: farmSlice,
});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export default store;
