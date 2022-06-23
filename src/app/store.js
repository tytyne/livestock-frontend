import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/User/UserSlice";
import farmerSlice from "../features/Farmers/farmerSlice";
import farmSlice from "../features/Farm/farmSlice";
import animalSlice from "../features/Animals/animalSlice";

const reducers = combineReducers({
    user: userSlice,
    farmer: farmerSlice,
    farm: farmSlice,
    animal: animalSlice,
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
