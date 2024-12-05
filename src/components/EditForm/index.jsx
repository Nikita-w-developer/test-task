import React from "react";
import styles from "./EditForm.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  setFormField,
  setFormImage,
} from "../../redux/Slices/replaceProductSlice";
import { replacedItem } from "../../redux/Slices/productSlice";
import { setParams } from "../../redux/Slices/editProductSlice";
import { useNavigate } from "react-router-dom";

const EditFrom = ({ onSubmit, id }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.editProductSlice);
  const editData = useSelector((state) => state.replaceProductSlice);
  const navigate = useNavigate();
  React.useEffect(() => {
    const products = JSON.parse(localStorage.getItem("productItems")) || [];
    const product = products.find((item) => item.id === id);
    if (product) {
      dispatch(setFormField({ field: "title", value: product.title }));
      dispatch(setFormField({ field: "price", value: product.price }));
      dispatch(
        setFormField({ field: "description", value: product.description })
      );
      dispatch(setFormField({ field: "imageUrl", value: product.imageUrl }));
    }
  }, [id, dispatch]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    dispatch(setFormField({ field: name, value }));
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setFormImage({ ...editData, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveCard();
    if (onSubmit) onSubmit(editData);
  };
  const handleSaveCard = () => {
    const products = JSON.parse(localStorage.getItem("productItems")) || [];
    const currentId = data.id;
    const updatedFormData = { ...editData, id: currentId };
    console.log("Обновленные данные продукта:", updatedFormData);
    const productsUpdate = products.map((obj) =>
      obj.id === data.id ? { ...obj, ...updatedFormData } : obj
    );
    console.log("Обновленный массив продуктов:", productsUpdate);
    localStorage.setItem("productItems", JSON.stringify(productsUpdate));
    console.log(
      "Данные сохранены в localStorage:",
      JSON.parse(localStorage.getItem("productItems"))
    );
    dispatch(replacedItem(productsUpdate));
    dispatch(setParams(updatedFormData));
  };

  return (
    <div className={styles.wrapper}>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <div>
          <label>
            <input
              placeholder="Название товара:"
              type="text"
              name="title"
              value={editData.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <input
              placeholder="Цена:"
              type="number"
              name="price"
              value={editData.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <textarea
              placeholder="Описание:"
              name="description"
              value={editData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </label>
        </div>
        <div>
          <label>
            Картинка:
            <input
              className={styles.lastInput}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </label>
        </div>
        <button type="submit">Сохранить</button>
      </form>
      <button onClick={() => navigate("/test-task/products")}>🔙</button>
    </div>
  );
};

export default EditFrom;
