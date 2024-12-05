import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

export const editProductSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {
    setParams: (state, action) => {
      console.log(action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { setParams } = editProductSlice.actions;

export default editProductSlice.reducer;
