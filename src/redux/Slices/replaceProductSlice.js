import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  title: "",
  price: "",
  description: "",
  imageUrl: "",
  thumbnail: "",
};

const replaceProductSlice = createSlice({
  name: "replaceProduct",
  initialState,
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    setFormImage: (state, action) => {
      state.imageUrl = action.payload;
      state.thumbnail = action.payload.imageUrl;
    },
  },
});

export const { setFormField, setFormImage } = replaceProductSlice.actions;

export default replaceProductSlice.reducer;
