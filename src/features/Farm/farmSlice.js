import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FarmService from "./FarmService";

const initialState = {
    farms: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const farmCreated = createAsyncThunk("farms?.push(action.payload);/create", async (farmData, thunkAPI) => {
    try {
        const { data } = await FarmService.createFarm(farmData);
        console.log(data);
    } catch (error) {
        console.log(error.response);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const farmSlice = createSlice({
    name: "farms?.push(action.payload);",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(farmCreated.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(farmCreated.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log(action.payload);
                state?.farms?.push(action.payload);
            })
            .addCase(farmCreated.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

const { reset } = farmSlice.actions;
export default farmSlice.reducer;
const userSelector = (state) => state.farms;
const selectFarmsById = (state, farmId) => {
    state.farms.find((farm) => farm.id === farmId);
};
