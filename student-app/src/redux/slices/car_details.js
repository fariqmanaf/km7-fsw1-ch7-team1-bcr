import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    carDetails: null,
    availability: null,
    models: null,
    options: null,
    specs: null,
};

export const carDetailsSlice = createSlice({
    initialState,
    name: "carDetails",
    reducers: {
        setDetailsCar: (state, action) => {
            state.carDetails = action.payload;
        },
        setAvailabilityState: (state, action) => {
            state.availability = action.payload;
        },
        setModelsState: (state, action) => {
            state.models = action.payload;
        },
        setOptionsState: (state, action) => {
            state.options = action.payload;
        },
        setSpecsState: (state, action) => {
            state.specs = action.payload;
        },
    },
});

export const {
    setDetailsCar,
    setAvailabilityState,
    setModelsState,
    setOptionsState,
    setSpecsState,
} = carDetailsSlice.actions;

export default carDetailsSlice.reducer;
