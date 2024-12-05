import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: 31,
  title: "",
  price: "",
  description: "",
  imageUrl: "",
};

export const newProductSlice = createSlice({
  name: "newProduct",
  initialState,
  reducers: {
    setForm: (state, action) => {
      return { ...state, ...action.payload, id: state.id };
    },
    incrementId: (state) => {
      state.id += 1;
    },
  },
});

export const { setForm, setImageUrl, incrementId } = newProductSlice.actions;

export default newProductSlice.reducer;
