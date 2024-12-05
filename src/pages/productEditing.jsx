import React from "react";
import Product from "../components/Product";
import EditFrom from "../components/EditForm";
import { useDispatch, useSelector } from "react-redux";
import { setFormField } from "../redux/Slices/replaceProductSlice";

const ProductEditing = () => {
  const editingData = useSelector((state) => state.editProductSlice);
  const newData = useSelector((state) => state.replaceProductSlice);
  const dispatch = useDispatch();

  const handleFormSubmit = (editingData) => {
    dispatch(setFormField(editingData));
  };
  return (
    <div className="creation-page">
      <div className="new-product">
        <Product {...editingData} />
      </div>
      <EditFrom id={editingData.id} onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ProductEditing;
