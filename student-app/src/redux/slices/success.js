import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    success: false,
};

export const successSlice = createSlice({
    initialState,
    name: "success",
    reducers: {
        setSuccess: (state, action) => {
            state.success = action.payload;
        },
    },
});

export const { setSuccess } = successSlice.actions;
export default successSlice.reducer;