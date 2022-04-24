import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import animalService from "./AnimalService";

const initialState = {
    animals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// Create new farmer
export const createAnimal = createAsyncThunk("farmer/create", async (animalData, thunkAPI) => {
    try {
        const { data } = await animalService.createAnimalServices(animalData);
        console.log(data);
    } catch (error) {
        console.log(error.response);
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get all animals
export const getAnimals = createAsyncThunk("animals/getAll", async (_, thunkAPI) => {
    try {
        return await animalService.getAnimalServices();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete animals
// export const removeFarmer = createAsyncThunk("animals/delete", async (id, thunkAPI) => {
//     try {
//         return await animalService.deleteFarmer(id);
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// });

export const animalSlice = createSlice({
    name: "animal",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAnimal.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createAnimal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.animals.push(action.payload);
            })
            .addCase(createAnimal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getAnimals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAnimals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.animals = action.payload;
                state.message = action.payload.message;
            })
            .addCase(getAnimals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = animalSlice.actions;
export default animalSlice.reducer;
export const userSelector = (state) => state.animals;
