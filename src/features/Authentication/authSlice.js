import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client from "../../api/client";
import { toast } from "react-toastify";

const initialState = {
    user: {},
    status: "logged out",
    error: null,
};
const url = "/user";

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
    try {
        const { data } = await client.post(`${url}/login`, credentials);
        toast(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.data);
        return data;
    } catch (error) {
        toast(error.response.data.error);
        return error.response.data.error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // loggingIn(state, action) {
        //     const { email, password, ...other } = action.payload;
        //     console.log(other);
        // },
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { loggingIn } = authSlice.actions;
export default authSlice.reducer;
