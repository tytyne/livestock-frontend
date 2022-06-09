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
export const getFarms = createAsyncThunk("/check/all", async (_, thunkAPI) => {
    try {
        return await FarmService.getAllFarms();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
// delete a farm
export const removeFarm = createAsyncThunk("farm/delete", async (id, thunkAPI) => {
    try {
        return await FarmService.deleteFarm(id, thunkAPI);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
// update a farm
export const farmUpdate = createAsyncThunk("farm/update", async (farmData, thunkAPI) => {
    try {
        return await FarmService.updateFarm(farmData.id, farmData);
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
export const farmSlice = createSlice({
    name: "farms",
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
            })
            .addCase(getFarms.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.farms = action.payload;
                state.message = action.payload.message;
            })
            .addCase(getFarms.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload.message;
            });
    },
});

const { reset } = farmSlice.actions;
export default farmSlice.reducer;
const userSelector = (state) => state.farms;
const selectFarmsById = (state, farmId) => {
    state.farms.find((farm) => farm.id === farmId);
};
