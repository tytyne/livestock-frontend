import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "./AuthService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const signupUser = createAsyncThunk("users/signupUser", async ({ firstname, lastname, username, occupation, email, password }, thunkAPI) => {
    try {
        const response = await AuthService.register({ firstname, lastname, username, occupation, email, password });
        let data = await response.json();
        return data;
    } catch (e) {
        console.log("Error", e.response.data);
        return thunkAPI.rejectWithValue(e.response.data);
    }
});

export const login = createAsyncThunk("users/login", async (user, thunkAPI) => {
    try {
        const data = await AuthService.login(user);
        return data;
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const logout = createAsyncThunk("users/logout", async () => {
    AuthService.logout();
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
                console.log(action.payload);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;

export const userSelector = (state) => state.user;
