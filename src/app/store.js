import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/User/UserSlice";
import farmerSlice from "../features/Farmers/farmerSlice";

export default configureStore({
    reducer: {
        user: userSlice,
        farmer: farmerSlice,
        devTools: true,
    },
});
