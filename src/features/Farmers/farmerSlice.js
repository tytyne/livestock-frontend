import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FarmerService from "./FarmerService";

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new farmer
export const createFarmer = createAsyncThunk("farmer/create", async (farmerData, thunkAPI) => {
    console.log(farmerData);
    try {
        const { data } = await FarmerService.createFarmer(farmerData);
        console.log(data);
    } catch (error) {
        console.log(error.response);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get all farmers
export const getFarmers = createAsyncThunk("farmers/getAll", async (_, thunkAPI) => {
    try {
        return await FarmerService.getAllFarmers();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const farmerSlice = createSlice({
    name: "farmer",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFarmer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createFarmer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals.push(action.payload);
            })
            .addCase(createFarmer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getFarmers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getFarmers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getFarmers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = farmerSlice.actions;
export default farmerSlice.reducer;
