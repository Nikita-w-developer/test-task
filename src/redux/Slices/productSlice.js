import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const url = "https://dummyjson.com/products";
    const { data } = await axios.get(url);
    return data;
  }
);

const initialState = {
  items: JSON.parse(localStorage.getItem("productItems")) || [],
  isLiked: [],
  sort: { name: "Все товары", property: "all" },
  currentId: 1,
  searchValue: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    replacedItem: (state, action) => {
      const updatedProducts = action.payload;
      state.items = updatedProducts;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setNewItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("productItems", JSON.stringify(state.items));
    },
    setCurrentId: (state, action) => {
      state.currentId = action.payload;
    },
    addFavourite: (state, action) => {
      const existing = state.isLiked.find(
        (obj) => obj.id === action.payload.id
      );
      if (existing) {
        state.isLiked = state.isLiked.filter(
          (obj) => obj.id !== action.payload.id
        );
      } else {
        state.isLiked.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.isLiked = state.isLiked.filter(
        (liked) => liked.id !== action.payload.id
      );
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.items.push(action.payload.products);
      state.items = state.items.flat();
      localStorage.setItem("productItems", JSON.stringify(state.items));
    });
  },
});

export const {
  addFavourite,
  removeItem,
  setSort,
  setCurrentId,
  setNewItem,
  setSearchValue,
  replacedItem,
} = productSlice.actions;

export default productSlice.reducer;
