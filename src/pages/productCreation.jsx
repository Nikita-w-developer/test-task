import React from "react";
import Product from "../components/Product";
import ProductForm from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import { setForm } from "../redux/Slices/newProductSlice";

const ProductCreation = () => {
  const formData = useSelector((state) => state.newProductSlice);
  const dispatch = useDispatch();
  const handleFormSubmit = (formData) => {
    dispatch(setForm(formData));
  };
  return (
    <div className="creation-page">
      <div className="new-product">
        <Product {...formData} />
      </div>

      <ProductForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ProductCreation;
