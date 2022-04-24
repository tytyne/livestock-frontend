import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FarmerService from "./FarmerService";

// const farmer = useSelector((state) => state.farmers);
const initialState = {
    farmers: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new farmer
export const createFarmer = createAsyncThunk("farmer/create", async (farmerData, thunkAPI) => {
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

// Deleting a farmer
export const removeFarmer = createAsyncThunk("farmer/delete", async (id, thunkAPI) => {
    try {
        return await FarmerService.deleteFarmer(id);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});
// Updating a farmer
export const farmerUpdated = createAsyncThunk("farmer/update", async (farmerData, thunkAPI) => {
    try {
        return await FarmerService.updateFarmer(farmerData.id, farmerData);
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const farmerSlice = createSlice({
    name: "farmer",
    initialState,
    reducers: {
        reset: (state) => initialState,
        // farmerUpdated(state, action) {
        //     const { id, firstname, lastname } = action.payload;
        //     const { farmers } = state;
        //     console.log(farmers, action);
        //     const existingFarmer = state.farmers.find((farm) => farm.id === id);
        //     if (existingFarmer) {
        //         existingFarmer.firstname = firstname;
        //         existingFarmer.lastname = lastname;
        //     }
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createFarmer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createFarmer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log(action.payload);
                state?.farmers?.push(action.payload);
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
                state.farmers = action.payload;
                state.message = action.payload.message;
            })
            .addCase(getFarmers.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(removeFarmer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeFarmer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                console.log(state.farmers, action.payload);
                // let index = state.farmers.findIndex(({ id }) => id === action.payload.id);
                state.farmers = state?.farmers?.filter((farmer) => farmer.id !== action.payload.id);
                // .splice(index, 1);
            })
            .addCase(removeFarmer.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // updating
            .addCase(farmerUpdated.fulfilled, (state, action) => {
                const updateFarmers = state?.farmers?.map((farmer) => (farmer.id === action.payload.id ? action.payload : farmer));
                state.farmers = updateFarmers;
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(farmerUpdated.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = action.payload.message;
            });
    },
});

export const { reset } = farmerSlice.actions;
export default farmerSlice.reducer;
export const userSelector = (state) => state.farmers;
export const selectFarmerById = (state, farmerId) => {
    state.farmers.find((farmer) => farmer.id === farmerId);
};
